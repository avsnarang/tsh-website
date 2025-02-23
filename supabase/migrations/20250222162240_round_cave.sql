-- Create events table if not exists
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  cover_image text NOT NULL,
  max_capacity integer,
  max_guests_per_rsvp integer NOT NULL DEFAULT 4,
  requires_admission_number boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_rsvps table if not exists
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),
  guests integer NOT NULL DEFAULT 1,
  admission_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create function to validate guests against max_guests_per_rsvp
CREATE OR REPLACE FUNCTION validate_rsvp_guests()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if guests exceed max_guests_per_rsvp
  IF NEW.guests > (SELECT max_guests_per_rsvp FROM events WHERE id = NEW.event_id) THEN
    RAISE EXCEPTION 'Number of guests cannot exceed maximum allowed per RSVP';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to validate admission number requirement
CREATE OR REPLACE FUNCTION validate_admission_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if admission number is required and provided
  IF (SELECT requires_admission_number FROM events WHERE id = NEW.event_id) 
     AND NEW.admission_number IS NULL THEN
    RAISE EXCEPTION 'Admission number is required for this event';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to enforce constraints
DROP TRIGGER IF EXISTS check_rsvp_guests ON event_rsvps;
CREATE TRIGGER check_rsvp_guests
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_rsvp_guests();

DROP TRIGGER IF EXISTS check_admission_number ON event_rsvps;
CREATE TRIGGER check_admission_number
  BEFORE INSERT OR UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION validate_admission_number();

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view events" ON events;
DROP POLICY IF EXISTS "Management users can manage events" ON events;
DROP POLICY IF EXISTS "Anyone can view RSVP counts" ON event_rsvps;
DROP POLICY IF EXISTS "Users can manage their own RSVPs" ON event_rsvps;

-- Create policies for events
CREATE POLICY "Anyone can view events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Management users can manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

-- Create policies for RSVPs
CREATE POLICY "Anyone can view RSVP counts"
  ON event_rsvps
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can manage their own RSVPs"
  ON event_rsvps
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());