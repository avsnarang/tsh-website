-- Enable RLS on calendar_events table
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow all users to view calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Allow authenticated users to manage calendar events" ON calendar_events;

-- Create policies
CREATE POLICY "Allow all users to view calendar events"
ON calendar_events
FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated users to manage calendar events"
ON calendar_events
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);