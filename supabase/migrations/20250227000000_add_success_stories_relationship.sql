-- Create success_stories table if it doesn't exist
CREATE TABLE IF NOT EXISTS success_stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    alumni_id UUID NOT NULL REFERENCES alumni_profiles(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_success_stories_alumni_id ON success_stories(alumni_id);
CREATE INDEX IF NOT EXISTS idx_success_stories_created_at ON success_stories(created_at DESC);