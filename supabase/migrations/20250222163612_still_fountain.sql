-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS check_admission_number ON event_rsvps;
DROP FUNCTION IF EXISTS validate_admission_number();

-- Create improved admission number validation function
CREATE OR REPLACE FUNCTION validate_admission_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Only validate if event requires admission number and status is 'attending'
  IF (SELECT requires_admission_number FROM events WHERE id = NEW.event_id) 
     AND NEW.status = 'attending' THEN
    -- Check if admission number is provided
    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
      RAISE EXCEPTION 'Admission number is required for this event';
    END IF;
    
    -- Verify admission number exists in students table
    IF NOT EXISTS (
      SELECT 1 FROM students 
      WHERE admission_number = NEW.admission_number
    ) THEN
      RAISE EXCEPTION 'Invalid admission number';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger with improved validation
CREATE TRIGGER check_admission_number
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_admission_number();

-- Add index for faster admission number lookups
CREATE INDEX IF NOT EXISTS idx_students_admission_number 
ON students(admission_number);