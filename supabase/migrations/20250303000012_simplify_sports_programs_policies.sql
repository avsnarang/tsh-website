-- Disable RLS temporarily
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Enable read access for everyone" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "Allow public read access on sports_programs" ON public.sports_programs;
DROP POLICY IF EXISTS "Allow admin write access on sports_programs" ON public.sports_programs;
DROP POLICY IF EXISTS "sports_programs_read_policy" ON public.sports_programs;
DROP POLICY IF EXISTS "sports_programs_insert_policy" ON public.sports_programs;
DROP POLICY IF EXISTS "sports_programs_update_policy" ON public.sports_programs;
DROP POLICY IF EXISTS "sports_programs_delete_policy" ON public.sports_programs;

-- Create simplified policies without user role checks
CREATE POLICY "enable_read_for_all"
ON public.sports_programs FOR SELECT
TO public
USING (true);

CREATE POLICY "enable_write_for_authenticated"
ON public.sports_programs 
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;
