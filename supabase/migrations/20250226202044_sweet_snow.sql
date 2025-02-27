/*
  # Allow RSVP Status Changes

  1. Changes
    - Add function to validate RSVP status changes
    - Add trigger to enforce RSVP status change rules
    - Update existing RSVPs to ensure data consistency

  2. Security
    - Maintains admission number verification
    - Preserves RSVP uniqueness constraints
*/

-- Create function to validate RSVP status changes
CREATE OR REPLACE FUNCTION validate_rsvp_status_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is an update and status is changing
  IF TG_OP = 'UPDATE' AND NEW.status != OLD.status THEN
    -- Always allow changing from 'attending' to 'not_attending'
    IF OLD.status = 'attending' AND NEW.status = 'not_attending' THEN
      RETURN NEW;
    END IF;

    -- For all other status changes, verify admission number
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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status change validation
DROP TRIGGER IF EXISTS check_rsvp_status_change ON event_rsvps;
CREATE TRIGGER check_rsvp_status_change
  BEFORE UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_rsvp_status_change();

-- Update existing RSVPs to ensure data consistency
UPDATE event_rsvps
SET guests = 1
WHERE status = 'not_attending';