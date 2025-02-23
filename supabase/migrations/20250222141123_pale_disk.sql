/*
  # Fix management authentication system
  
  1. Changes
    - Drop existing tables
    - Create new management_users table
    - Create management user only if doesn't exist
*/

-- Drop existing tables
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS management_users CASCADE;

-- Create new management_users table
CREATE TABLE management_users (
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

-- Create initial management user if doesn't exist
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'management@scholars-home.edu.in';

  -- Only create user if doesn't exist
  IF v_user_id IS NULL THEN
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      aud,
      role
    )
    VALUES (
      '00000000-0000-0000-0000-000000000001',
      'management@scholars-home.edu.in',
      crypt('ScholarsMgmt@2025', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"role":"management"}',
      now(),
      now(),
      'authenticated',
      'authenticated'
    )
    RETURNING id INTO v_user_id;
  END IF;

  -- Add user to management_users table if not already present
  INSERT INTO management_users (id, role)
  VALUES (v_user_id, 'administrator')
  ON CONFLICT (id) DO NOTHING;
END $$;