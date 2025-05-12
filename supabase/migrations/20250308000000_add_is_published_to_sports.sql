-- Add is_published column
ALTER TABLE sports_programs 
ADD COLUMN is_published BOOLEAN DEFAULT true;

-- Update existing rows to be published
UPDATE sports_programs 
SET is_published = true 
WHERE is_published IS NULL;

-- Make the column not nullable after setting default values
ALTER TABLE sports_programs 
ALTER COLUMN is_published SET NOT NULL;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable read access for everyone" ON sports_programs;
DROP POLICY IF EXISTS "sports_programs_select_policy" ON sports_programs;

-- Create new policy for public access
CREATE POLICY "Allow public access to published sports"
ON sports_programs
FOR SELECT
TO public
USING (is_published = true);

-- Create policy for admin access
CREATE POLICY "Allow admin full access"
ON sports_programs
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 
        FROM auth_user_roles 
        WHERE auth_user_roles.user_id = auth.uid() 
        AND auth_user_roles.role = 'admin'
    )
);