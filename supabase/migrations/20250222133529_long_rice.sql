/*
  # Add contact fields to alumni profiles

  1. New Columns
    - `phone` (text)
    - `email` (text)
    - `instagram_url` (text)
    - `facebook_url` (text)
    - `show_contact_info` (boolean)

  2. Changes
    - Added new contact fields
    - Added visibility control for contact information
*/

ALTER TABLE alumni_profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS instagram_url text,
ADD COLUMN IF NOT EXISTS facebook_url text,
ADD COLUMN IF NOT EXISTS show_contact_info boolean DEFAULT false;