-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps;
DROP FUNCTION IF EXISTS validate_rsvp();

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

  -- For new RSVPs or status changes
  IF TG_OP = 'INSERT' OR NEW.status != OLD.status THEN
    -- Always require admission number for any status
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
  END IF;

  -- For attending status
  IF NEW.status = 'attending' THEN
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

  -- For not attending status
  IF NEW.status = 'not_attending' THEN
    -- Set guests to 1 for non-attending RSVPs
    NEW.guests := 1;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for RSVP validation
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