-- Add photo_url column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'leadership_messages' 
        AND column_name = 'photo_url'
    ) THEN
        ALTER TABLE leadership_messages
        ADD COLUMN photo_url text;
    END IF;
END $$;
