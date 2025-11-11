/*
  # Create storage bucket for event images
  
  1. Storage
    - Create a new public bucket for event cover images
    - Enable public access for the bucket
*/

-- Create a new bucket for event images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('events', 'events', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for event images bucket
-- Allow authenticated users to upload files
CREATE POLICY IF NOT EXISTS "Allow authenticated users to upload event images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'events');

-- Allow authenticated users to update event images
CREATE POLICY IF NOT EXISTS "Allow authenticated users to update event images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'events');

-- Allow authenticated users to delete event images
CREATE POLICY IF NOT EXISTS "Allow authenticated users to delete event images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'events');

-- Allow public access to read event images
CREATE POLICY IF NOT EXISTS "Allow public access to read event images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'events');

