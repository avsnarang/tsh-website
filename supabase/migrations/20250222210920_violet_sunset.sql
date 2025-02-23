/*
  # Create Testimonials System

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key)
      - `source_type` (text) - parent/student/alumni
      - `author_name` (text)
      - `student_name` (text, for parent testimonials)
      - `class` (text, for student/parent testimonials)
      - `content` (text)
      - `profile_picture_url` (text)
      - `is_visible` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `testimonials` table
    - Add policies for management users and public access
*/

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL CHECK (source_type IN ('parent', 'student', 'alumni')),
  author_name text NOT NULL,
  student_name text,
  class text,
  content text NOT NULL,
  profile_picture_url text,
  is_visible boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Management users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view visible testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_testimonial_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonial_updated_at();

-- Create index for faster filtering
CREATE INDEX idx_testimonials_source_type_visible 
ON testimonials(source_type, is_visible);