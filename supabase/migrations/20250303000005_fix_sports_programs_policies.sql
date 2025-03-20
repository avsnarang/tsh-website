-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access on sports_programs" ON sports_programs;
DROP POLICY IF EXISTS "Allow admin write access on sports_programs" ON sports_programs;
DROP POLICY IF EXISTS "Enable insert for admins" ON sports_programs;
DROP POLICY IF EXISTS "Enable update for admins" ON sports_programs;
DROP POLICY IF EXISTS "Enable delete for admins" ON sports_programs;

-- Enable RLS
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Create separate policies for each operation
CREATE POLICY "Enable read access for everyone"
ON sports_programs FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for admins"
ON sports_programs FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 
        FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = 'admin'
    )
);

CREATE POLICY "Enable update for admins"
ON sports_programs FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = 'admin'
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 
        FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = 'admin'
    )
);

CREATE POLICY "Enable delete for admins"
ON sports_programs FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM users 
        WHERE users.id = auth.uid() 
        AND users.role = 'admin'
    )
);

-- Grant necessary permissions
GRANT ALL ON TABLE sports_programs TO authenticated;
GRANT SELECT ON TABLE sports_programs TO anon;
