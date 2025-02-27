/*
  # Fix Event RSVPs Migration

  1. Changes
    - Add updated_at column to event_rsvps
    - Create trigger for automatic updated_at updates
    - Update get_event_rsvps function with proper return type
    - Add performance index

  2. Security
    - No changes to RLS policies needed
*/

-- Add updated_at column to event_rsvps table
ALTER TABLE event_rsvps
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_event_rsvps_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_rsvps_updated_at
  BEFORE UPDATE ON event_rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_event_rsvps_updated_at();

-- Drop existing function before redefining
DROP FUNCTION IF EXISTS get_event_rsvps(uuid);

-- Create new get_event_rsvps function with updated return type
CREATE OR REPLACE FUNCTION get_event_rsvps(event_id uuid)
RETURNS TABLE (
  admission_number text,
  student_name text,
  student_class text,
  guests integer,
  created_at timestamptz,
  updated_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    er.admission_number,
    s.full_name as student_name,
    s.class as student_class,
    er.guests,
    er.created_at,
    er.updated_at
  FROM event_rsvps er
  LEFT JOIN students s ON er.admission_number = s.admission_number
  WHERE er.event_id = $1
  AND er.status = 'attending'
  ORDER BY er.created_at;
END;
$$ LANGUAGE plpgsql;

-- Add index for faster sorting
CREATE INDEX IF NOT EXISTS idx_event_rsvps_updated_at
ON event_rsvps(updated_at);