/*
  # Update RSVP Functionality

  1. Changes
    - Add function to get total guests count for an event
    - Update RSVP validation to require admission number for all responses
    - Add index for faster guest counting

  2. Security
    - Maintains data integrity
    - Ensures proper student verification
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS get_event_total_guests(uuid);

-- Create function to get total guests count
CREATE OR REPLACE FUNCTION get_event_total_guests(event_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = $1
    AND status = 'attending'
  );
END;
$$ LANGUAGE plpgsql;

-- Create index for faster guest counting
CREATE INDEX IF NOT EXISTS idx_event_rsvps_guests
ON event_rsvps(event_id, status, guests)
WHERE status = 'attending';

-- Update admission number validation function
CREATE OR REPLACE FUNCTION validate_admission_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Always require admission number verification
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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger
DROP TRIGGER IF EXISTS check_admission_number ON event_rsvps;

-- Create new trigger that runs for all RSVPs
CREATE TRIGGER check_admission_number
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_admission_number();