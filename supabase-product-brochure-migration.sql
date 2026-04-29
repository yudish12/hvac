-- ------------------------------------------------------------
-- Incremental migration: add brochure PDF support to products
-- Run this if your `products` table already exists in Supabase
-- and you do NOT want to re-run the full setup script.
-- ------------------------------------------------------------

alter table public.products
  add column if not exists brochure_url text;

insert into storage.buckets (id, name, public)
values ('product-brochures', 'product-brochures', true)
on conflict (id) do nothing;

drop policy if exists "Product brochures are publicly readable"       on storage.objects;
drop policy if exists "Authenticated users can upload product brochures" on storage.objects;
drop policy if exists "Authenticated users can update product brochures" on storage.objects;
drop policy if exists "Authenticated users can delete product brochures" on storage.objects;

create policy "Product brochures are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-brochures');

create policy "Authenticated users can upload product brochures"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-brochures');

create policy "Authenticated users can update product brochures"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-brochures');

create policy "Authenticated users can delete product brochures"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-brochures');
