/*
  # Add profile picture URL column

  1. Changes
    - Add profile_picture_url column to alumni_profiles table
*/

ALTER TABLE alumni_profiles 
ADD COLUMN IF NOT EXISTS profile_picture_url text;