create table if not exists public.station_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  station_id smallint not null check (station_id between 1 and 4),
  completed_at timestamptz not null default now(),
  primary key (user_id, station_id)
);

create table if not exists public.map_visits (
  user_id uuid not null references auth.users (id) on delete cascade,
  location_id text not null check (
    location_id in (
      'gate',
      'station-1',
      'station-2',
      'station-3',
      'station-4',
      'pond',
      'courtyard',
      'bamboo-cart'
    )
  ),
  visited_at timestamptz not null default now(),
  primary key (user_id, location_id)
);

alter table public.station_progress enable row level security;
alter table public.map_visits enable row level security;

grant select, insert, update, delete on public.station_progress to authenticated;
grant select, insert, update, delete on public.map_visits to authenticated;

create policy "Users manage their own station progress"
  on public.station_progress
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their own map visits"
  on public.map_visits
  for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
