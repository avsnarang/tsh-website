-- Add accepting_rsvps column to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS accepting_rsvps boolean NOT NULL DEFAULT true;

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_events_accepting_rsvps 
ON events(accepting_rsvps);

-- Update existing events to accept RSVPs by default
UPDATE events 
SET accepting_rsvps = true 
WHERE accepting_rsvps IS NULL;