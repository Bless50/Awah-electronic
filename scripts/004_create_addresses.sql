-- Create addresses table
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('billing', 'shipping')),
  first_name text not null,
  last_name text not null,
  company text,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'Cameroon',
  phone text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.addresses enable row level security;

-- Users can only access their own addresses
create policy "addresses_select_own"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "addresses_insert_own"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "addresses_update_own"
  on public.addresses for update
  using (auth.uid() = user_id);

create policy "addresses_delete_own"
  on public.addresses for delete
  using (auth.uid() = user_id);

-- Create index
create index if not exists addresses_user_id_idx on public.addresses(user_id);
