-- ============================================
-- UNITECH AIRCON - SUPABASE DATABASE SETUP
-- Run this entire script in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  category text not null check (category in ('residential', 'commercial', 'industrial', 'additional')),
  title text not null,
  description text,
  price text,
  brands text,
  capacity text,
  stars text,
  image_url text,
  features text[] default '{}',
  sort_order int default 0,
  is_active boolean default true
);

-- 2. ENQUIRIES TABLE
create table if not exists public.enquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  name text not null,
  phone text not null,
  email text,
  requirement text,
  message text,
  is_read boolean default false
);

-- 3. RLS POLICIES - PRODUCTS
alter table public.products enable row level security;

create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

create policy "Products are insertable by authenticated users"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Products are updatable by authenticated users"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Products are deletable by authenticated users"
  on public.products for delete
  to authenticated
  using (true);

-- 4. RLS POLICIES - ENQUIRIES
alter table public.enquiries enable row level security;

create policy "Enquiries insertable by anyone"
  on public.enquiries for insert
  to anon, authenticated
  with check (true);

create policy "Enquiries viewable by authenticated users"
  on public.enquiries for select
  to authenticated
  using (true);

create policy "Enquiries updatable by authenticated users"
  on public.enquiries for update
  to authenticated
  using (true)
  with check (true);

create policy "Enquiries deletable by authenticated users"
  on public.enquiries for delete
  to authenticated
  using (true);

-- 5. STORAGE BUCKET FOR PRODUCT IMAGES
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- 6. STORAGE POLICIES
create policy "Product images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 7. SEED SOME INITIAL PRODUCTS (from existing static data)
insert into public.products (category, title, description, price, brands, capacity, stars, image_url, sort_order) values
  ('residential', 'Inverter Split AC', 'Energy-efficient inverter technology with variable speed for homes, bedrooms, and small offices. Save up to 60% on electricity.', 'From ₹28,990', 'Daikin • Carrier • Mitsubishi • Voltas • Godrej • Midea', '1 – 2 Ton', '3–5 Star', 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&q=80&auto=format', 1),
  ('residential', 'Non-Inverter Split AC', 'Fixed-speed split ACs for consistent cooling at an affordable price point. Reliable performance for budget-conscious buyers.', 'From ₹22,000', 'Carrier • Godrej • Amstrad • Midea', '1 – 1.5 Ton', '3 Star', 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format', 2),
  ('residential', 'Window AC', 'Compact window-mounted ACs ideal for small rooms, server rooms, and cabins. Easy single-unit installation.', 'From ₹22,000', 'Carrier • Godrej • Cruise', '1 – 1.5 Ton', '3–5 Star', 'https://images.unsplash.com/photo-1631545806609-55deb6e27e2c?w=600&q=80&auto=format', 3),
  ('residential', 'Portable AC', 'Mobile air conditioning units that can be moved room to room. Perfect for temporary cooling, events, and construction sites.', 'From ₹28,000', 'Cruise', '1 – 1.5 Ton', '3 Star', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format', 4),
  ('commercial', 'Cassette AC', 'Ceiling-mounted cassette units with 360° airflow for offices, showrooms, restaurants, and malls.', 'From ₹75,000', 'Daikin • Carrier • Mitsubishi • Cruise', '2 – 3 Ton', NULL, 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=600&q=80&auto=format', 1),
  ('commercial', 'Ductable AC', 'Centralized cooling with concealed ductwork for villas, banquet halls, conference rooms, and large commercial spaces.', 'Custom Quote', 'Daikin • Carrier • Mitsubishi', '3 – 20 Ton', NULL, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format', 2),
  ('commercial', 'Floor Standing AC', 'Powerful floor-mounted units for halls, auditoriums, lobbies, and large waiting areas.', 'From ₹1,20,000', 'Daikin • Carrier • Mitsubishi', '3 – 5 Ton', NULL, 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80&auto=format', 3),
  ('commercial', 'VRV / VRF Systems', 'Variable Refrigerant Volume systems for multi-zone cooling in corporate buildings, hotels, and hospitals. 30–50% energy savings.', 'Project Based', 'Daikin Exclusive', '6 – 64 HP', NULL, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format', 4),
  ('industrial', 'Chiller Systems', 'Water-cooled and air-cooled chillers for industries, large buildings, and process cooling requirements.', 'Custom Quote', 'Daikin • Carrier • Blue Star', NULL, NULL, 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80&auto=format', 1),
  ('industrial', 'Cold Rooms & Storage', 'Walk-in freezers and temperature-controlled cold storage for food processing, pharma, and restaurants.', 'Custom Quote', 'Daikin • Carrier • Blue Star', NULL, NULL, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&auto=format', 2),
  ('industrial', 'Air Handling Units (AHU)', 'High CFM capacity AHU systems for hospitals, factories, and large commercial centralized HVAC.', 'Custom Quote', 'Daikin Exclusive', NULL, NULL, 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&auto=format', 3),
  ('industrial', 'Heat Pumps', 'Energy-efficient heating and cooling systems for water heating in hotels, gyms, hospitals, and homes.', 'Custom Quote', 'Daikin • Carrier', NULL, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format', 4),
  ('additional', 'Air Purifiers & Water Softeners', 'Advanced air purification and water softening for homes and offices.', 'From ₹15,000', 'Daikin • Carrier', NULL, NULL, NULL, 1),
  ('additional', 'Water Coolers & Dispensers', 'Premium water cooling and dispensing solutions.', 'From ₹8,000', 'Usha • Voltas', NULL, NULL, NULL, 2),
  ('additional', 'Alkaline RO Systems', 'Advanced alkaline water purification with RO technology.', 'From ₹15,000', 'Zero B • Mitsubishi', NULL, NULL, NULL, 3),
  ('additional', 'Deep Freezers', 'Commercial deep freezers and refrigeration solutions.', 'From ₹38,000', 'Elanpro', NULL, NULL, NULL, 4),
  ('additional', 'Solar Water Heaters', 'Eco-friendly solar water heating systems.', 'From ₹25,000', 'Inter Solar', NULL, NULL, NULL, 5),
  ('additional', 'Ventilation & HRV Systems', 'Advanced ventilation and heat recovery solutions.', 'From ₹15,000', 'Daikin • Astberg', NULL, NULL, NULL, 6);
