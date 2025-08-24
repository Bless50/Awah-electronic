-- Seed some sample products
with category_ids as (
  select name, id from public.categories
)
insert into public.products (name, description, price, compare_at_price, sku, stock_quantity, category_id, brand, model, specifications, images, featured, status) 
select * from (
  values
    (
      'iPhone 15 Pro Max',
      'Latest iPhone with titanium design and advanced camera system',
      1299.99,
      1399.99,
      'IPH15PM-256-TIT',
      25,
      (select id from category_ids where name = 'Smartphones'),
      'Apple',
      'iPhone 15 Pro Max',
      '{"storage": "256GB", "color": "Natural Titanium", "display": "6.7-inch Super Retina XDR", "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      true,
      'active'
    ),
    (
      'Samsung Galaxy S24 Ultra',
      'Premium Android smartphone with S Pen and advanced AI features',
      1199.99,
      1299.99,
      'SAM-S24U-512-BLK',
      30,
      (select id from category_ids where name = 'Smartphones'),
      'Samsung',
      'Galaxy S24 Ultra',
      '{"storage": "512GB", "color": "Titanium Black", "display": "6.8-inch Dynamic AMOLED 2X", "camera": "200MP Main + 50MP Periscope Telephoto + 10MP Telephoto + 12MP Ultra Wide"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      true,
      'active'
    ),
    (
      'MacBook Pro 16-inch M3',
      'Powerful laptop for professionals with M3 chip',
      2499.99,
      2699.99,
      'MBP16-M3-512-SG',
      15,
      (select id from category_ids where name = 'Laptops'),
      'Apple',
      'MacBook Pro 16-inch',
      '{"processor": "Apple M3", "memory": "18GB", "storage": "512GB SSD", "display": "16.2-inch Liquid Retina XDR"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      true,
      'active'
    ),
    (
      'Sony WH-1000XM5',
      'Industry-leading noise canceling wireless headphones',
      399.99,
      449.99,
      'SONY-WH1000XM5-BLK',
      50,
      (select id from category_ids where name = 'Audio'),
      'Sony',
      'WH-1000XM5',
      '{"type": "Over-ear", "connectivity": "Bluetooth 5.2", "battery": "30 hours", "noise_canceling": "Yes"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      true,
      'active'
    ),
    (
      'iPad Pro 12.9-inch M2',
      'Most advanced iPad with M2 chip and Liquid Retina XDR display',
      1099.99,
      1199.99,
      'IPAD-PRO129-M2-256',
      20,
      (select id from category_ids where name = 'Tablets'),
      'Apple',
      'iPad Pro 12.9-inch',
      '{"processor": "Apple M2", "storage": "256GB", "display": "12.9-inch Liquid Retina XDR", "connectivity": "Wi-Fi 6E"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      false,
      'active'
    ),
    (
      'PlayStation 5',
      'Next-generation gaming console with ultra-high speed SSD',
      499.99,
      549.99,
      'PS5-STD-825GB',
      10,
      (select id from category_ids where name = 'Gaming'),
      'Sony',
      'PlayStation 5',
      '{"storage": "825GB SSD", "resolution": "4K", "ray_tracing": "Yes", "backwards_compatibility": "PS4 games"}'::jsonb,
      array['/placeholder.svg?height=400&width=400'],
      true,
      'active'
    )
) as products_data;
