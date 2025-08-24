-- ADD additional products to each category (5 per category)
-- This script ADDS new products, does NOT replace existing ones

-- SMARTPHONES CATEGORY (5 additional products)
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'OnePlus 12',
  'Flagship Android phone with Snapdragon 8 Gen 3 and ultra-fast charging.',
  699.00, 799.00, 'ONEPLUS-12-256',
  20,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'OnePlus',
  'OnePlus 12',
  '{"storage": "256GB", "color": "Flowy Emerald", "display": "6.82-inch LTPO AMOLED", "processor": "Snapdragon 8 Gen 3", "camera": "50MP Main + 64MP Periscope + 48MP Ultra Wide"}',
  ARRAY['/products/oneplus-12.jpg'],
  false,
  'active'
),
(
  'Xiaomi 14',
  'Premium smartphone with Leica camera system and powerful performance.',
  649.00, 749.00, 'XIAOMI-14-512',
  18,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Xiaomi',
  'Xiaomi 14',
  '{"storage": "512GB", "color": "Black", "display": "6.36-inch LTPO OLED", "processor": "Snapdragon 8 Gen 3", "camera": "50MP Leica Main + 50MP Ultra Wide + 50MP Telephoto"}',
  ARRAY['/products/xiaomi-14.jpg'],
  false,
  'active'
),
(
  'Huawei P60 Pro',
  'Photography-focused flagship with advanced camera capabilities.',
  899.00, 999.00, 'HUAWEI-P60-256',
  15,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Huawei',
  'P60 Pro',
  '{"storage": "256GB", "color": "Pearl White", "display": "6.67-inch LTPO OLED", "processor": "Snapdragon 8+ Gen 1", "camera": "48MP Main + 13MP Ultra Wide + 48MP Telephoto"}',
  ARRAY['/products/huawei-p60.jpg'],
  false,
  'active'
),
(
  'OPPO Find X7',
  'Innovative design with fast charging and excellent display quality.',
  599.00, 699.00, 'OPPO-FINDX7-256',
  22,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'OPPO',
  'Find X7',
  '{"storage": "256GB", "color": "Ocean Blue", "display": "6.78-inch AMOLED", "processor": "Dimensity 9300", "camera": "50MP Main + 50MP Ultra Wide + 64MP Periscope"}',
  ARRAY['/products/oppo-find-x7.jpg'],
  false,
  'active'
),
(
  'Realme GT 5',
  'Gaming-focused smartphone with high refresh rate and powerful specs.',
  449.00, 549.00, 'REALME-GT5-128',
  35,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  'Realme',
  'GT 5',
  '{"storage": "128GB", "color": "Racing Yellow", "display": "6.74-inch AMOLED 144Hz", "processor": "Snapdragon 8 Gen 2", "camera": "50MP Main + 8MP Ultra Wide + 2MP Macro"}',
  ARRAY['/products/realme-gt5.jpg'],
  false,
  'active'
);

-- LAPTOPS CATEGORY (5 additional products)
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'ASUS ZenBook 14',
  'Ultra-portable laptop with OLED display and all-day battery life.',
  899.00, 999.00, 'ASUS-ZB14-512',
  14,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'ASUS',
  'ZenBook 14',
  '{"processor": "Intel Core i5-1340P", "memory": "16GB", "storage": "512GB SSD", "display": "14-inch 2.8K OLED", "graphics": "Intel Iris Xe"}',
  ARRAY['/products/asus-zenbook.jpg'],
  false,
  'active'
),
(
  'Lenovo ThinkPad X1 Carbon',
  'Business laptop with legendary durability and enterprise security.',
  1599.00, 1799.00, 'LENOVO-X1C-1TB',
  8,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'Lenovo',
  'ThinkPad X1 Carbon',
  '{"processor": "Intel Core i7-1365U", "memory": "32GB", "storage": "1TB SSD", "display": "14-inch 2.8K IPS", "security": "TPM 2.0, Fingerprint reader"}',
  ARRAY['/products/lenovo-thinkpad.jpg'],
  false,
  'active'
),
(
  'Acer Swift 3',
  'Affordable performance laptop perfect for students and professionals.',
  649.00, 749.00, 'ACER-SWIFT3-256',
  25,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'Acer',
  'Swift 3',
  '{"processor": "AMD Ryzen 7 5700U", "memory": "8GB", "storage": "256GB SSD", "display": "14-inch FHD IPS", "battery": "Up to 11.5 hours"}',
  ARRAY['/products/acer-swift.jpg'],
  false,
  'active'
),
(
  'MSI Gaming GF63',
  'Entry-level gaming laptop with dedicated graphics and RGB keyboard.',
  899.00, 1099.00, 'MSI-GF63-512',
  12,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'MSI',
  'Gaming GF63',
  '{"processor": "Intel Core i5-11400H", "memory": "16GB", "storage": "512GB SSD", "display": "15.6-inch FHD 144Hz", "graphics": "NVIDIA GTX 1650"}',
  ARRAY['/products/msi-gaming.jpg'],
  false,
  'active'
),
(
  'Microsoft Surface Laptop 5',
  'Premium Windows laptop with touchscreen and elegant design.',
  1299.00, 1499.00, 'SURFACE-L5-256',
  10,
  (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1),
  'Microsoft',
  'Surface Laptop 5',
  '{"processor": "Intel Core i5-1235U", "memory": "8GB", "storage": "256GB SSD", "display": "13.5-inch PixelSense touchscreen", "features": "Windows Hello, Omnisonic speakers"}',
  ARRAY['/products/surface-laptop.jpg'],
  false,
  'active'
);

