create table event_types (
  id uuid default uuid_generate_v4() primary key,
  value text not null unique,
  label text not null,
  icon_type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default event types
INSERT INTO event_types (value, label, icon_type) VALUES
  ('academic', 'Academic', 'book-open'),
  ('social', 'Social', 'users'),
  ('sports', 'Sports', 'trophy'),
  ('cultural', 'Cultural', 'music'),
  ('other', 'Other', 'tag');