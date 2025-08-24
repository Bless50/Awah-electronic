-- Insert real products with downloaded images
-- Run this after creating categories and products tables

-- First, let's get the category IDs (assuming categories were created)
-- We'll use the category names to match

-- Insert Smartphones
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'iPhone 15 Pro',
  'The most advanced iPhone with titanium design, A17 Pro chip, and pro camera system.',
  999.00, 1099.00, 'IPHONE-15-PRO-128',
  25,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Apple',
  'iPhone 15 Pro',
  '{"storage": "128GB", "color": "Natural Titanium", "display": "6.1-inch Super Retina XDR", "chip": "A17 Pro", "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"}',
  ARRAY['/products/iphone-15-pro.jpg'],
  true,
  'active'
),
(
  'Samsung Galaxy S24',
  'Premium Android smartphone with AI-powered features and exceptional camera quality.',
  799.00, 899.00, 'SAMSUNG-S24-256',
  30,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Samsung',
  'Galaxy S24',
  '{"storage": "256GB", "color": "Phantom Black", "display": "6.2-inch Dynamic AMOLED 2X", "processor": "Snapdragon 8 Gen 3", "camera": "50MP Main + 12MP Ultra Wide + 10MP Telephoto"}',
  ARRAY['/products/samsung-galaxy-s24.jpg'],
  true,
  'active'
),
(
  'Google Pixel 8',
  'Pure Android experience with advanced computational photography and AI features.',
  699.00, 799.00, 'PIXEL-8-128',
  20,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Google',
  'Pixel 8',
  '{"storage": "128GB", "color": "Obsidian", "display": "6.2-inch Actua display", "chip": "Google Tensor G3", "camera": "50MP Main + 12MP Ultra Wide"}',
  ARRAY['/products/google-pixel-8.jpg'],
  false,
  'active'
);

-- Insert Laptops
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'MacBook Pro 14-inch',
  'Supercharged by M3 Pro chip for demanding workflows and creative projects.',
  1999.00, 2199.00, 'MBP-14-M3-512',
  15,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'Apple',
  'MacBook Pro 14"',
  '{"processor": "Apple M3 Pro", "memory": "18GB", "storage": "512GB SSD", "display": "14.2-inch Liquid Retina XDR", "ports": "3x Thunderbolt 4, HDMI, SD card"}',
  ARRAY['/products/macbook-pro.jpg'],
  true,
  'active'
),
(
  'Dell XPS 13',
  'Ultra-portable laptop with stunning InfinityEdge display and premium build quality.',
  1299.00, 1499.00, 'DELL-XPS13-512',
  12,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'Dell',
  'XPS 13',
  '{"processor": "Intel Core i7-1360P", "memory": "16GB", "storage": "512GB SSD", "display": "13.4-inch FHD+ InfinityEdge", "graphics": "Intel Iris Xe"}',
  ARRAY['/products/dell-xps.jpg'],
  false,
  'active'
),
(
  'HP Pavilion 15',
  'Versatile laptop perfect for work, study, and entertainment with reliable performance.',
  799.00, 899.00, 'HP-PAV15-256',
  18,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'HP',
  'Pavilion 15',
  '{"processor": "AMD Ryzen 5 7530U", "memory": "8GB", "storage": "256GB SSD", "display": "15.6-inch FHD", "graphics": "AMD Radeon Graphics"}',
  ARRAY['/products/hp-pavilion.jpg'],
  false,
  'active'
);

