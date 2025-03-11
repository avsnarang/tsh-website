
-- First, verify RLS is enabled
alter table public.teachers enable row level security;

-- Drop existing policies if any
drop policy if exists "Enable read access for all users" on public.teachers;
drop policy if exists "Enable insert for authenticated users only" on public.teachers;
drop policy if exists "Enable update for authenticated users only" on public.teachers;
drop policy if exists "Enable delete for authenticated users only" on public.teachers;

-- Create comprehensive RLS policies
create policy "Enable read access for all users" 
    on public.teachers for select 
    using (true);

create policy "Enable insert for authenticated users only" 
    on public.teachers for insert 
    with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" 
    on public.teachers for update 
    using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" 
    on public.teachers for delete 
    using (auth.role() = 'authenticated');
