/*
  # Create admin user

  1. Changes
    - Create admin user in auth.users
    - Add admin user to admin_users table
*/

-- Create admin user in auth.users if not exists
DO $$
DECLARE
  v_user_id uuid;
BEGIN
  -- First check if user already exists
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@tsh.edu.in';

  -- If user doesn't exist, create them
  IF v_user_id IS NULL THEN
    v_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role
    )
    VALUES (
      v_user_id,
      'admin@tsh.edu.in',
      -- Password is 'Admin@123'
      crypt('Admin@123', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      false,
      'authenticated'
    );
  END IF;

  -- Get the user ID (whether newly created or existing)
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@tsh.edu.in';

  -- Add user to admin_users table
  INSERT INTO admin_users (id)
  VALUES (v_user_id)
  ON CONFLICT (id) DO NOTHING;
END $$;