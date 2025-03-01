/*
  # Add management tables for testimonials and gallery

  1. New Tables
    - `featured_testimonials`: Manually curated testimonials
    - `gallery_events`: Events with images
    - `gallery_images`: Images associated with events

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create featured_testimonials table
CREATE TABLE IF NOT EXISTS featured_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alumni_profile_id uuid REFERENCES alumni_profiles(id),
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE featured_testimonials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin users can manage featured testimonials" ON featured_testimonials;
DROP POLICY IF EXISTS "Public can view featured testimonials" ON featured_testimonials;
DROP POLICY IF EXISTS "Admin users can manage gallery events" ON gallery_events;
DROP POLICY IF EXISTS "Public can view gallery events" ON gallery_events;
DROP POLICY IF EXISTS "Admin users can manage gallery images" ON gallery_images;
DROP POLICY IF EXISTS "Public can view gallery images" ON gallery_images;

-- Create policies for admin users
CREATE POLICY "Admin users can manage featured testimonials"
  ON featured_testimonials
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view featured testimonials"
  ON featured_testimonials
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create gallery_events table
CREATE TABLE IF NOT EXISTS gallery_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  campus text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_events ENABLE ROW LEVEL SECURITY;

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES gallery_events(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery tables
CREATE POLICY "Admin users can manage gallery events"
  ON gallery_events
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view gallery events"
  ON gallery_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin users can manage gallery images"
  ON gallery_images
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);
