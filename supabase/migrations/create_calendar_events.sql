create table if not exists calendar_events (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    start_time timestamp with time zone not null,
    end_time timestamp with time zone not null,
    location text,
    event_type text not null,
    branch text not null,
    session text not null,
    is_public boolean default false,
    synced_with_google boolean default false,
    google_event_id text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Drop the constraint if it exists
alter table calendar_events
drop constraint if exists valid_event_type;

-- Add the constraint
alter table calendar_events
add constraint valid_event_type
foreign key (event_type)
references event_types(value)
on delete restrict
on update cascade;

-- Create an update trigger to set updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Drop the trigger if it exists before creating it
drop trigger if exists set_updated_at on calendar_events;

create trigger set_updated_at
    before update on calendar_events
    for each row
    execute function update_updated_at_column();
