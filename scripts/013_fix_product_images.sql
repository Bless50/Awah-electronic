-- Fix product images by matching product names to downloaded image files
-- This will update existing products with correct image paths

-- Update products with specific image matches
UPDATE public.products SET images = ARRAY['/products/iphone-15-pro.jpg'] 
WHERE (name ILIKE '%iphone%15%' OR name ILIKE '%iphone%pro%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/samsung-galaxy-s24.jpg'] 
WHERE (name ILIKE '%samsung%galaxy%' OR name ILIKE '%galaxy%s24%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/google-pixel-8.jpg'] 
WHERE (name ILIKE '%pixel%8%' OR name ILIKE '%google%pixel%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/oneplus-12.jpg'] 
WHERE name ILIKE '%oneplus%12%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/xiaomi-14.jpg'] 
WHERE name ILIKE '%xiaomi%14%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/huawei-p60.jpg'] 
WHERE name ILIKE '%huawei%p60%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/oppo-find-x7.jpg'] 
WHERE name ILIKE '%oppo%find%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/realme-gt5.jpg'] 
WHERE name ILIKE '%realme%gt%' AND images IS NULL;

-- Laptops
UPDATE public.products SET images = ARRAY['/products/macbook-pro.jpg'] 
WHERE (name ILIKE '%macbook%pro%' OR name ILIKE '%macbook%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/dell-xps.jpg'] 
WHERE name ILIKE '%dell%xps%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/hp-pavilion.jpg'] 
WHERE name ILIKE '%hp%pavilion%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/asus-zenbook.jpg'] 
WHERE name ILIKE '%asus%zenbook%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/lenovo-thinkpad.jpg'] 
WHERE name ILIKE '%lenovo%thinkpad%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/acer-swift.jpg'] 
WHERE name ILIKE '%acer%swift%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/msi-gaming.jpg'] 
WHERE name ILIKE '%msi%gaming%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/surface-laptop.jpg'] 
WHERE name ILIKE '%surface%laptop%' AND images IS NULL;

-- Accessories
UPDATE public.products SET images = ARRAY['/products/airpods-pro.jpg'] 
WHERE name ILIKE '%airpods%pro%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/apple-watch.jpg'] 
WHERE name ILIKE '%apple%watch%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/samsung-buds.jpg'] 
WHERE name ILIKE '%samsung%buds%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/fitbit-watch.jpg'] 
WHERE name ILIKE '%fitbit%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/bose-headphones.jpg'] 
WHERE name ILIKE '%bose%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/anker-charger.jpg'] 
WHERE name ILIKE '%anker%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/logitech-mouse.jpg'] 
WHERE name ILIKE '%logitech%mouse%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/wireless-headphones.jpg'] 
WHERE (name ILIKE '%headphones%' OR name ILIKE '%sony%headphones%') AND images IS NULL;

-- Gaming
UPDATE public.products SET images = ARRAY['/products/playstation-5.jpg'] 
WHERE (name ILIKE '%playstation%5%' OR name ILIKE '%ps5%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/xbox-series-x.jpg'] 
WHERE name ILIKE '%xbox%series%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/nintendo-switch.jpg'] 
WHERE name ILIKE '%nintendo%switch%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/gaming-headset.jpg'] 
WHERE name ILIKE '%gaming%headset%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/gaming-mouse.jpg'] 
WHERE name ILIKE '%gaming%mouse%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/gaming-keyboard.jpg'] 
WHERE name ILIKE '%gaming%keyboard%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/gaming-chair.jpg'] 
WHERE name ILIKE '%gaming%chair%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/steam-deck.jpg'] 
WHERE name ILIKE '%steam%deck%' AND images IS NULL;

-- Home Electronics
UPDATE public.products SET images = ARRAY['/products/smart-tv.jpg'] 
WHERE (name ILIKE '%smart%tv%' OR name ILIKE '%qled%' OR name ILIKE '%samsung%tv%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/smart-speaker.jpg'] 
WHERE (name ILIKE '%echo%' OR name ILIKE '%smart%speaker%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/security-camera.jpg'] 
WHERE (name ILIKE '%ring%' OR name ILIKE '%doorbell%' OR name ILIKE '%security%camera%') AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/nest-thermostat.jpg'] 
WHERE name ILIKE '%nest%thermostat%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/robot-vacuum.jpg'] 
WHERE name ILIKE '%roomba%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/air-purifier.jpg'] 
WHERE name ILIKE '%air%purifier%' AND images IS NULL;

UPDATE public.products SET images = ARRAY['/products/coffee-maker.jpg'] 
WHERE (name ILIKE '%coffee%' OR name ILIKE '%espresso%' OR name ILIKE '%breville%') AND images IS NULL;

-- Fix any remaining products with old .png extensions
UPDATE public.products 
SET images = ARRAY['/products/iphone-15-pro.jpg'] 
WHERE images @> ARRAY['/iphone-15-pro.png'];

UPDATE public.products 
SET images = ARRAY['/products/macbook-pro.jpg'] 
WHERE images @> ARRAY['/macbook-air-m2.png'];

UPDATE public.products 
SET images = ARRAY['/products/airpods-pro.jpg'] 
WHERE images @> ARRAY['/airpods-pro.png'];

-- Update timestamps
UPDATE public.products SET updated_at = NOW() WHERE images IS NOT NULL;

-- Show products that still don't have images
SELECT name, category_id, images 
FROM public.products 
WHERE images IS NULL OR images = '{}' 
ORDER BY name;
