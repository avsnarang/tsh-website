/*
  # Create users table with role-based authentication
  
  1. Changes
    - Create user_role enum
    - Create users table with role field
    - Set up RLS policies
    - Drop redundant admin_users table
*/

-- Drop existing admin_users table if it exists
DROP TABLE IF EXISTS admin_users;

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'alumni');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'alumni',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Set up Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Anyone can check user roles" ON users;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON users;

-- Create simplified policies
CREATE POLICY "users_select_policy" ON users
  USING (true);

CREATE POLICY "users_insert_policy" ON users
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_update_policy" ON users
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Migrate existing admin users
INSERT INTO users (id, email, role)
SELECT id, email, 'admin'::user_role
FROM auth.users
WHERE email = 'admin@tsh.edu.in'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';
