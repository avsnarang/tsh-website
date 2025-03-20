-- Add indexes for frequently accessed columns
CREATE INDEX IF NOT EXISTS idx_alumni_profiles_batch_year 
ON alumni_profiles(batch_year);

CREATE INDEX IF NOT EXISTS idx_gallery_events_date 
ON gallery_events(date DESC);

CREATE INDEX IF NOT EXISTS idx_leadership_messages_composite 
ON leadership_messages(display_locations, "order");

CREATE INDEX IF NOT EXISTS idx_featured_testimonials_visible 
ON featured_testimonials(created_at DESC) 
WHERE is_visible = true;

-- Optimize table storage
ALTER TABLE gallery_images 
SET (autovacuum_vacuum_scale_factor = 0.05);

ALTER TABLE event_rsvps 
SET (autovacuum_vacuum_scale_factor = 0.05);

-- Add foreign key constraints with indexes
ALTER TABLE gallery_images 
ADD CONSTRAINT fk_gallery_event 
FOREIGN KEY (event_id) 
REFERENCES gallery_events(id) 
ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_gallery_images_event_id 
ON gallery_images(event_id);

-- Add check constraints for data integrity
ALTER TABLE alumni_profiles 
ADD CONSTRAINT check_batch_year 
CHECK (batch_year >= 2003 AND batch_year <= extract(year from current_date));

-- Optimize text columns
ALTER TABLE gallery_events 
ALTER COLUMN description 
SET STORAGE EXTENDED;

-- Add JSONB column for schedules
ALTER TABLE sports_programs 
  ADD COLUMN IF NOT EXISTS schedules JSONB DEFAULT '[]'::jsonb;

-- Add check constraint for basic JSON array validation
ALTER TABLE sports_programs
  ADD CONSTRAINT valid_schedules_json
  CHECK (jsonb_typeof(schedules) = 'array');

-- Create a function to validate schedule types
CREATE OR REPLACE FUNCTION validate_schedule_types()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if any schedule has an invalid type
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(NEW.schedules) schedule
    WHERE schedule->>'type' NOT IN ('Weekday', 'Weekend', 'Summer', 'Winter')
  ) THEN
    RAISE EXCEPTION 'Invalid schedule type. Must be Weekday, Weekend, Summer, or Winter';
  END IF;
  
  -- Check if timings is an array
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(NEW.schedules) schedule
    WHERE jsonb_typeof(schedule->'timings') != 'array'
  ) THEN
    RAISE EXCEPTION 'Timings must be an array';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for schedule validation
DROP TRIGGER IF EXISTS validate_schedules ON sports_programs;
CREATE TRIGGER validate_schedules
  BEFORE INSERT OR UPDATE ON sports_programs
  FOR EACH ROW
  EXECUTE FUNCTION validate_schedule_types();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_sports_programs_schedules
ON sports_programs USING gin (schedules);
