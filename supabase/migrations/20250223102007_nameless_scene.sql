-- Add campus column to leadership_messages table
ALTER TABLE leadership_messages
ADD COLUMN IF NOT EXISTS campus text DEFAULT 'all';

-- Create index for faster campus filtering
CREATE INDEX IF NOT EXISTS idx_leadership_messages_campus 
ON leadership_messages(campus);

-- Update existing messages to have 'all' as campus
UPDATE leadership_messages
SET campus = 'all'
WHERE campus IS NULL;