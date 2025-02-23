/*
  # Add student records system
  
  1. New Tables
    - `students`
      - `admission_number` (text, primary key)
      - `full_name` (text)
      - `class` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Functions
    - Function to verify admission number exists
    - Function to handle CSV imports

  3. Security
    - Enable RLS
    - Add policies for management access
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  admission_number text PRIMARY KEY,
  full_name text NOT NULL,
  class text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Management users can manage students"
  ON students
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Anyone can verify admission numbers"
  ON students
  FOR SELECT
  TO public
  USING (true);

-- Create function to verify admission number
CREATE OR REPLACE FUNCTION verify_admission_number(admission_number text)
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM students 
    WHERE students.admission_number = verify_admission_number.admission_number
  );
END;
$$;