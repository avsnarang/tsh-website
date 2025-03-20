-- First, disable RLS temporarily
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "enable_read_for_all" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.users;

-- Create new non-recursive policy for users
CREATE POLICY "allow_users_manage_own_data"
ON public.users
FOR ALL
TO authenticated
USING (
    auth.uid() = id
    OR EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
    )
);

-- Create simplified policies for sports_programs
CREATE POLICY "allow_public_read_sports"
ON public.sports_programs
FOR SELECT
TO public
USING (true);

CREATE POLICY "allow_authenticated_write_sports"
ON public.sports_programs
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
    )
);

-- Re-enable RLS
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;