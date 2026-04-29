-- ============================================================
-- UNITECH AIRCON — SUPABASE DATABASE SETUP (Blue Star catalog)
-- Run this entire script in Supabase SQL Editor.
-- Dashboard  →  SQL Editor  →  New Query  →  Paste  →  Run
--
-- Safe to re-run: this script drops and recreates the
-- `products` table and refreshes policies & seeds.
-- The `enquiries` table is preserved.
-- ============================================================

-- ------------------------------------------------------------
-- 0. Drop old product schema (clean slate)
-- ------------------------------------------------------------
drop trigger if exists set_products_updated_at on public.products;
drop table   if exists public.products cascade;

-- ------------------------------------------------------------
-- 1. PRODUCTS TABLE
--    Category + Subcategory are text slugs that mirror the
--    hard-coded taxonomy defined in
--    `src/constants/productCategories.js`.
-- ------------------------------------------------------------
create table public.products (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null    default now(),
  updated_at    timestamptz not null    default now(),
  category      text        not null,
  subcategory   text        not null,
  title         text        not null,
  description   text,
  brand         text        not null    default 'Blue Star',
  price         text,
  capacity      text,
  features      text[]      not null    default '{}',
  image_url     text,
  brochure_url  text,
  sort_order    int         not null    default 0,
  is_active     boolean     not null    default true
);

-- ------------------------------------------------------------
-- 2. Indexes for performance
-- ------------------------------------------------------------
create index idx_products_category    on public.products (category);
create index idx_products_cat_sub     on public.products (category, subcategory);
create index idx_products_active_sort on public.products (is_active, sort_order);

-- ------------------------------------------------------------
-- 3. updated_at trigger
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- 4. ENQUIRIES TABLE (create if not exists — preserves data)
-- ------------------------------------------------------------
create table if not exists public.enquiries (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  name        text        not null,
  phone       text        not null,
  email       text,
  requirement text,
  message     text,
  is_read     boolean     default false
);

-- ------------------------------------------------------------
-- 5. Row-Level Security
-- ------------------------------------------------------------
alter table public.products  enable row level security;
alter table public.enquiries enable row level security;

-- --- Products policies ---
drop policy if exists "Products are viewable by everyone"            on public.products;
drop policy if exists "Products are insertable by authenticated users" on public.products;
drop policy if exists "Products are updatable by authenticated users"  on public.products;
drop policy if exists "Products are deletable by authenticated users"  on public.products;

create policy "Products are viewable by everyone"
  on public.products for select using (true);

create policy "Products are insertable by authenticated users"
  on public.products for insert to authenticated with check (true);

create policy "Products are updatable by authenticated users"
  on public.products for update to authenticated using (true) with check (true);

create policy "Products are deletable by authenticated users"
  on public.products for delete to authenticated using (true);

-- --- Enquiries policies ---
drop policy if exists "Enquiries insertable by anyone"            on public.enquiries;
drop policy if exists "Enquiries viewable by authenticated users" on public.enquiries;
drop policy if exists "Enquiries updatable by authenticated users" on public.enquiries;
drop policy if exists "Enquiries deletable by authenticated users" on public.enquiries;

create policy "Enquiries insertable by anyone"
  on public.enquiries for insert to anon, authenticated with check (true);

create policy "Enquiries viewable by authenticated users"
  on public.enquiries for select to authenticated using (true);

create policy "Enquiries updatable by authenticated users"
  on public.enquiries for update to authenticated using (true) with check (true);

create policy "Enquiries deletable by authenticated users"
  on public.enquiries for delete to authenticated using (true);

-- ------------------------------------------------------------
-- 6. Storage buckets + policies (images + brochures)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('product-brochures', 'product-brochures', true)
on conflict (id) do nothing;

drop policy if exists "Product images are publicly readable"       on storage.objects;
drop policy if exists "Authenticated users can upload product images" on storage.objects;
drop policy if exists "Authenticated users can update product images" on storage.objects;
drop policy if exists "Authenticated users can delete product images" on storage.objects;

create policy "Product images are publicly readable"
  on storage.objects for select using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert to authenticated with check (bucket_id = 'product-images');

