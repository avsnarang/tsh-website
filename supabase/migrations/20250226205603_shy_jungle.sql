-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps;
DROP FUNCTION IF EXISTS validate_rsvp();
DROP FUNCTION IF EXISTS check_student_rsvp_status(uuid, text);

-- Create improved RSVP validation function
CREATE OR REPLACE FUNCTION validate_rsvp()
RETURNS TRIGGER AS $$
DECLARE
  v_event_accepts_rsvps boolean;
  v_existing_rsvp record;
  v_student_name text;
BEGIN
  -- Check if event is accepting RSVPs
  SELECT accepting_rsvps INTO v_event_accepts_rsvps
  FROM events
  WHERE id = NEW.event_id;

  IF NOT v_event_accepts_rsvps THEN
    RAISE EXCEPTION 'This event is no longer accepting RSVPs';
  END IF;

  -- Always require admission number
  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
    RAISE EXCEPTION 'Student admission number is required';
  END IF;
  
  -- Verify admission number exists and get student name
  SELECT full_name INTO v_student_name
  FROM students 
  WHERE admission_number = NEW.admission_number;

  IF v_student_name IS NULL THEN
    RAISE EXCEPTION 'Invalid admission number';
  END IF;

  -- Check for existing RSVP with this admission number
  SELECT * INTO v_existing_rsvp
  FROM event_rsvps
  WHERE event_id = NEW.event_id
  AND admission_number = NEW.admission_number
  AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
  LIMIT 1;

  -- If there's an existing RSVP, update it instead of creating a new one
  IF v_existing_rsvp IS NOT NULL THEN
    -- Update the existing RSVP
    UPDATE event_rsvps
    SET 
      status = NEW.status,
      guests = CASE WHEN NEW.status = 'attending' THEN NEW.guests ELSE 1 END,
      updated_at = now()
    WHERE id = v_existing_rsvp.id;
    
    -- Return NULL to prevent the original INSERT/UPDATE
    RETURN NULL;
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
  ELSE
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

-- Create function to get student details
CREATE OR REPLACE FUNCTION get_student_details(p_admission_number text)
RETURNS TABLE (
  admission_number text,
  full_name text,
  class_name text,
  is_valid boolean
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.admission_number,
    s.full_name,
    s.class,
    true as is_valid
  FROM students s
  WHERE s.admission_number = p_admission_number
  UNION ALL
  SELECT 
    p_admission_number,
    NULL::text,
    NULL::text,
    false
  WHERE NOT EXISTS (
    SELECT 1 FROM students 
    WHERE admission_number = p_admission_number
  )
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create function to check student RSVP status
CREATE OR REPLACE FUNCTION check_student_rsvp_status(
  p_event_id uuid,
  p_admission_number text
)
RETURNS TABLE (
  can_rsvp boolean,
  current_status text,
  current_guests integer,
  student_name text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN e.accepting_rsvps = false THEN false
      ELSE true
    END as can_rsvp,
    er.status::text,
    er.guests,
    s.full_name
  FROM events e
  LEFT JOIN event_rsvps er ON er.event_id = e.id 
    AND er.admission_number = p_admission_number
  LEFT JOIN students s ON s.admission_number = p_admission_number
  WHERE e.id = p_event_id;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_admission_lookup
ON students(admission_number);

CREATE INDEX IF NOT EXISTS idx_event_rsvps_lookup
ON event_rsvps(event_id, admission_number);

CREATE INDEX IF NOT EXISTS idx_event_rsvps_status_guests
ON event_rsvps(event_id, status, guests)
WHERE status = 'attending';