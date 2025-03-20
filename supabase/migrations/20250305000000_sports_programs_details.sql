-- Add facilities and training details to sports_programs table
ALTER TABLE sports_programs
ADD COLUMN IF NOT EXISTS facilities jsonb DEFAULT '[]',
ADD COLUMN IF NOT EXISTS training_highlights text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS equipment text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS age_groups text[] DEFAULT '{}';

-- Add some sample data
UPDATE sports_programs
SET 
    facilities = '[
        {"name": "Professional Training Court", "description": "International standard facilities"},
        {"name": "Fitness Center", "description": "Modern equipment for strength training"},
        {"name": "Video Analysis Room", "description": "Technical analysis and improvement"}
    ]'::jsonb,
    training_highlights = ARRAY[
        'Professional coaching staff',
        'Personalized training programs',
        'Regular fitness assessments',
        'Competition preparation',
        'Mental conditioning sessions'
    ],
    equipment = ARRAY[
        'Professional grade equipment',
        'Safety gear provided',
        'Training aids and tools'
    ],
    age_groups = ARRAY[
        'Under 12',
        'Under 15',
        'Under 19',
        'Open Age'
    ]
WHERE category = 'Indoor Sports';
