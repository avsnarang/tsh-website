/*
  # Fix admin authentication - final attempt 2

  1. Changes
    - Remove direct setting of generated columns
    - Simplify the user creation process
    - Ensure proper authentication setup
*/

-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin user in auth.users if not exists
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- First, remove existing admin user if any
  DELETE FROM admin_users WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@tsh.edu.in'
  );
  
  DELETE FROM auth.users WHERE email = 'admin@tsh.edu.in';

  -- Create new admin user
  v_user_id := gen_random_uuid();
    
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at
  )
  VALUES (
    '00000000-0000-0000-0000-000000000000',
    v_user_id,
    'authenticated',
    'authenticated',
    'admin@tsh.edu.in',
    crypt('Admin@123', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"], "role": "admin"}',
    '{"role": "admin"}',
    FALSE,
    now(),
    now()
  );

  -- Add user to admin_users table
  INSERT INTO admin_users (id)
  VALUES (v_user_id);

END $$;