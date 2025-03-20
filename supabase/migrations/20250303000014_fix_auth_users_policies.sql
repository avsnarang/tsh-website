-- First, handle auth.users table
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_users_policy" ON auth.users;
DROP POLICY IF EXISTS "Users can view their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can view their own data." ON auth.users;
DROP POLICY IF EXISTS "Users can update own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data." ON auth.users;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'auth' 
        AND tablename = 'users' 
        AND policyname = 'auth_users_policy'
    ) THEN
        CREATE POLICY "auth_users_policy"
        ON auth.users
        FOR ALL
        TO authenticated
        USING (auth.uid() = id)
        WITH CHECK (auth.uid() = id);
    END IF;
END
$$;

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Handle public.users table
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_users_select_policy" ON public.users;
DROP POLICY IF EXISTS "public_users_modify_policy" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable update for own user data" ON public.users;
DROP POLICY IF EXISTS "users_select_policy" ON public.users;
DROP POLICY IF EXISTS "users_insert_policy" ON public.users;
DROP POLICY IF EXISTS "users_update_policy" ON public.users;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'public_users_select_policy'
    ) THEN
        CREATE POLICY "public_users_select_policy"
        ON public.users FOR SELECT
        TO public
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'public_users_modify_policy'
    ) THEN
        CREATE POLICY "public_users_modify_policy"
        ON public.users
        FOR ALL
        TO authenticated
        USING (auth.uid() = id)
        WITH CHECK (auth.uid() = id);
    END IF;
END
$$;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Handle sports_programs table
ALTER TABLE public.sports_programs DISABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sports_programs_select_policy" ON public.sports_programs;
DROP POLICY IF EXISTS "sports_programs_modify_policy" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for everyone" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.sports_programs;
DROP POLICY IF EXISTS "Enable write access for authenticated" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_read_for_all" ON public.sports_programs;
DROP POLICY IF EXISTS "enable_write_for_authenticated" ON public.sports_programs;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'sports_programs' 
        AND policyname = 'sports_programs_select_policy'
    ) THEN
        CREATE POLICY "sports_programs_select_policy"
        ON public.sports_programs FOR SELECT
        TO public
        USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'sports_programs' 
        AND policyname = 'sports_programs_modify_policy'
    ) THEN
        CREATE POLICY "sports_programs_modify_policy"
        ON public.sports_programs
        FOR ALL
        TO authenticated
        USING (true)
        WITH CHECK (true);
    END IF;
END
$$;

ALTER TABLE public.sports_programs ENABLE ROW LEVEL SECURITY;

-- Grant appropriate permissions
GRANT ALL ON public.users TO authenticated;
GRANT SELECT ON public.users TO anon;
GRANT ALL ON public.sports_programs TO authenticated;
GRANT SELECT ON public.sports_programs TO anon;
