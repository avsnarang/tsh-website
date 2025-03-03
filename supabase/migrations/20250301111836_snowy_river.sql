-- Create latest_updates table
CREATE TABLE IF NOT EXISTS latest_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE latest_updates ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Management users can manage updates" ON latest_updates;
DROP POLICY IF EXISTS "Public can view active updates" ON latest_updates;

-- Create policies
CREATE POLICY "Management users can manage updates"
  ON latest_updates
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view active updates"
  ON latest_updates
  FOR SELECT
  TO public
  USING (is_active = true);

-- Add partial index for filtered queries
CREATE INDEX IF NOT EXISTS idx_latest_updates_active 
ON latest_updates(created_at DESC) 
WHERE is_active = true;

-- Create or replace function to update updated_at
CREATE OR REPLACE FUNCTION update_latest_updates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_latest_updates_updated_at ON latest_updates;
CREATE TRIGGER update_latest_updates_updated_at
  BEFORE UPDATE ON latest_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_latest_updates_updated_at();

-- Insert initial update if table is empty
INSERT INTO latest_updates (content, is_active)
SELECT 'Admissions Open for 2025-26 • Annual Sports Day on March 15th • Inter-School Science Exhibition on April 5th • Parent-Teacher Meeting on March 20th', true
WHERE NOT EXISTS (SELECT 1 FROM latest_updates);
