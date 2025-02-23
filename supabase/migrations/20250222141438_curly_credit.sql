/*
  # Add management system

  1. New Tables
    - `management_users`
      - `id` (uuid, primary key)
      - `role` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `management_users` table
    - Add policies for management access
*/

-- Create management_users table
CREATE TABLE IF NOT EXISTS management_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL DEFAULT 'manager',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE management_users ENABLE ROW LEVEL SECURITY;

-- Create policy for management users
CREATE POLICY "Management users can access their own data"
  ON management_users
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Create policy for public read access to check if user is management
CREATE POLICY "Public can check if user is management"
  ON management_users
  FOR SELECT
  TO public
  USING (true);

-- Create policies for management users to manage testimonials and gallery
CREATE POLICY "Management users can manage featured testimonials"
  ON featured_testimonials
  TO authenticated
  USING (EXISTS (SELECT 1 FROM management_users WHERE id = auth.uid()));

CREATE POLICY "Management users can manage gallery events"
  ON gallery_events
  TO authenticated
  USING (EXISTS (SELECT 1 FROM management_users WHERE id = auth.uid()));