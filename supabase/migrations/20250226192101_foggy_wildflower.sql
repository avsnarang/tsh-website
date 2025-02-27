-- Add primary_image_url column to gallery_events table
ALTER TABLE gallery_events
ADD COLUMN IF NOT EXISTS primary_image_url text;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image_url 
ON gallery_events(primary_image_url)
WHERE primary_image_url IS NOT NULL;

-- Update function to handle primary_image_url
CREATE OR REPLACE FUNCTION validate_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  -- If primary_image_id is set, validate it belongs to the event
  IF NEW.primary_image_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM gallery_images 
      WHERE id = NEW.primary_image_id 
      AND event_id = NEW.id
    ) THEN
      RAISE EXCEPTION 'Primary image must belong to this event';
    END IF;
  END IF;

  -- Clear primary_image_id if primary_image_url is set and vice versa
  IF NEW.primary_image_url IS NOT NULL THEN
    NEW.primary_image_id = NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;