-- Enable RLS on management_users if not already enabled
ALTER TABLE management_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Management users can view other management users" ON management_users;
DROP POLICY IF EXISTS "New users can create their first management account" ON management_users;

-- Create policies
CREATE POLICY "Management users can view other management users"
  ON management_users
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users WHERE id = auth.uid()
  ));

-- Allow new user creation only if no management users exist
CREATE POLICY "New users can create their first management account"
  ON management_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT EXISTS (SELECT 1 FROM management_users) -- Only allows insert if table is empty
    AND id = auth.uid() -- Ensures users can only create their own record
  );

-- Ensure proper table structure
DO $$ 
BEGIN
    -- Add role column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'management_users' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE management_users
        ADD COLUMN role text NOT NULL DEFAULT 'administrator';
    END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_management_users_id ON management_users(id);