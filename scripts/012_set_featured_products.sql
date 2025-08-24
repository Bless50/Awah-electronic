-- Set featured products (one per category) for homepage display
-- This will make products appear in the Featured Products section

-- First, reset all products to not featured
UPDATE public.products SET featured = false;

-- Set one featured product per category using our downloaded images

-- SMARTPHONES - iPhone 15 Pro
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE (name ILIKE '%iphone%15%pro%' OR (name ILIKE '%iphone%' AND images @> ARRAY['/products/iphone-15-pro.jpg']))
    AND status = 'active'
  LIMIT 1
);

-- If iPhone doesn't exist, use any smartphone with our image
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE category_id = (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1)
    AND featured = false
    AND images IS NOT NULL
    AND status = 'active'
  LIMIT 1
) AND featured = false;

-- LAPTOPS - MacBook Pro
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE (name ILIKE '%macbook%pro%' OR (name ILIKE '%macbook%' AND images @> ARRAY['/products/macbook-pro.jpg']))
    AND status = 'active'
  LIMIT 1
);

-- If MacBook doesn't exist, use any laptop with our image
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE category_id = (SELECT id FROM public.categories WHERE name = 'Laptops' LIMIT 1)
    AND featured = false
    AND images IS NOT NULL
    AND status = 'active'
  LIMIT 1
) AND featured = false;

-- ACCESSORIES - AirPods Pro
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE (name ILIKE '%airpods%pro%' OR (name ILIKE '%airpods%' AND images @> ARRAY['/products/airpods-pro.jpg']))
    AND status = 'active'
  LIMIT 1
);

-- If AirPods doesn't exist, use any accessory with our image
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE category_id = (SELECT id FROM public.categories WHERE name = 'Accessories' LIMIT 1)
    AND featured = false
    AND images IS NOT NULL
    AND status = 'active'
  LIMIT 1
) AND featured = false;

-- GAMING - PlayStation 5
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE (name ILIKE '%playstation%5%' OR (name ILIKE '%ps5%' AND images @> ARRAY['/products/playstation-5.jpg']))
    AND status = 'active'
  LIMIT 1
);

-- If PlayStation doesn't exist, use any gaming product with our image
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE category_id = (SELECT id FROM public.categories WHERE name = 'Gaming' LIMIT 1)
    AND featured = false
    AND images IS NOT NULL
    AND status = 'active'
  LIMIT 1
) AND featured = false;

-- HOME ELECTRONICS - Smart TV
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE (name ILIKE '%smart%tv%' OR (name ILIKE '%tv%' AND images @> ARRAY['/products/smart-tv.jpg']))
    AND status = 'active'
  LIMIT 1
);

-- If Smart TV doesn't exist, use any home electronics with our image
UPDATE public.products 
SET featured = true 
WHERE id = (
  SELECT id FROM public.products 
  WHERE category_id = (SELECT id FROM public.categories WHERE name = 'Home Electronics' LIMIT 1)
    AND featured = false
    AND images IS NOT NULL
    AND status = 'active'
  LIMIT 1
) AND featured = false;

-- Update timestamps
UPDATE public.products SET updated_at = NOW() WHERE featured = true;

-- Verify featured products
SELECT p.name, p.price, p.images, c.name as category_name, p.featured
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.featured = true
ORDER BY c.name;
