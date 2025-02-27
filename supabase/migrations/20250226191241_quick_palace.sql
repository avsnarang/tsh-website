/*
  # Add primary image support to gallery events

  1. Changes
    - Add primary_image_id column if not exists
    - Create index for faster lookups
    - Add validation to ensure primary image belongs to event
    - Add trigger for validation

  2. Validation
    - Ensures primary image belongs to the same event
    - Handles null values appropriately
*/

-- Check if column exists before adding
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'gallery_events' 
    AND column_name = 'primary_image_id'
  ) THEN
    -- Add primary_image_id column
    ALTER TABLE gallery_events
    ADD COLUMN primary_image_id uuid REFERENCES gallery_images(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create index for faster lookups if not exists
CREATE INDEX IF NOT EXISTS idx_gallery_events_primary_image 
ON gallery_events(primary_image_id);

-- Create or replace function to validate primary image belongs to event
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

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS check_primary_image ON gallery_events;
CREATE TRIGGER check_primary_image
  BEFORE INSERT OR UPDATE ON gallery_events
  FOR EACH ROW
  EXECUTE FUNCTION validate_primary_image();