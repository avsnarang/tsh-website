/*
  # Fix admin authentication

  1. Changes
    - Create admin user with proper authentication
    - Add admin to admin_users table
    - Set up proper password hashing
*/

-- Enable the pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

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
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      invited_at,
      confirmation_token,
      confirmation_sent_at,
      recovery_token,
      recovery_sent_at,
      email_change_token_new,
      email_change,
      email_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      phone_change_sent_at,
      confirmed_at,
      email_change_token_current,
      email_change_confirm_status,
      banned_until,
      reauthentication_token,
      reauthentication_sent_at,
      is_sso_user,
      deleted_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      'admin@tsh.edu.in',
      crypt('Admin@123', gen_salt('bf')),
      now(),
      NULL,
      '',
      NULL,
      '',
      NULL,
      '',
      '',
      NULL,
      NULL,
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      FALSE,
      now(),
      now(),
      NULL,
      NULL,
      '',
      '',
      NULL,
      now(),
      '',
      0,
      NULL,
      '',
      NULL,
      FALSE,
      NULL
    );
  END IF;

  -- Get the user ID (whether newly created or existing)
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'admin@tsh.edu.in';

  -- Add user to admin_users table if not already present
  INSERT INTO admin_users (id)
  VALUES (v_user_id)
  ON CONFLICT (id) DO NOTHING;

END $$;