-- Insert Accessories
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'AirPods Pro (2nd Gen)',
  'Active Noise Cancellation, Adaptive Transparency, and personalized Spatial Audio.',
  249.00, 279.00, 'AIRPODS-PRO-2',
  40,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Apple',
  'AirPods Pro',
  '{"features": "Active Noise Cancellation", "battery": "Up to 6 hours listening time", "charging": "MagSafe Charging Case", "connectivity": "Bluetooth 5.3"}',
  ARRAY['/products/airpods-pro.jpg'],
  true,
  'active'
),
(
  'Apple Watch Series 9',
  'Advanced health monitoring, fitness tracking, and seamless iPhone integration.',
  399.00, 429.00, 'WATCH-S9-45MM',
  25,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Apple',
  'Watch Series 9',
  '{"size": "45mm", "display": "Always-On Retina", "health": "Blood Oxygen, ECG, Sleep Tracking", "battery": "Up to 18 hours", "connectivity": "GPS + Cellular"}',
  ARRAY['/products/apple-watch.jpg'],
  true,
  'active'
),
(
  'Sony WH-1000XM5',
  'Industry-leading noise canceling wireless headphones with exceptional sound quality.',
  399.00, 449.00, 'SONY-WH1000XM5',
  22,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Sony',
  'WH-1000XM5',
  '{"features": "Industry-leading noise canceling", "battery": "Up to 30 hours", "charging": "Quick charge 3 min = 3 hours", "connectivity": "Bluetooth 5.2, NFC"}',
  ARRAY['/products/wireless-headphones.jpg'],
  false,
  'active'
);

-- Insert Gaming Products
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'PlayStation 5',
  'Next-gen gaming console with lightning-fast loading and immersive 3D audio.',
  499.00, 549.00, 'PS5-CONSOLE',
  8,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Sony',
  'PlayStation 5',
  '{"storage": "825GB SSD", "performance": "4K gaming up to 120fps", "audio": "Tempest 3D AudioTech", "controller": "DualSense wireless controller"}',
  ARRAY['/products/playstation-5.jpg'],
  true,
  'active'
),
(
  'Xbox Series X',
  'Most powerful Xbox ever with 4K gaming, Quick Resume, and Smart Delivery.',
  499.00, 549.00, 'XBOX-SERIES-X',
  10,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Microsoft',
  'Xbox Series X',
  '{"storage": "1TB SSD", "performance": "4K gaming up to 120fps", "features": "Quick Resume, Smart Delivery", "compatibility": "Thousands of games across generations"}',
  ARRAY['/products/xbox-series-x.jpg'],
  true,
  'active'
),
(
  'Razer BlackWidow V4',
  'Mechanical gaming keyboard with Razer Green switches and RGB lighting.',
  169.00, 199.00, 'RAZER-BWV4-GREEN',
  35,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Razer',
  'BlackWidow V4',
  '{"switches": "Razer Green Mechanical", "lighting": "Razer Chroma RGB", "features": "Programmable macro keys", "connectivity": "USB-C detachable cable"}',
  ARRAY['/products/gaming-keyboard.jpg'],
  false,
  'active'
);

-- Insert Home Electronics
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'Samsung 65" QLED 4K Smart TV',
  'Quantum Dot technology delivers brilliant colors and exceptional picture quality.',
  1299.00, 1499.00, 'SAMSUNG-65Q70C',
  6,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Samsung',
  '65" QLED Q70C',
  '{"size": "65 inches", "resolution": "4K UHD", "technology": "Quantum Dot", "smart_tv": "Tizen OS", "features": "HDR10+, Gaming Hub"}',
  ARRAY['/products/smart-tv.jpg'],
  true,
  'active'
),
(
  'Amazon Echo (4th Gen)',
  'Smart speaker with premium sound, built-in hub, and Alexa voice assistant.',
  99.00, 119.00, 'ECHO-4TH-CHARCOAL',
  50,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Amazon',
  'Echo 4th Gen',
  '{"assistant": "Alexa", "connectivity": "Wi-Fi, Bluetooth", "features": "Built-in Zigbee hub", "audio": "Premium speakers with clear highs and deep bass"}',
  ARRAY['/products/smart-speaker.jpg'],
  false,
  'active'
),
(
  'Ring Video Doorbell Pro 2',
  'Advanced home security with 1536p HD video, 3D motion detection, and two-way talk.',
  249.00, 279.00, 'RING-DOORBELL-PRO2',
  28,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Ring',
  'Video Doorbell Pro 2',
  '{"resolution": "1536p HD", "features": "3D Motion Detection, Two-way Talk", "power": "Hardwired", "storage": "Cloud recording with Ring Protect plan"}',
  ARRAY['/products/security-camera.jpg'],
  false,
  'active'
);

-- Update timestamps
UPDATE public.products SET updated_at = timezone('utc'::text, now()) WHERE updated_at IS NULL;
