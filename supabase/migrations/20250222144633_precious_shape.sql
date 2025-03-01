/*
  # Leadership Messages Storage

  1. New Tables
    - `leadership_messages`
      - `id` (uuid, primary key)
      - `role` (text)
      - `name` (text)
      - `preview` (text)
      - `full_message` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `leadership_messages` table
    - Add policy for public read access
    - Add policy for management users to manage messages
*/

-- Create leadership_messages table
CREATE TABLE IF NOT EXISTS leadership_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  name text NOT NULL,
  preview text NOT NULL,
  full_message text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE leadership_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can read leadership messages"
  ON leadership_messages
  FOR SELECT
  TO public
  USING (true);

-- Create policy for management users to manage messages
CREATE POLICY "Management users can manage leadership messages"
  ON leadership_messages
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

-- Add photo_url column if not exists
ALTER TABLE leadership_messages
ADD COLUMN IF NOT EXISTS photo_url text;

-- If there was an image_url column, migrate the data
UPDATE leadership_messages
SET photo_url = image_url
WHERE image_url IS NOT NULL AND photo_url IS NULL;

-- Drop the old column if it exists
ALTER TABLE leadership_messages
DROP COLUMN IF EXISTS image_url;

-- Insert initial messages
INSERT INTO leadership_messages (role, name, preview, full_message, "order")
VALUES 
  (
    'Chairperson',
    'Dr. Rajesh Kumar',
    'For over two decades, The Scholars'' Home has stood as a beacon of educational excellence...',
    E'Dear Parents and Students,\n\nFor over two decades, The Scholars'' Home has stood as a beacon of educational excellence, nurturing young minds and shaping future leaders. Our journey has been marked by continuous innovation, unwavering commitment to quality, and a deep-rooted belief in the transformative power of education.\n\nIn today''s rapidly evolving world, we remain committed to providing an education that balances academic rigor with character development, technological advancement with traditional values, and individual growth with social responsibility.\n\nTogether, let us continue to build a brighter future for our children.',
    1
  ),
  (
    'Managing Director',
    'Mrs. Priya Sharma',
    'Our institution''s success story is built on the foundation of innovation, excellence...',
    E'Welcome to The Scholars'' Home family,\n\nOur institution''s success story is built on the foundation of innovation, excellence, and a student-first approach. We believe in creating an environment where every child can discover their potential and pursue their passions.\n\nThrough our comprehensive curriculum, state-of-the-art facilities, and dedicated faculty, we ensure that our students receive an education that prepares them not just for examinations, but for life itself.\n\nWe invite you to be part of this transformative journey.',
    2
  ),
  (
    'Director',
    'Dr. Amit Verma',
    'Education at The Scholars'' Home goes beyond textbooks and classrooms...',
    E'Dear Students and Parents,\n\nEducation at The Scholars'' Home goes beyond textbooks and classrooms. We focus on creating an environment where learning is engaging, meaningful, and connected to real-world applications.\n\nOur dedicated team of educators works tirelessly to ensure that every student receives personalized attention and guidance. We believe in nurturing not just academic excellence, but also creativity, critical thinking, and leadership skills.\n\nTogether, we are building a community of lifelong learners and future leaders.',
    3
  );
