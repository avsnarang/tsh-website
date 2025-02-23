/*
  # Add Events Management

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `date` (date)
      - `time` (text)
      - `location` (text) 
      - `description` (text)
      - `cover_image` (text)
      - `max_capacity` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `event_rsvps`
      - `id` (uuid, primary key) 
      - `event_id` (uuid, references events)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
      - `guests` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for management users to manage events
    - Add policies for authenticated users to manage their RSVPs
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  cover_image text NOT NULL,
  max_capacity integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create event_rsvps table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('attending', 'not_attending', 'maybe')),
  guests integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- Policies for events table
CREATE POLICY "Anyone can read events"
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

-- Policies for event_rsvps table
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

-- Create function to get RSVP count
CREATE OR REPLACE FUNCTION get_event_rsvp_count(event_id uuid)
RETURNS integer
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = $1
    AND status = 'attending'
  );
END;
$$;

-- Add trigger to update updated_at on events
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();