/*
  # Remove management system
  
  1. Changes
    - Drop management_users table
    - Remove management user from auth.users
*/

-- Drop management_users table
DROP TABLE IF EXISTS management_users CASCADE;

-- Remove management user
DELETE FROM auth.users 
WHERE email = 'management@scholars-home.edu.in';