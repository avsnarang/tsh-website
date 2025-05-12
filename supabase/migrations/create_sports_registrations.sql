
-- Drop existing table and related objects if they exist
drop trigger if exists check_student_admission on sports_registrations;
drop function if exists verify_student_admission();
drop table if exists sports_registrations;

-- Create the table
create table public.sports_registrations (
    id uuid default gen_random_uuid() primary key,
    admission_number text references students(admission_number) not null,
    sport_id uuid references sports_programs(id) not null,
    medical_conditions text,
    preferred_schedule text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text check (status in ('pending', 'approved', 'rejected')) default 'pending',
    unique(admission_number, sport_id)
);

-- Enable RLS
alter table public.sports_registrations enable row level security;

-- Drop existing policies
drop policy if exists "Users can view their own registrations" on sports_registrations;
drop policy if exists "Users can insert their own registrations" on sports_registrations;

-- Create simplified policies
create policy "Enable read access for all users"
    on sports_registrations for select
    using (true);

create policy "Enable insert for all users"
    on sports_registrations for insert
    with check (true);

-- Create a trigger function to verify admission number
create or replace function verify_student_admission()
returns trigger as $$
begin
    -- Verify the student exists in students table
    if not exists (
        select 1 
        from students 
        where admission_number = NEW.admission_number
    ) then
        raise exception 'Invalid admission number';
    end if;
    
    return NEW;
end;
$$ language plpgsql;

-- Create trigger
create trigger check_student_admission
    before insert or update on sports_registrations
    for each row
    execute function verify_student_admission();
