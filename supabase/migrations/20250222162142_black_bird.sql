-- Create function to validate max guests
CREATE OR REPLACE FUNCTION check_max_guests()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM events e
    WHERE e.id = NEW.event_id
    AND NEW.guests > e.max_guests_per_rsvp
  ) THEN
    RAISE EXCEPTION 'Number of guests exceeds maximum allowed per RSVP';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate admission number
CREATE OR REPLACE FUNCTION check_admission_number()
RETURNS TRIGGER AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM events e
    WHERE e.id = NEW.event_id
    AND e.requires_admission_number = true
    AND NEW.admission_number IS NULL
  ) THEN
    RAISE EXCEPTION 'Admission number is required for this event';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add columns to events table
ALTER TABLE events
ADD COLUMN max_guests_per_rsvp integer NOT NULL DEFAULT 4,
ADD COLUMN requires_admission_number boolean NOT NULL DEFAULT false;

-- Add columns to event_rsvps table
ALTER TABLE event_rsvps
ADD COLUMN admission_number text,
ADD COLUMN max_guests_per_rsvp integer;

-- Create triggers for validation
CREATE TRIGGER validate_max_guests
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION check_max_guests();

CREATE TRIGGER validate_admission_number
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION check_admission_number();