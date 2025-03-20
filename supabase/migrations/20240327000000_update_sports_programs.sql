-- Drop existing table and related objects
DROP TABLE IF EXISTS sports_programs CASCADE;

-- Create the sports_programs table
CREATE TABLE sports_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    coach TEXT,
    achievements TEXT,
    description TEXT,
    age_groups TEXT[],
    schedules JSONB,
    images JSONB,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE sports_programs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all authenticated users to view sports_programs"
ON sports_programs FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow admins to insert sports_programs"
ON sports_programs FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth_user_roles
    WHERE auth_user_roles.user_id = auth.uid()
    AND auth_user_roles.role = 'admin'
  )
);

CREATE POLICY "Allow admins to update sports_programs"
ON sports_programs FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth_user_roles
    WHERE auth_user_roles.user_id = auth.uid()
    AND auth_user_roles.role = 'admin'
  )
);

CREATE POLICY "Allow admins to delete sports_programs"
ON sports_programs FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth_user_roles
    WHERE auth_user_roles.user_id = auth.uid()
    AND auth_user_roles.role = 'admin'
  )
);

-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating timestamps
CREATE TRIGGER update_sports_programs_updated_at
    BEFORE UPDATE ON sports_programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for setting auth fields
CREATE OR REPLACE FUNCTION set_auth_user_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    NEW.created_by = auth.uid();
    NEW.updated_by = auth.uid();
  ELSIF (TG_OP = 'UPDATE') THEN
    NEW.updated_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_sports_programs_auth_fields
    BEFORE INSERT OR UPDATE ON sports_programs
    FOR EACH ROW
    EXECUTE FUNCTION set_auth_user_fields();
