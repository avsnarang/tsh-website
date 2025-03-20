-- First check if the table exists and has the correct columns
DO $$ 
BEGIN
  -- Add any missing columns
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'sports_programs' 
    AND column_name = 'levels'
  ) THEN
    ALTER TABLE sports_programs 
    ADD COLUMN levels text[] DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'sports_programs' 
    AND column_name = 'facilities'
  ) THEN
    ALTER TABLE sports_programs 
    ADD COLUMN facilities jsonb DEFAULT '[]';
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'sports_programs' 
    AND column_name = 'training_schedule'
  ) THEN
    ALTER TABLE sports_programs 
    ADD COLUMN training_schedule jsonb DEFAULT '{}';
  END IF;

  -- Ensure required columns are not null
  ALTER TABLE sports_programs 
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN category SET NOT NULL;

  -- Add any missing indexes
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_indexes 
    WHERE tablename = 'sports_programs' 
    AND indexname = 'idx_sports_programs_category'
  ) THEN
    CREATE INDEX idx_sports_programs_category ON sports_programs(category);
  END IF;

END $$;

-- Enable RLS if not already enabled
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable read access for all users" ON sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON sports_programs;

-- Create new policies
CREATE POLICY "Enable read access for all users" 
ON sports_programs FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable write access for authenticated users" 
ON sports_programs FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);