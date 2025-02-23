-- Add display_locations column to leadership_messages table with improved validation
ALTER TABLE leadership_messages
ADD COLUMN IF NOT EXISTS display_locations text[] DEFAULT ARRAY['all'];

-- Create index for faster display_locations filtering
CREATE INDEX IF NOT EXISTS idx_leadership_messages_display_locations 
ON leadership_messages USING GIN (display_locations);

-- Update existing messages to have 'all' as display location
UPDATE leadership_messages
SET display_locations = ARRAY['all']
WHERE display_locations IS NULL;

-- Drop existing constraints if they exist
ALTER TABLE leadership_messages
DROP CONSTRAINT IF EXISTS display_locations_not_empty,
DROP CONSTRAINT IF EXISTS valid_display_locations;

-- Add improved constraints
ALTER TABLE leadership_messages
ADD CONSTRAINT display_locations_not_empty 
CHECK (array_length(display_locations, 1) > 0),
ADD CONSTRAINT valid_display_locations 
CHECK (
  display_locations <@ ARRAY[
    'all',
    'homepage',
    'leadership',
    'paonta-sahib',
    'juniors',
    'majra'
  ]::text[]
);

-- Create function to validate display locations
CREATE OR REPLACE FUNCTION validate_display_locations()
RETURNS TRIGGER AS $$
BEGIN
  -- If array contains 'all', it should be the only value
  IF 'all' = ANY(NEW.display_locations) AND array_length(NEW.display_locations, 1) > 1 THEN
    RAISE EXCEPTION 'When "all" is selected, no other locations should be specified';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for display locations validation
DROP TRIGGER IF EXISTS check_display_locations ON leadership_messages;
CREATE TRIGGER check_display_locations
  BEFORE INSERT OR UPDATE ON leadership_messages
  FOR EACH ROW
  EXECUTE FUNCTION validate_display_locations();