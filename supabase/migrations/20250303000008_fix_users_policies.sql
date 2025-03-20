-- Drop existing policies on users table
DROP POLICY IF EXISTS "Users can view their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data" ON auth.users;

-- Create simplified policies for users table
CREATE POLICY "Users can view their own data"
ON auth.users
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON auth.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Make sure RLS is enabled
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;