-- ACCESSORIES CATEGORY (5 additional products)
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'Samsung Galaxy Buds2 Pro',
  'Premium wireless earbuds with intelligent ANC and 360 Audio.',
  199.00, 229.00, 'SAMSUNG-BUDS2PRO',
  45,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Samsung',
  'Galaxy Buds2 Pro',
  '{"features": "Intelligent ANC, 360 Audio", "battery": "Up to 8 hours + 20 hours case", "connectivity": "Bluetooth 5.3", "water_resistance": "IPX7"}',
  ARRAY['/products/samsung-buds.jpg'],
  false,
  'active'
),
(
  'Fitbit Versa 4',
  'Health and fitness smartwatch with built-in GPS and 6+ day battery.',
  199.00, 249.00, 'FITBIT-VERSA4',
  30,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Fitbit',
  'Versa 4',
  '{"health": "Heart rate, SpO2, Sleep tracking", "fitness": "Built-in GPS, 40+ exercise modes", "battery": "6+ days", "compatibility": "Android, iOS"}',
  ARRAY['/products/fitbit-watch.jpg'],
  false,
  'active'
),
(
  'Bose QuietComfort 45',
  'World-class noise cancelling headphones with premium comfort.',
  329.00, 379.00, 'BOSE-QC45-BLACK',
  20,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Bose',
  'QuietComfort 45',
  '{"features": "World-class noise cancelling", "battery": "Up to 24 hours", "comfort": "Plush earcup cushions", "controls": "Touch and button controls"}',
  ARRAY['/products/bose-headphones.jpg'],
  false,
  'active'
),
(
  'Anker PowerCore 10000',
  'Ultra-compact portable charger with PowerIQ technology.',
  29.99, 39.99, 'ANKER-PC10K',
  60,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Anker',
  'PowerCore 10000',
  '{"capacity": "10000mAh", "technology": "PowerIQ 2.0", "size": "Credit card sized", "compatibility": "iPhone, Samsung, iPad"}',
  ARRAY['/products/anker-charger.jpg'],
  false,
  'active'
),
(
  'Logitech MX Master 3S',
  'Advanced wireless mouse for productivity with ultra-fast scrolling.',
  99.99, 119.99, 'LOGITECH-MX3S',
  40,
  (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1),
  'Logitech',
  'MX Master 3S',
  '{"connectivity": "Bluetooth, USB-C", "battery": "Up to 70 days", "features": "MagSpeed scrolling, 8000 DPI", "compatibility": "Windows, Mac, Linux"}',
  ARRAY['/products/logitech-mouse.jpg'],
  false,
  'active'
);

