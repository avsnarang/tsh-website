/*
  # Alumni Network Schema Setup

  1. New Tables
    - `alumni_profiles`
      - `id` (uuid, primary key, matches auth.users)
      - `full_name` (text)
      - `batch_year` (integer)
      - `current_location` (text)
      - `occupation` (text)
      - `company` (text)
      - `bio` (text)
      - `linkedin_url` (text)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on alumni_profiles table
    - Add policies for:
      - Public read access for public profiles
      - Authenticated users can read all profiles
      - Users can only update their own profile
*/

CREATE TABLE IF NOT EXISTS alumni_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  batch_year integer NOT NULL,
  current_location text,
  occupation text,
  company text,
  bio text,
  linkedin_url text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE alumni_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for public access to public profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON alumni_profiles
  FOR SELECT
  USING (is_public = true);

-- Policy for authenticated users to view all profiles
CREATE POLICY "Authenticated users can view all profiles"
  ON alumni_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile"
  ON alumni_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy for users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON alumni_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);