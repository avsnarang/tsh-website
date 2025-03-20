-- First check if the table exists
CREATE TABLE IF NOT EXISTS sports_programs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    name text,
    category text,
    coach text,
    achievements text,
    description text,
    age_groups text[], -- Make sure this exists and is of type text[]
    schedules jsonb,
    images jsonb
);

-- Add missing columns if they don't exist
DO $$ 
BEGIN
    -- Basic fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'name') THEN
        ALTER TABLE sports_programs ADD COLUMN name text NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'category') THEN
        ALTER TABLE sports_programs ADD COLUMN category text NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'description') THEN
        ALTER TABLE sports_programs ADD COLUMN description text NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'coach') THEN
        ALTER TABLE sports_programs ADD COLUMN coach text NOT NULL DEFAULT '';
    END IF;

    -- Schedule fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'schedule') THEN
        ALTER TABLE sports_programs ADD COLUMN schedule text NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'weekend_schedule') THEN
        ALTER TABLE sports_programs ADD COLUMN weekend_schedule text NOT NULL DEFAULT '';
    END IF;

    -- Achievement and image fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'achievements') THEN
        ALTER TABLE sports_programs ADD COLUMN achievements text NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'image') THEN
        ALTER TABLE sports_programs ADD COLUMN image text NOT NULL DEFAULT '';
    END IF;

    -- Complex fields (arrays and JSON)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'levels') THEN
        ALTER TABLE sports_programs ADD COLUMN levels text[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'facilities') THEN
        ALTER TABLE sports_programs ADD COLUMN facilities jsonb DEFAULT '[]';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'training_schedule') THEN
        ALTER TABLE sports_programs ADD COLUMN training_schedule jsonb DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'sports_programs' AND column_name = 'images') THEN
        ALTER TABLE sports_programs ADD COLUMN images jsonb DEFAULT json_build_object(
            'main_image', '',
            'gallery_images', ARRAY[]::text[],
            'training_images', ARRAY[]::text[],
            'facility_images', ARRAY[]::text[]
        );
    END IF;
END $$;

-- Add RLS policies
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
    ON sports_programs
    FOR SELECT
    TO public
    USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access"
    ON sports_programs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create indexes for frequently accessed columns
CREATE INDEX IF NOT EXISTS idx_sports_programs_category ON sports_programs(category);
CREATE INDEX IF NOT EXISTS idx_sports_programs_name ON sports_programs(name);
