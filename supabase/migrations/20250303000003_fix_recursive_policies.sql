-- First, ensure RLS is enabled on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access on sports_programs" ON sports_programs;
DROP POLICY IF EXISTS "Allow admin write access on sports_programs" ON sports_programs;
DROP POLICY IF EXISTS "users_select_policy" ON users;
DROP POLICY IF EXISTS "users_insert_policy" ON users;

-- Create policies for users table first
CREATE POLICY "Enable read access for all users"
ON users FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON users FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for own user data"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Now create policies for sports_programs
CREATE POLICY "Allow public read access on sports_programs"
ON sports_programs FOR SELECT
TO public
USING (true);

-- Modified admin write access policy to use a simpler check
CREATE POLICY "Allow admin write access on sports_programs"
ON sports_programs
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'::user_role
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'::user_role
    )
);