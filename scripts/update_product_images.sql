-- Simple script to update existing products with downloaded image paths
-- Run this in Supabase SQL Editor

-- Update existing products with new image paths
UPDATE public.products 
SET images = ARRAY['/products/iphone-15-pro.jpg']
WHERE name ILIKE '%iphone%' OR name ILIKE '%apple%phone%';

UPDATE public.products 
SET images = ARRAY['/products/samsung-galaxy-s24.jpg']
WHERE name ILIKE '%samsung%' OR name ILIKE '%galaxy%';

UPDATE public.products 
SET images = ARRAY['/products/google-pixel-8.jpg']
WHERE name ILIKE '%pixel%' OR name ILIKE '%google%';

UPDATE public.products 
SET images = ARRAY['/products/macbook-pro.jpg']
WHERE name ILIKE '%macbook%' OR name ILIKE '%mac%';

UPDATE public.products 
SET images = ARRAY['/products/dell-xps.jpg']
WHERE name ILIKE '%dell%' OR name ILIKE '%xps%';

UPDATE public.products 
SET images = ARRAY['/products/hp-pavilion.jpg']
WHERE name ILIKE '%hp%' OR name ILIKE '%pavilion%';

UPDATE public.products 
SET images = ARRAY['/products/airpods-pro.jpg']
WHERE name ILIKE '%airpods%' OR name ILIKE '%earbuds%';

UPDATE public.products 
SET images = ARRAY['/products/apple-watch.jpg']
WHERE name ILIKE '%watch%' OR name ILIKE '%smartwatch%';

UPDATE public.products 
SET images = ARRAY['/products/wireless-headphones.jpg']
WHERE name ILIKE '%headphones%' OR name ILIKE '%sony%';

UPDATE public.products 
SET images = ARRAY['/products/playstation-5.jpg']
WHERE name ILIKE '%playstation%' OR name ILIKE '%ps5%';

UPDATE public.products 
SET images = ARRAY['/products/xbox-series-x.jpg']
WHERE name ILIKE '%xbox%';

UPDATE public.products 
SET images = ARRAY['/products/gaming-keyboard.jpg']
WHERE name ILIKE '%keyboard%' OR name ILIKE '%gaming%';

UPDATE public.products 
SET images = ARRAY['/products/smart-tv.jpg']
WHERE name ILIKE '%tv%' OR name ILIKE '%television%';

UPDATE public.products 
SET images = ARRAY['/products/smart-speaker.jpg']
WHERE name ILIKE '%speaker%' OR name ILIKE '%echo%';

UPDATE public.products 
SET images = ARRAY['/products/security-camera.jpg']
WHERE name ILIKE '%camera%' OR name ILIKE '%security%' OR name ILIKE '%doorbell%';

-- Update timestamps
UPDATE public.products SET updated_at = NOW();