create policy "Authenticated users can update product images"
  on storage.objects for update to authenticated using (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete to authenticated using (bucket_id = 'product-images');

drop policy if exists "Product brochures are publicly readable"       on storage.objects;
drop policy if exists "Authenticated users can upload product brochures" on storage.objects;
drop policy if exists "Authenticated users can update product brochures" on storage.objects;
drop policy if exists "Authenticated users can delete product brochures" on storage.objects;

create policy "Product brochures are publicly readable"
  on storage.objects for select using (bucket_id = 'product-brochures');

create policy "Authenticated users can upload product brochures"
  on storage.objects for insert to authenticated with check (bucket_id = 'product-brochures');

create policy "Authenticated users can update product brochures"
  on storage.objects for update to authenticated using (bucket_id = 'product-brochures');

create policy "Authenticated users can delete product brochures"
  on storage.objects for delete to authenticated using (bucket_id = 'product-brochures');

-- ------------------------------------------------------------
-- 7. SEED DATA — Blue Star product lineup
--    (one representative product per subcategory)
-- ------------------------------------------------------------
insert into public.products
  (category, subcategory, title, description, brand, price, capacity, features, image_url, sort_order)
values
  -- ---------- VRF SYSTEMS ----------
  ('vrf-systems', 'vrf-v-plus-100-inverter',
   'Blue Star VRF V Plus 100% Inverter',
   'Flagship VRF system with 100% inverter-driven compressors for superior energy efficiency and precise multi-zone comfort across commercial buildings.',
   'Blue Star', 'Project Based', '8 – 90 HP',
   array['100% Inverter Compressor','Wide Capacity Range','Long Refrigerant Piping','High IEER Rating'],
   'https://images.unsplash.com/photo-1621274218049-7e92a1a760db?w=800&q=80&auto=format', 1),

  ('vrf-systems', 'vrf-v-s-side-discharge',
   'Blue Star VRF V S — Side Discharge',
   'Compact side-discharge VRF ideal where vertical clearance is limited — perfect for low-rise buildings and service corridors.',
   'Blue Star', 'Project Based', '8 – 24 HP',
   array['Side Discharge Design','Compact Footprint','Inverter Technology','Easy Installation'],
   'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80&auto=format', 2),

  ('vrf-systems', 'vrf-lite-100-inverter',
   'Blue Star VRF Lite 100% Inverter',
   'Entry-level VRF engineered for small commercial applications that need multi-zone efficiency without heavy infrastructure.',
   'Blue Star', 'Project Based', '4 – 8 HP',
   array['100% Inverter','Lightweight Chassis','Quick Commissioning','Low Noise Operation'],
   'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format', 3),

  -- ---------- DUCTED SYSTEMS ----------
  ('ducted-systems', 'next-gen-inverter-packaged-ducted',
   'Next Generation Inverter Packaged & Ducted Split AC',
   'High-efficiency inverter-based ducted split ACs delivering whisper-quiet, uniform cooling for offices and institutional spaces.',
   'Blue Star', 'Custom Quote', '3 – 20 TR',
   array['Inverter Compressor','High EER','Low Sound Level','BMS Compatible'],
   'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format', 1),

  ('ducted-systems', 'inverter-ducted-hot-cold',
   'Inverter Ducted Hot & Cold AC',
   'Year-round comfort with a single system — inverter-driven heating and cooling for premium commercial interiors.',
   'Blue Star', 'Custom Quote', '3 – 11 TR',
   array['Hot & Cold Operation','Inverter Technology','Balanced Airflow','Energy Efficient'],
   'https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=800&q=80&auto=format', 2),

  ('ducted-systems', 'packaged-ducted-split',
   'Packaged Ducted Split AC',
   'Reliable packaged ducted systems engineered for large halls, auditoriums, and process spaces with consistent performance.',
   'Blue Star', 'Custom Quote', '5.5 – 22 TR',
   array['Packaged Unit','Ducted Air Distribution','Heavy-Duty Build','Low Maintenance'],
   'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format', 3),

  ('ducted-systems', 'water-cooled-mini-dx',
   'Water Cooled Mini-DX System',
   'Water-cooled mini DX units for server rooms and industrial environments that demand compact, efficient cooling.',
   'Blue Star', 'Custom Quote', '3 – 15 TR',
   array['Water Cooled','Small Footprint','High Load Handling','Precision Cooling'],
   'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80&auto=format', 4),

  ('ducted-systems', 'hiper-packaged-ducted',
   'Hiper Packaged & Ducted Split AC',
   'High-performance packaged ducted ACs engineered for extreme ambient conditions while maintaining full rated capacity.',
   'Blue Star', 'Custom Quote', '5.5 – 16.5 TR',
   array['High Ambient Performance','R-410A Refrigerant','Durable Chassis','Commercial Grade'],
   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format', 5),

  ('ducted-systems', 'concealed-split-ac',
   'Concealed Split AC',
   'Ceiling-concealed split ACs that blend seamlessly with premium interiors while delivering quiet, uniform cooling.',
   'Blue Star', 'Custom Quote', '1.5 – 5.5 TR',
   array['Concealed Indoor Unit','Quiet Operation','Uniform Airflow','Aesthetic Design'],
   'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=800&q=80&auto=format', 6),

  -- ---------- CHILLERS ----------
  ('chillers', 'process-chillers',
   'Blue Star Process Chillers',
   'Engineered process chillers for industrial applications requiring precise temperature control of machinery, moulds, and production lines.',
   'Blue Star', 'Custom Quote', '5 – 500 TR',
   array['Precision Control','Industrial Grade','Customizable Build','Low Downtime'],
   'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80&auto=format', 1),

  ('chillers', 'scroll-chillers',
   'Scroll Chillers',
   'Air-cooled and water-cooled scroll chillers delivering high efficiency and reliability for mid-capacity commercial cooling.',
   'Blue Star', 'Custom Quote', '10 – 220 TR',
   array['Scroll Compressor','Air / Water Cooled','High COP','Compact Design'],
   'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&auto=format', 2),

  ('chillers', 'screw-chillers',
   'Screw Chillers',
   'Industrial screw chillers built for continuous high-tonnage duty in manufacturing, hospitals, and large commercial plants.',
   'Blue Star', 'Custom Quote', '80 – 1200 TR',
   array['Screw Compressor','High Tonnage','Part-Load Efficiency','Heavy-Duty'],
   'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format', 3),

  ('chillers', 'centrifugal-chillers',
   'Centrifugal Chillers',
   'High-capacity centrifugal chillers engineered for large commercial and industrial projects requiring maximum efficiency at scale.',
   'Blue Star', 'Custom Quote', '300 – 3000 TR',
   array['Centrifugal Compressor','Very High Capacity','Industry-Leading IPLV','Low Noise'],
   'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&q=80&auto=format', 4),

  ('chillers', 'brine-chillers',
   'Brine Chillers',
   'Low-temperature brine chillers for food processing, pharmaceutical, and specialized industrial cooling below 0 °C.',
   'Blue Star', 'Custom Quote', '10 – 400 TR',
   array['Sub-Zero Operation','Glycol / Brine Compatible','Food-Grade Build','Process Precision'],
   'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format', 5),

  ('chillers', 'data-centre-chillers',
   'Data Centre Chillers',
   'Mission-critical chillers engineered with redundancy and high IPLV for data centres demanding 24×7 uptime.',
   'Blue Star', 'Project Based', '80 – 1200 TR',
   array['24×7 Duty','N+1 Redundancy','Free-Cooling Ready','High IPLV'],
   'https://images.unsplash.com/photo-1621274218049-7e92a1a760db?w=800&q=80&auto=format', 6),

  -- ---------- OTHERS ----------
  ('others', 'condensing-units',
   'Blue Star Condensing Units',
   'Outdoor condensing units designed for ducted splits, cold rooms, and custom refrigeration applications requiring reliable heat rejection.',
   'Blue Star', 'Custom Quote', '1.5 – 30 TR',
   array['R-410A / R-22 Options','Hermetic Compressor','Anti-Corrosion Coil','Field Serviceable'],
   'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=800&q=80&auto=format', 1);
