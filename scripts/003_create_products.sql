-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10,2) not null check (price >= 0),
  compare_at_price decimal(10,2) check (compare_at_price >= 0),
  sku text unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  category_id uuid references public.categories(id) on delete set null,
  brand text,
  model text,
  specifications jsonb,
  images text[] default '{}',
  featured boolean default false,
  status text default 'active' check (status in ('active', 'inactive', 'out_of_stock')),
  weight decimal(8,2),
  dimensions jsonb, -- {length, width, height}
  warranty_period text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Allow everyone to read active products
create policy "products_select_active"
  on public.products for select
  using (status = 'active');

-- Only authenticated users can manage products (admin functionality)
create policy "products_insert_authenticated"
  on public.products for insert
  with check (auth.uid() is not null);

create policy "products_update_authenticated"
  on public.products for update
  using (auth.uid() is not null);

create policy "products_delete_authenticated"
  on public.products for delete
  using (auth.uid() is not null);

-- Create index for better performance
create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_status_idx on public.products(status);
create index if not exists products_featured_idx on public.products(featured);
