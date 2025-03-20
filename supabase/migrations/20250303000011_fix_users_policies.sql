-- First disable RLS temporarily
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can view their own data." ON auth.users;
DROP POLICY IF EXISTS "Users can update own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data." ON auth.users;

-- Create new simplified policies
DO $$ 
BEGIN
    -- Create select policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'auth' 
        AND tablename = 'users' 
        AND policyname = 'Users can view their own data'
    ) THEN
        CREATE POLICY "Users can view their own data"
        ON auth.users
        FOR SELECT
        USING (
            auth.uid() = id
        );
    END IF;

    -- Create update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'auth' 
        AND tablename = 'users' 
        AND policyname = 'Users can update own data'
    ) THEN
        CREATE POLICY "Users can update own data"
        ON auth.users
        FOR UPDATE
        USING (
            auth.uid() = id
        )
        WITH CHECK (
            auth.uid() = id
        );
    END IF;
END
$$;

-- Re-enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
