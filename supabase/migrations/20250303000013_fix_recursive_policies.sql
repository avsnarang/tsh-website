-- First, fix users table policies
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
DROP POLICY IF EXISTS "Enable update for own user data" ON users;
DROP POLICY IF EXISTS "users_select_policy" ON users;
DROP POLICY IF EXISTS "users_insert_policy" ON users;
DROP POLICY IF EXISTS "users_update_policy" ON users;

-- Create simplified policies for users
CREATE POLICY "enable_read_for_all"
ON users FOR SELECT
TO public
USING (true);

CREATE POLICY "enable_write_for_authenticated"
ON users FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Re-enable RLS on users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Now fix sports_programs policies
ALTER TABLE sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "enable_read_for_all" ON sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON sports_programs;

-- Create simplified policies for sports_programs
CREATE POLICY "enable_read_for_all"
ON sports_programs FOR SELECT
TO public
USING (true);

CREATE POLICY "enable_write_for_authenticated"
ON sports_programs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Re-enable RLS on sports_programs
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
GRANT ALL ON sports_programs TO authenticated;
GRANT SELECT ON sports_programs TO anon; 