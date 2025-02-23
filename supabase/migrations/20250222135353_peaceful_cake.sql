/*
  # Add show_testimonial column to alumni_profiles table

  1. Changes
    - Add show_testimonial column with default value true
    - This allows alumni to control whether their testimonials can be featured on the homepage

  2. Notes
    - Default is true to maintain existing behavior
    - Boolean type for simple true/false control
*/

-- Add show_testimonial column if it doesn't exist
ALTER TABLE alumni_profiles 
ADD COLUMN IF NOT EXISTS show_testimonial boolean DEFAULT true;

-- Create an index for faster filtering of public testimonials
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_show_testimonial 
ON alumni_profiles (show_testimonial)
WHERE show_testimonial = true;