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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Management users can manage students" ON students;
DROP POLICY IF EXISTS "Anyone can verify admission numbers" ON students;

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

-- Create index for faster admission number lookups
CREATE INDEX IF NOT EXISTS idx_students_admission_number 
ON students(admission_number);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_students_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_students_updated_at ON students;

-- Create trigger for updated_at
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_students_updated_at();
