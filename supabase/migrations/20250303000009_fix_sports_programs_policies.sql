-- First, disable RLS on sports_programs
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.sports_programs;

-- Create new simplified policies
CREATE POLICY "Enable read access for all users"
ON public.sports_programs
FOR SELECT
USING (true);

CREATE POLICY "Enable write access for authenticated users"
ON public.sports_programs
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users"
ON public.sports_programs
FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users"
ON public.sports_programs
FOR DELETE
USING (auth.role() = 'authenticated');

-- Re-enable RLS
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;