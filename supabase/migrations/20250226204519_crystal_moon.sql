/*
  # Database Updates
  
  1. Changes
    - Add indexes for performance optimization
    - Update RSVP validation function
    - Add trigger for RSVP validation
    - Add constraints for data integrity

  2. Security
    - Maintains existing RLS policies
    - Ensures data validation
*/

-- Create composite index for faster RSVP lookups
CREATE INDEX IF NOT EXISTS idx_event_rsvps_composite
ON event_rsvps(event_id, user_id, status);

-- Create index for admission number validation
CREATE INDEX IF NOT EXISTS idx_event_rsvps_admission
ON event_rsvps(event_id, admission_number)
WHERE admission_number IS NOT NULL;

-- Update RSVP validation function
CREATE OR REPLACE FUNCTION validate_rsvp()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if event requires admission number
  IF EXISTS (
    SELECT 1 FROM events 
    WHERE id = NEW.event_id 
    AND requires_admission_number = true
  ) THEN
    -- Validate admission number
    IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
      RAISE EXCEPTION 'Student admission number is required for this event';
    END IF;

    -- Verify admission number exists
    IF NOT EXISTS (
      SELECT 1 FROM students 
      WHERE admission_number = NEW.admission_number
    ) THEN
      RAISE EXCEPTION 'Invalid admission number';
    END IF;

    -- Check for duplicate admission number
    IF EXISTS (
      SELECT 1 FROM event_rsvps
      WHERE event_id = NEW.event_id 
      AND admission_number = NEW.admission_number
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')::uuid
    ) THEN
      RAISE EXCEPTION 'This admission number has already RSVP''d for this event';
    END IF;
  END IF;

  -- Validate guests count
  IF NEW.guests < 1 THEN
    RAISE EXCEPTION 'Number of guests must be at least 1';
  END IF;

  -- Get event's max guests per RSVP
  IF EXISTS (
    SELECT 1 FROM events 
    WHERE id = NEW.event_id 
    AND NEW.guests > max_guests_per_rsvp
  ) THEN
    RAISE EXCEPTION 'Exceeds maximum allowed guests per RSVP';
  END IF;

  -- Set updated_at timestamp
  NEW.updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS validate_rsvp ON event_rsvps;

-- Create new trigger for RSVP validation
CREATE TRIGGER validate_rsvp
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_rsvp();

-- Add partial index for active RSVPs
CREATE INDEX IF NOT EXISTS idx_active_rsvps
ON event_rsvps(event_id, guests)
WHERE status = 'attending';

-- Add constraint for valid status values
ALTER TABLE event_rsvps
DROP CONSTRAINT IF EXISTS valid_status_values;

ALTER TABLE event_rsvps
ADD CONSTRAINT valid_status_values
CHECK (status IN ('attending', 'not_attending', 'maybe'));