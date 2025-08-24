-- Create cart items table
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable RLS
alter table public.cart_items enable row level security;

-- Users can only access their own cart items
create policy "cart_items_select_own"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "cart_items_insert_own"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "cart_items_update_own"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "cart_items_delete_own"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists cart_items_user_id_idx on public.cart_items(user_id);
create index if not exists cart_items_product_id_idx on public.cart_items(product_id);
