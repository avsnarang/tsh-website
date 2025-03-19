-- Add link column to latest_updates table
ALTER TABLE latest_updates
ADD COLUMN IF NOT EXISTS link text;

-- Create index for potential future filtering/searching
CREATE INDEX IF NOT EXISTS idx_latest_updates_link 
ON latest_updates(link)
WHERE link IS NOT NULL;