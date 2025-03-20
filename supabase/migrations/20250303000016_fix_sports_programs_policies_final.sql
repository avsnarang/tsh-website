-- First, disable RLS temporarily
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "enable_read_for_all" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.sports_programs;
DROP POLICY IF EXISTS "allow_public_read_sports" ON public.sports_programs;
DROP POLICY IF EXISTS "allow_authenticated_write_sports" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for everyone" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated" ON public.sports_programs;

-- Create simplified policies that don't check user roles
CREATE POLICY "sports_programs_read_policy"
ON public.sports_programs
FOR SELECT
TO public
USING (true);

CREATE POLICY "sports_programs_write_policy"
ON public.sports_programs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon; 