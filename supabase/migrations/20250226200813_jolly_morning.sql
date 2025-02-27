/*
  # Fix Event RSVPs RLS Policies

  1. Changes
    - Drop existing RLS policies for event_rsvps
    - Create new policies that allow:
      - Public to view RSVP counts
      - Anonymous users to create RSVPs
      - Authenticated users to manage their RSVPs
      - Management users to manage all RSVPs

  2. Security
    - Maintains data integrity
    - Allows anonymous RSVPs while preventing abuse
    - Preserves management access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view RSVP counts" ON event_rsvps;
DROP POLICY IF EXISTS "Users can manage their own RSVPs" ON event_rsvps;

-- Create new policies

-- Allow public to view RSVP counts
CREATE POLICY "Anyone can view RSVP counts"
  ON event_rsvps
  FOR SELECT
  TO public
  USING (true);

-- Allow anonymous users to create RSVPs
CREATE POLICY "Anonymous users can create RSVPs"
  ON event_rsvps
  FOR INSERT
  TO public
  WITH CHECK (
    -- Only allow RSVPs for events that are accepting them
    EXISTS (
      SELECT 1 FROM events 
      WHERE id = event_id 
      AND accepting_rsvps = true
    )
  );

-- Allow authenticated users to manage their RSVPs
CREATE POLICY "Authenticated users can manage their RSVPs"
  ON event_rsvps
  FOR ALL
  TO authenticated
  USING (
    -- Can manage their own RSVPs
    user_id = auth.uid()
    -- Management users can manage all RSVPs
    OR EXISTS (
      SELECT 1 FROM management_users 
      WHERE id = auth.uid()
    )
  )
  WITH CHECK (
    -- Can only create/update RSVPs for events that are accepting them
    EXISTS (
      SELECT 1 FROM events 
      WHERE id = event_id 
      AND accepting_rsvps = true
    )
    -- And must be their own RSVP or be a management user
    AND (
      user_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM management_users 
        WHERE id = auth.uid()
      )
    )
  );