-- GAMING CATEGORY (5 additional products)
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'Nintendo Switch OLED',
  'Handheld gaming console with vibrant OLED screen and versatile play modes.',
  349.00, 379.00, 'NINTENDO-SWITCH-OLED',
  25,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Nintendo',
  'Switch OLED',
  '{"display": "7-inch OLED touchscreen", "storage": "64GB internal", "modes": "TV, Tabletop, Handheld", "battery": "4.5-9 hours"}',
  ARRAY['/products/nintendo-switch.jpg'],
  false,
  'active'
),
(
  'SteelSeries Arctis 7P',
  'Wireless gaming headset with lossless audio and long battery life.',
  149.00, 179.00, 'STEELSERIES-A7P',
  30,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'SteelSeries',
  'Arctis 7P',
  '{"audio": "Lossless 2.4GHz wireless", "battery": "Up to 24 hours", "compatibility": "PS5, PS4, PC, Switch", "microphone": "ClearCast bidirectional"}',
  ARRAY['/products/gaming-headset.jpg'],
  false,
  'active'
),
(
  'Razer DeathAdder V3',
  'Ergonomic gaming mouse with Focus Pro sensor and ultra-lightweight design.',
  89.99, 109.99, 'RAZER-DAV3',
  45,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Razer',
  'DeathAdder V3',
  '{"sensor": "Focus Pro 30K", "weight": "59g lightweight", "switches": "90M click Razer switches", "connectivity": "Wired USB-C"}',
  ARRAY['/products/gaming-mouse.jpg'],
  false,
  'active'
),
(
  'Secretlab TITAN Evo 2022',
  'Premium gaming chair with 4-way lumbar support and cold-cure foam.',
  519.00, 599.00, 'SECRETLAB-TITAN22',
  8,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Secretlab',
  'TITAN Evo 2022',
  '{"material": "NEO Hybrid Leatherette", "support": "4-way lumbar support", "foam": "Cold-cure foam", "weight_capacity": "130kg"}',
  ARRAY['/products/gaming-chair.jpg'],
  false,
  'active'
),
(
  'Steam Deck 512GB',
  'Portable PC gaming handheld with access to entire Steam library.',
  649.00, 699.00, 'STEAM-DECK-512',
  12,
  (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1),
  'Valve',
  'Steam Deck',
  '{"storage": "512GB NVMe SSD", "display": "7-inch touchscreen", "performance": "Custom APU", "compatibility": "Steam library, Windows games"}',
  ARRAY['/products/steam-deck.jpg'],
  false,
  'active'
);

-- HOME ELECTRONICS CATEGORY (5 additional products)
INSERT INTO public.products (
  name, description, price, compare_at_price, sku, stock_quantity, 
  category_id, brand, model, specifications, images, featured, status
) VALUES 
(
  'Google Nest Thermostat',
  'Smart thermostat that learns your schedule and saves energy automatically.',
  129.00, 149.00, 'GOOGLE-NEST-THERMO',
  35,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Google',
  'Nest Thermostat',
  '{"features": "Auto-schedule, Energy saving", "connectivity": "Wi-Fi, Bluetooth", "compatibility": "Google Assistant, Alexa", "installation": "Easy DIY setup"}',
  ARRAY['/products/nest-thermostat.jpg'],
  false,
  'active'
),
(
  'Roomba i7+ Robot Vacuum',
  'Self-emptying robot vacuum with smart mapping and powerful suction.',
  599.00, 699.00, 'ROOMBA-I7PLUS',
  15,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'iRobot',
  'Roomba i7+',
  '{"features": "Self-emptying, Smart mapping", "suction": "10x power-lifting suction", "runtime": "75 minutes", "connectivity": "Wi-Fi, app control"}',
  ARRAY['/products/robot-vacuum.jpg'],
  false,
  'active'
),
(
  'Dyson Pure Cool TP07',
  'Air purifier and fan with HEPA filtration and real-time air quality monitoring.',
  549.00, 629.00, 'DYSON-TP07',
  12,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Dyson',
  'Pure Cool TP07',
  '{"filtration": "HEPA H13 filter", "coverage": "Up to 800 sq ft", "features": "Real-time air quality display", "connectivity": "Wi-Fi, Dyson Link app"}',
  ARRAY['/products/air-purifier.jpg'],
  false,
  'active'
),
(
  'Breville Bambino Plus',
  'Compact espresso machine with automatic milk texturing and fast heat-up.',
  299.00, 349.00, 'BREVILLE-BAMBINO',
  18,
  (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1),
  'Breville',
  'Bambino Plus',
  '{"features": "Automatic milk texturing", "heat_up": "3 second heat up", "pressure": "15 bar Italian pump", "capacity": "67 fl oz water tank"}',
  ARRAY['/products/coffee-maker.jpg'],
  false,
  'active'
);

-- Update timestamps for all new products
UPDATE public.products SET updated_at = timezone('utc'::text, now()) 
WHERE created_at >= (NOW() - INTERVAL '1 minute');
