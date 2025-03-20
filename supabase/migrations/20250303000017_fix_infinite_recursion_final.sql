-- First, disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;

-- Create simplified policies for users table
CREATE POLICY "Enable read access for authenticated users" ON public.users
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable update for users based on role" ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Create simplified policies for sports_programs table
CREATE POLICY "Enable read access for all users" ON public.sports_programs
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Enable write access for authenticated users" ON public.sports_programs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT SELECT ON public.users TO authenticated;
GRANT UPDATE ON public.users TO authenticated;
GRANT ALL ON public.sports_programs TO authenticated; 