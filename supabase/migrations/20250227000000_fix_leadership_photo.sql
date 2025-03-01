-- Add photo_url column if not exists
ALTER TABLE leadership_messages
ADD COLUMN IF NOT EXISTS photo_url text;

-- If there was an image_url column, migrate the data
UPDATE leadership_messages
SET photo_url = image_url
WHERE image_url IS NOT NULL AND photo_url IS NULL;

-- Drop the old column if it exists
ALTER TABLE leadership_messages
DROP COLUMN IF EXISTS image_url;