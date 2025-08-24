-- Create categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  image_url text,
  parent_id uuid references public.categories(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (categories are public readable, admin writable)
alter table public.categories enable row level security;

-- Allow everyone to read categories
create policy "categories_select_all"
  on public.categories for select
  using (true);

-- Only authenticated users can insert/update/delete (admin functionality)
create policy "categories_insert_authenticated"
  on public.categories for insert
  with check (auth.uid() is not null);

create policy "categories_update_authenticated"
  on public.categories for update
  using (auth.uid() is not null);

create policy "categories_delete_authenticated"
  on public.categories for delete
  using (auth.uid() is not null);
