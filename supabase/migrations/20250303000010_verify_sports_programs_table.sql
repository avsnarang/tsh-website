-- Verify and update sports_programs table structure
CREATE TABLE IF NOT EXISTS public.sports_programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    coach TEXT,
    achievements TEXT,
    description TEXT,
    age_groups TEXT[],
    schedules JSONB,
    images JSONB
);

-- Grant necessary permissions
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;