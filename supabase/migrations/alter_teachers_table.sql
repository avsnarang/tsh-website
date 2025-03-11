-- Add photo_url column if it doesn't exist
ALTER TABLE public.teachers 
ADD COLUMN IF NOT EXISTS photo_url TEXT;