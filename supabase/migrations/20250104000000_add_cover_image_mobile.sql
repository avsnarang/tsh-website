-- Add cover_image_mobile column to events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS cover_image_mobile text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_events_cover_image_mobile 
ON events(cover_image_mobile)
WHERE cover_image_mobile IS NOT NULL;

