-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS check_admission_number ON event_rsvps;
DROP TRIGGER IF EXISTS check_rsvp_status_change ON event_rsvps;
DROP FUNCTION IF EXISTS validate_admission_number();
DROP FUNCTION IF EXISTS validate_rsvp_status_change();

-- Create function to get total guests for an event
CREATE OR REPLACE FUNCTION get_event_total_guests(p_event_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = p_event_id
    AND status = 'attending'
  );
END;
$$ LANGUAGE plpgsql;

-- Create comprehensive RSVP validation function
CREATE OR REPLACE FUNCTION validate_rsvp()
RETURNS TRIGGER AS $$
DECLARE
  v_event_accepts_rsvps boolean;
BEGIN
  -- Check if event is accepting RSVPs
  SELECT accepting_rsvps INTO v_event_accepts_rsvps
  FROM events
  WHERE id = NEW.event_id;

  IF NOT v_event_accepts_rsvps THEN
    RAISE EXCEPTION 'This event is no longer accepting RSVPs';
  END IF;

  -- For new RSVPs or status changes to 'attending'
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.status = 'attending')) THEN
    -- Verify admission number
    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
      RAISE EXCEPTION 'Student admission number is required';
    END IF;
    
    -- Verify admission number exists in students table
    IF NOT EXISTS (
      SELECT 1 FROM students 
      WHERE admission_number = NEW.admission_number
    ) THEN
      RAISE EXCEPTION 'Invalid admission number';
    END IF;

    -- Check for existing RSVPs with this admission number
    IF EXISTS (
      SELECT 1 FROM event_rsvps
      WHERE event_id = NEW.event_id
      AND admission_number = NEW.admission_number
      AND status = 'attending'
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
    ) THEN
      RAISE EXCEPTION 'This student has already RSVP''d for this event';
    END IF;

    -- Check max guests per RSVP
    IF NEW.guests > (
      SELECT max_guests_per_rsvp 
      FROM events 
      WHERE id = NEW.event_id
    ) THEN
      RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP';
    END IF;

    -- Check event capacity if set
    IF EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = NEW.event_id
      AND e.max_capacity IS NOT NULL
      AND (
        SELECT COALESCE(SUM(guests), 0)
        FROM event_rsvps
        WHERE event_id = e.id
        AND status = 'attending'
        AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      ) + NEW.guests > e.max_capacity
    ) THEN
      RAISE EXCEPTION 'Event has reached maximum capacity';
    END IF;
  END IF;

  -- For status changes from 'attending' to 'not_attending'
  IF TG_OP = 'UPDATE' AND OLD.status = 'attending' AND NEW.status = 'not_attending' THEN
    -- Keep the admission number but set guests to 1
    NEW.guests := 1;
    -- Keep the existing admission number
    NEW.admission_number := OLD.admission_number;
  END IF;

  -- For all other cases
  IF NEW.status = 'not_attending' THEN
    -- Always set guests to 1 for non-attending RSVPs
    NEW.guests := 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for RSVP validation
DROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps;
CREATE TRIGGER validate_rsvp
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_rsvp();

-- Create index for faster guest counting
CREATE INDEX IF NOT EXISTS idx_event_rsvps_guests
ON event_rsvps(event_id, status, guests);

-- Create index for faster admission number lookups
CREATE INDEX IF NOT EXISTS idx_event_rsvps_admission_number
ON event_rsvps(event_id, admission_number)
WHERE admission_number IS NOT NULL;

-- Create index for faster status filtering
CREATE INDEX IF NOT EXISTS idx_event_rsvps_status
ON event_rsvps(event_id, status);

-- Create partial index for attending RSVPs
CREATE INDEX IF NOT EXISTS idx_event_rsvps_attending
ON event_rsvps(event_id, admission_number)
WHERE status = 'attending';

-- Create function to check if student can RSVP
CREATE OR REPLACE FUNCTION can_student_rsvp(
  p_event_id uuid,
  p_admission_number text,
  p_current_rsvp_id uuid DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 
    FROM event_rsvps
    WHERE event_id = p_event_id
    AND admission_number = p_admission_number
    AND status = 'attending'
    AND id != COALESCE(p_current_rsvp_id, '00000000-0000-0000-0000-000000000000'::uuid)
  );
END;
$$ LANGUAGE plpgsql;