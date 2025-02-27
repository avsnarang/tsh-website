/*
  # Fix duplicate RSVPs and enforce unique admission numbers

  1. Changes
    - Delete duplicate RSVPs keeping only the most recent one
    - Add unique constraint for admission numbers per event
    - Update validation function to enforce uniqueness

  2. Security
    - Ensures data integrity by preventing duplicate RSVPs
    - Maintains audit trail through updated_at timestamps
*/

-- First, delete duplicate RSVPs keeping only the most recent one
WITH duplicates AS (
  SELECT DISTINCT ON (event_id, admission_number) 
    id,
    event_id,
    admission_number,
    created_at
  FROM event_rsvps
  WHERE admission_number IS NOT NULL
  ORDER BY event_id, admission_number, created_at DESC
)
DELETE FROM event_rsvps e
USING (
  SELECT er.id
  FROM event_rsvps er
  LEFT JOIN duplicates d ON d.id = er.id
  WHERE er.admission_number IS NOT NULL
  AND d.id IS NULL
) AS to_delete
WHERE e.id = to_delete.id;

-- Now we can safely add the unique constraint
ALTER TABLE event_rsvps
DROP CONSTRAINT IF EXISTS unique_admission_number_per_event;

ALTER TABLE event_rsvps
ADD CONSTRAINT unique_admission_number_per_event 
UNIQUE NULLS NOT DISTINCT (event_id, admission_number);

-- Update validation function to check for existing RSVPs
CREATE OR REPLACE FUNCTION validate_admission_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Always require admission number verification
  IF NEW.admission_number IS NULL OR NEW.admission_number = '' THEN
    RAISE EXCEPTION 'Student admission number is required';
  END IF;
    
  -- Verify admission number exists in students table
  IF NOT EXISTS (
    SELECT 1 FROM students 
    WHERE admission_number = NEW.admission_number
  ) THEN
    RAISE EXCEPTION 'Invalid admission number';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;