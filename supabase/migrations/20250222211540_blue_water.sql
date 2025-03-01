-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Management users can manage testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public can view visible testimonials" ON testimonials;

-- Create policies
CREATE POLICY "Management users can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view visible testimonials"
  ON testimonials
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create or replace function to update updated_at
CREATE OR REPLACE FUNCTION update_testimonial_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonial_updated_at();