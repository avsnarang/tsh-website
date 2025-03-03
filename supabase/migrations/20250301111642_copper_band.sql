-- Ensure alumni_profiles exists before creating testimonials
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_name = 'alumni_profiles'
  ) THEN
    RAISE EXCEPTION 'alumni_profiles table must exist before creating testimonials';
  END IF;
END $$;

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL CHECK (source_type IN ('parent', 'student', 'alumni')),
  author_name text NOT NULL,
  student_name text,
  class text,
  content text NOT NULL,
  profile_picture_url text,
  alumni_profile_id uuid REFERENCES alumni_profiles(id),
  is_visible boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_alumni_profile_id 
ON testimonials(alumni_profile_id);

CREATE INDEX IF NOT EXISTS idx_testimonials_source_type_visible 
ON testimonials(source_type, is_visible);

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

-- Create materialized view
CREATE MATERIALIZED VIEW mv_featured_testimonials AS
SELECT 
  t.id,
  t.source_type,
  t.author_name,
  t.content,
  ap.batch_year,
  ap.occupation,
  ap.company,
  ap.profile_picture_url
FROM testimonials t
LEFT JOIN alumni_profiles ap ON t.alumni_profile_id = ap.id
WHERE t.is_visible = true;

CREATE UNIQUE INDEX ON mv_featured_testimonials (id);

-- Create refresh function and trigger
CREATE OR REPLACE FUNCTION refresh_featured_testimonials()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_featured_testimonials;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER refresh_featured_testimonials_trigger
AFTER INSERT OR UPDATE OR DELETE ON testimonials
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_featured_testimonials();
