/*
  # Create storage bucket for alumni profile pictures

  1. Storage
    - Create a new public bucket for alumni profile pictures
    - Enable public access for the bucket
*/

-- Create a new bucket for alumni profile pictures if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('alumni', 'alumni', true)
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'alumni');

-- Create a policy to allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'alumni' AND (storage.foldername(name))[1] = 'profile-pictures');

-- Create a policy to allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'alumni' AND (storage.foldername(name))[1] = 'profile-pictures');

-- Create a policy to allow public access to read files
CREATE POLICY "Allow public access to read files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'alumni');