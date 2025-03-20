-- First, disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "enable_read_for_all" ON public.users;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.users;
DROP POLICY IF EXISTS "enable_read_for_all" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.sports_programs;

-- Create simplified policy for users
CREATE POLICY "users_policy"
ON public.users
FOR ALL
TO authenticated
USING (
    auth.uid() = id 
    OR EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_roles.user_id = auth.uid() 
        AND user_roles.role = 'admin'
    )
);

-- Create simplified policies for sports_programs
CREATE POLICY "sports_programs_select_policy"
ON public.sports_programs
FOR SELECT
TO public
USING (true);

CREATE POLICY "sports_programs_modify_policy"
ON public.sports_programs
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_roles.user_id = auth.uid() 
        AND user_roles.role = 'admin'
    )
);

-- Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;
GRANT ALL ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;