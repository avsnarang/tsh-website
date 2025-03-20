-- Create youtube_videos table
CREATE TABLE IF NOT EXISTS youtube_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  embed_code text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view visible videos" 
  ON youtube_videos
  FOR SELECT
  TO public
  USING (is_visible = true);

CREATE POLICY "Admin users can manage videos" 
  ON youtube_videos
  TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Create index for ordering
CREATE INDEX idx_youtube_videos_position ON youtube_videos(position);