/*
  # Create new management authentication system
  
  1. Changes
    - Drop existing admin_users table
    - Create new management_users table
    - Set up new management account
*/

-- Drop existing admin_users table and related data
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create new management_users table
CREATE TABLE IF NOT EXISTS management_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL DEFAULT 'manager',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add updated_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'management_users' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE management_users ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Enable RLS
ALTER TABLE management_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Management users can access their own data" ON management_users;
DROP POLICY IF EXISTS "Public can check if user is management" ON management_users;

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

-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create initial management user
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- First, clean up any existing management user
  DELETE FROM management_users WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'management@scholars-home.edu.in'
  );
  
  DELETE FROM auth.users WHERE email = 'management@scholars-home.edu.in';

  -- Create new management user
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
    gen_random_uuid(),
    'management@scholars-home.edu.in',
    crypt('ScholarsMgmt@2025', gen_salt('bf')),
    now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object('role', 'management'),
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO v_user_id;

  -- Add user to management_users table
  INSERT INTO management_users (id, role)
  VALUES (v_user_id, 'administrator');
END $$;
