-- Add is_all_day column to calendar_events table
ALTER TABLE calendar_events
ADD COLUMN IF NOT EXISTS is_all_day BOOLEAN DEFAULT false;

-- Update existing events to set is_all_day based on time values
UPDATE calendar_events
SET is_all_day = true
WHERE 
  EXTRACT(HOUR FROM start_time) = 0 
  AND EXTRACT(MINUTE FROM start_time) = 0 
  AND EXTRACT(HOUR FROM end_time) = 23 
  AND EXTRACT(MINUTE FROM end_time) = 59;