/*
  # Gallery Management Policies Fix

  1. Security
    - Add policies for management users to manage gallery content
    - Add policies for public read access
    - Add cascade delete for gallery images
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Drop gallery_events policies
  DROP POLICY IF EXISTS "Management users can manage gallery events" ON gallery_events;
  DROP POLICY IF EXISTS "Public can view gallery events" ON gallery_events;
  
  -- Drop gallery_images policies
  DROP POLICY IF EXISTS "Management users can manage gallery images" ON gallery_images;
  DROP POLICY IF EXISTS "Public can view gallery images" ON gallery_images;
END $$;

-- Create policies for gallery_events
CREATE POLICY "Management users can manage gallery events"
  ON gallery_events
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view gallery events"
  ON gallery_events
  FOR SELECT
  TO public
  USING (true);

-- Create policies for gallery_images
CREATE POLICY "Management users can manage gallery images"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM management_users 
    WHERE id = auth.uid()
  ));

CREATE POLICY "Public can view gallery images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);

-- Add cascade delete for gallery_images when event is deleted
ALTER TABLE gallery_images
DROP CONSTRAINT IF EXISTS gallery_images_event_id_fkey,
ADD CONSTRAINT gallery_images_event_id_fkey
  FOREIGN KEY (event_id)
  REFERENCES gallery_events(id)
  ON DELETE CASCADE;