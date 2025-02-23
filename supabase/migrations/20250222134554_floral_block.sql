/*
  # Add testimonial column to alumni_profiles

  1. Changes
    - Add testimonial column to alumni_profiles table
    - Add index for faster testimonial searches
*/

-- Add testimonial column if it doesn't exist
ALTER TABLE alumni_profiles 
ADD COLUMN IF NOT EXISTS testimonial text;

-- Create an index for faster testimonial searches
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_testimonial 
ON alumni_profiles (testimonial)
WHERE testimonial IS NOT NULL;