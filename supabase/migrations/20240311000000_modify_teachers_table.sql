-- First, verify if the table exists
CREATE TABLE IF NOT EXISTS teachers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name text NOT NULL,
    subject text NOT NULL,
    class_level text NOT NULL,
    qualifications text NOT NULL,
    experience_years integer NOT NULL,
    photo_url text,
    is_visible boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- If the subject column exists as an array, we'll modify it to be text
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'teachers' 
        AND column_name = 'subject' 
        AND data_type = 'ARRAY'
    ) THEN
        -- Convert existing array data to string (taking first element or empty string)
        ALTER TABLE teachers 
        ALTER COLUMN subject TYPE text 
        USING COALESCE(subject[1], '');
    END IF;
END$$;

-- Add constraint for class_level
ALTER TABLE teachers
    DROP CONSTRAINT IF EXISTS valid_class_level;

ALTER TABLE teachers
    ADD CONSTRAINT valid_class_level 
    CHECK (class_level IN ('NTT', 'PRT', 'TGT', 'PGT'));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_teachers_full_name ON teachers(full_name);
CREATE INDEX IF NOT EXISTS idx_teachers_subject ON teachers(subject);
CREATE INDEX IF NOT EXISTS idx_teachers_class_level ON teachers(class_level);

-- Enable Row Level Security (RLS)
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON teachers;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON teachers;

CREATE POLICY "Enable read access for all users" 
    ON teachers FOR SELECT 
    USING (true);

CREATE POLICY "Enable write access for authenticated users" 
    ON teachers FOR ALL 
    USING (auth.role() = 'authenticated');