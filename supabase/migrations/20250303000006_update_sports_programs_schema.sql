-- First, let's make sure we have the correct table structure
CREATE TABLE IF NOT EXISTS sports_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    category TEXT,
    coach TEXT,
    achievements TEXT,
    description TEXT,
    age_groups TEXT[] DEFAULT '{}',
    schedules JSONB DEFAULT '[]',
    images JSONB DEFAULT '{"main_image": "", "gallery_images": []}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_sports_programs_updated_at
    BEFORE UPDATE ON sports_programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add type checking for schedules
ALTER TABLE sports_programs 
    ADD CONSTRAINT valid_schedules_json 
    CHECK (
        jsonb_typeof(schedules) = 'array' 
        AND (
            schedules @> '[]'::jsonb 
            OR (
                schedules <@ '[{"type": "Weekday"}, {"type": "Weekend"}, {"type": "Summer"}, {"type": "Winter"}]'::jsonb
            )
        )
    );

-- Add type checking for images
ALTER TABLE sports_programs 
    ADD CONSTRAINT valid_images_json 
    CHECK (
        jsonb_typeof(images) = 'object' 
        AND images ? 'main_image' 
        AND images ? 'gallery_images' 
        AND jsonb_typeof(images->'gallery_images') = 'array'
    );

-- Grant necessary permissions again to be safe
GRANT ALL ON TABLE sports_programs TO authenticated;
GRANT SELECT ON TABLE sports_programs TO anon;