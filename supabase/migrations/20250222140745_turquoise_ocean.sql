/*
  # Create admin user with simplified approach
  
  1. Changes
    - Use simpler user creation approach
    - Remove unnecessary columns
    - Focus on essential fields only
*/

-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- First, remove existing admin user if any
  DELETE FROM admin_users WHERE id IN (
    SELECT id FROM auth.users WHERE email = 'admin@tsh.edu.in'
  );
  
  DELETE FROM auth.users WHERE email = 'admin@tsh.edu.in';

  -- Create new admin user with minimal required fields
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
    'admin@tsh.edu.in',
    crypt('Admin@123', gen_salt('bf')),
    now(),
    jsonb_build_object('provider', 'email', 'providers', array['email']),
    jsonb_build_object('role', 'admin'),
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
  RETURNING id INTO v_user_id;

  -- Add user to admin_users table
  INSERT INTO admin_users (id)
  VALUES (v_user_id);

END $$;