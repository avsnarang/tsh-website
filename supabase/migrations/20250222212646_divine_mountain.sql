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

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_latest_updates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_latest_updates_updated_at
  BEFORE UPDATE ON latest_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_latest_updates_updated_at();

-- Insert initial update
INSERT INTO latest_updates (content, is_active)
VALUES ('Admissions Open for 2025-26 • Annual Sports Day on March 15th • Inter-School Science Exhibition on April 5th • Parent-Teacher Meeting on March 20th', true);