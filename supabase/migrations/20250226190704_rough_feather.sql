-- Add primary_image_id column to gallery_events table
ALTER TABLE gallery_events
ADD COLUMN primary_image_id uuid REFERENCES gallery_images(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image 
ON gallery_events(primary_image_id);

-- Create function to validate primary image belongs to event
CREATE OR REPLACE FUNCTION validate_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.primary_image_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM gallery_images 
      WHERE id = NEW.primary_image_id 
      AND event_id = NEW.id
    ) THEN
      RAISE EXCEPTION 'Primary image must belong to this event';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for primary image validation
CREATE TRIGGER check_primary_image
  BEFORE INSERT OR UPDATE ON gallery_events
  FOR EACH ROW
  EXECUTE FUNCTION validate_primary_image();