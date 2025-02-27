-- Drop existing function if it exists
DROP FUNCTION IF EXISTS get_event_total_guests(uuid);

-- Create function to get total guests count with explicit parameter name
CREATE OR REPLACE FUNCTION get_event_total_guests(p_event_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(guests), 0)
    FROM event_rsvps
    WHERE event_id = p_event_id
    AND status = 'attending'
  );
END;
$$ LANGUAGE plpgsql;

-- Create index for faster guest counting if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_event_rsvps_guests
ON event_rsvps(event_id, status, guests)
WHERE status = 'attending';