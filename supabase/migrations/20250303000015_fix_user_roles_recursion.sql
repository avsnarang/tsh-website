-- First, disable RLS temporarily on tables
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "enable_read_for_all" ON public.users;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.users;
DROP POLICY IF EXISTS "allow_users_manage_own_data" ON public.users;
DROP POLICY IF EXISTS "allow_public_read_sports" ON public.sports_programs;
DROP POLICY IF EXISTS "allow_authenticated_write_sports" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for everyone" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_read_for_all" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.sports_programs;
DROP POLICY IF EXISTS "public_read" ON public.sports_programs;
DROP POLICY IF EXISTS "authenticated_write" ON public.sports_programs;
DROP POLICY IF EXISTS "public_read" ON public.users;
DROP POLICY IF EXISTS "authenticated_write" ON public.users;

-- Create simplified policies for users
CREATE POLICY "enable_read_for_all"
ON public.users FOR SELECT
TO public
USING (true);

CREATE POLICY "enable_write_for_authenticated"
ON public.users FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create simplified policies for sports_programs
CREATE POLICY "enable_read_for_all"
ON public.sports_programs FOR SELECT
TO public
USING (true);

CREATE POLICY "enable_write_for_authenticated"
ON public.sports_programs FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Re-enable RLS on tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;
