/*
  # Add initial admin user

  1. Changes
    - Insert initial admin user into admin_users table
*/

-- First, we need to get the user ID for admin@tsh.edu.in from auth.users
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get the user ID
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@tsh.edu.in';

  -- If user exists, add them as admin
  IF v_user_id IS NOT NULL THEN
    INSERT INTO admin_users (id)
    VALUES (v_user_id)
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;