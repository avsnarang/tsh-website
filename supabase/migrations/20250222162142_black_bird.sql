-- Add columns to events table if they don't exist
DO $$ 
BEGIN 
    -- Add max_guests_per_rsvp if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'events' 
        AND column_name = 'max_guests_per_rsvp'
    ) THEN
        ALTER TABLE events
        ADD COLUMN max_guests_per_rsvp integer NOT NULL DEFAULT 4;
    END IF;

    -- Add requires_admission_number if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'events' 
        AND column_name = 'requires_admission_number'
    ) THEN
        ALTER TABLE events
        ADD COLUMN requires_admission_number boolean NOT NULL DEFAULT false;
    END IF;
END $$;

-- Add columns to event_rsvps table if they don't exist
DO $$ 
BEGIN 
    -- Add admission_number if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'event_rsvps' 
        AND column_name = 'admission_number'
    ) THEN
        ALTER TABLE event_rsvps
        ADD COLUMN admission_number text;
    END IF;

    -- Add max_guests_per_rsvp if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'event_rsvps' 
        AND column_name = 'max_guests_per_rsvp'
    ) THEN
        ALTER TABLE event_rsvps
        ADD COLUMN max_guests_per_rsvp integer;
    END IF;
END $$;

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

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS validate_max_guests ON event_rsvps;
DROP TRIGGER IF EXISTS validate_admission_number ON event_rsvps;

-- Create triggers for validation
CREATE TRIGGER validate_max_guests
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION check_max_guests();

CREATE TRIGGER validate_admission_number
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION check_admission_number();
