-- Seed categories with electronics categories
insert into public.categories (name, description, image_url) values
  ('Smartphones', 'Latest smartphones and mobile devices', '/placeholder.svg?height=200&width=200'),
  ('Laptops', 'Laptops and notebooks for work and gaming', '/placeholder.svg?height=200&width=200'),
  ('Tablets', 'Tablets and iPad devices', '/placeholder.svg?height=200&width=200'),
  ('Audio', 'Headphones, speakers, and audio equipment', '/placeholder.svg?height=200&width=200'),
  ('Gaming', 'Gaming consoles, accessories, and peripherals', '/placeholder.svg?height=200&width=200'),
  ('Accessories', 'Phone cases, chargers, and other accessories', '/placeholder.svg?height=200&width=200'),
  ('Smart Home', 'Smart home devices and IoT products', '/placeholder.svg?height=200&width=200'),
  ('Cameras', 'Digital cameras and photography equipment', '/placeholder.svg?height=200&width=200')
on conflict (name) do nothing;
