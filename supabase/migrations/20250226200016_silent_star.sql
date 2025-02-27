-- Add foreign key relationship between event_rsvps and students
ALTER TABLE event_rsvps
ADD CONSTRAINT event_rsvps_admission_number_fkey
FOREIGN KEY (admission_number)
REFERENCES students(admission_number)
ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_event_rsvps_admission_number
ON event_rsvps(admission_number);

-- Update the download RSVPs function to handle the relationship properly
CREATE OR REPLACE FUNCTION get_event_rsvps(event_id uuid)
RETURNS TABLE (
  admission_number text,
  student_name text,
  student_class text,
  guests integer,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    er.admission_number,
    s.full_name as student_name,
    s.class as student_class,
    er.guests,
    er.created_at
  FROM event_rsvps er
  LEFT JOIN students s ON er.admission_number = s.admission_number
  WHERE er.event_id = $1
  AND er.status = 'attending'
  ORDER BY er.created_at;
END;
$$ LANGUAGE plpgsql;