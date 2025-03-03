create table if not exists public.leadership_messages (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    role text not null,
    preview text not null,
    full_message text not null,
    photo_url text,
    "order" integer not null,
    display_locations text[] default array['all']::text[],
    is_active boolean default true
);

-- Enable RLS
alter table public.leadership_messages enable row level security;

-- Create policies
create policy "Enable read access for all users" on public.leadership_messages
    for select using (true);

create policy "Enable insert for authenticated users only" on public.leadership_messages
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.leadership_messages
    for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.leadership_messages
    for delete using (auth.role() = 'authenticated');
