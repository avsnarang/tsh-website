-- Add display_locations column to leadership_messages table
ALTER TABLE leadership_messages
ADD COLUMN IF NOT EXISTS display_locations text[] DEFAULT ARRAY['all'];

-- Create index for faster display_locations filtering
CREATE INDEX IF NOT EXISTS idx_leadership_messages_display_locations 
ON leadership_messages USING GIN (display_locations);

-- Update existing messages to have 'all' as display location
UPDATE leadership_messages
SET display_locations = ARRAY['all']
WHERE display_locations IS NULL;

-- Add constraint to ensure display_locations is not empty
ALTER TABLE leadership_messages
ADD CONSTRAINT display_locations_not_empty 
CHECK (array_length(display_locations, 1) > 0);

-- Add constraint to ensure valid display locations
ALTER TABLE leadership_messages
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