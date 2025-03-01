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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read leadership messages" ON leadership_messages;
DROP POLICY IF EXISTS "Management users can manage leadership messages" ON leadership_messages;

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

-- Insert initial messages
INSERT INTO leadership_messages (role, name, preview, full_message, "order")
VALUES 
  (
    'Chairperson',
    'Dr. Rajesh Kumar',
    'For over two decades, The Scholars'' Home has stood as a beacon of educational excellence...',
    'For over two decades, The Scholars'' Home has stood as a beacon of educational excellence in the region. Our commitment to nurturing young minds and shaping future leaders remains unwavering. Through our innovative teaching methods, state-of-the-art facilities, and dedicated faculty, we continue to set new standards in education. As we look to the future, we remain committed to our founding principles while embracing modern pedagogical approaches.',
    1
  );
