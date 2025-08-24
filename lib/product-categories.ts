// Product category mapping for organizing products by category
export const productsByCategory = {
  smartphones: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 599000,
      compare_at_price: 659000,
      description: 'Latest iPhone with advanced features',
      images: ['/products/smartphones/iphone-15-pro-max.png'],
      category_id: 'smartphones',
      brand: 'Apple',
      status: 'active'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      price: 549000,
      compare_at_price: 599000,
      description: 'Premium Android smartphone',
      images: ['/products/smartphones/samsung-galaxy-s24-ultra.png'],
      category_id: 'smartphones',
      brand: 'Samsung',
      status: 'active'
    },
    {
      id: '3',
      name: 'Google Pixel 8',
      price: 449000,
      compare_at_price: 499000,
      description: 'Pure Android experience with AI features',
      images: ['/products/smartphones/google-pixel-8.png'],
      category_id: 'smartphones',
      brand: 'Google',
      status: 'active'
    },
    {
      id: '4',
      name: 'OnePlus 12',
      price: 399000,
      compare_at_price: 449000,
      description: 'Flagship performance at great value',
      images: ['/products/smartphones/oneplus-12.jpg'],
      category_id: 'smartphones',
      brand: 'OnePlus',
      status: 'active'
    }
  ],
  
  laptops: [
    {
      id: '5',
      name: 'MacBook Pro',
      price: 1199000,
      compare_at_price: 1319000,
      description: 'Powerful laptop for professionals',
      images: ['/products/laptops/macbook-pro-14-inch.png'],
      category_id: 'laptops',
      brand: 'Apple',
      status: 'active'
    },
    {
      id: '6',
      name: 'Dell XPS 13',
      price: 779000,
      compare_at_price: 839000,
      description: 'Ultra-portable laptop with premium build',
      images: ['/products/laptops/dell-xps.jpg'],
      category_id: 'laptops',
      brand: 'Dell',
      status: 'active'
    },
    {
      id: '7',
      name: 'ASUS ZenBook 14',
      price: 649000,
      compare_at_price: 699000,
      description: 'Ultra-portable laptop with OLED display',
      images: ['/products/laptops/asus-zenbook.jpg'],
      category_id: 'laptops',
      brand: 'ASUS',
      status: 'active'
    },
    {
      id: '8',
      name: 'HP Pavilion',
      price: 549000,
      compare_at_price: 599000,
      description: 'Reliable laptop for everyday use',
      images: ['/products/laptops/hp-pavilion.jpg'],
      category_id: 'laptops',
      brand: 'HP',
      status: 'active'
    }
  ],

  accessories: [
    {
      id: '9',
      name: 'AirPods Pro',
      price: 149000,
      compare_at_price: 167000,
      description: 'Premium wireless earbuds',
      images: ['/products/accessories/airpods-pro.jpg'],
      category_id: 'accessories',
      brand: 'Apple',
      status: 'active'
    },
    {
      id: '10',
      name: 'Apple Watch',
      price: 199000,
      compare_at_price: 229000,
      description: 'Advanced smartwatch with health features',
      images: ['/products/accessories/apple-watch.jpg'],
      category_id: 'accessories',
      brand: 'Apple',
      status: 'active'
    },
    {
      id: '11',
      name: 'Samsung Buds Pro',
      price: 99000,
      compare_at_price: 119000,
      description: 'Premium wireless earbuds with ANC',
      images: ['/products/accessories/samsung-buds.jpg'],
      category_id: 'accessories',
      brand: 'Samsung',
      status: 'active'
    },
    {
      id: '12',
      name: 'Anker PowerCore',
      price: 29000,
      compare_at_price: 35000,
      description: 'Ultra-compact portable charger',
      images: ['/products/accessories/anker-charger.jpg'],
      category_id: 'accessories',
      brand: 'Anker',
      status: 'active'
    }
  ],

  gaming: [
    {
      id: '13',
      name: 'PlayStation 5',
      price: 299000,
      compare_at_price: 329000,
      description: 'Next-gen gaming console',
      images: ['/products/gaming/playstation-5-console.png'],
      category_id: 'gaming',
      brand: 'Sony',
      status: 'active'
    },
    {
      id: '14',
      name: 'Xbox Series X',
      price: 279000,
      compare_at_price: 309000,
      description: 'Most powerful Xbox console',
      images: ['/products/gaming/xbox-series-x.jpg'],
      category_id: 'gaming',
      brand: 'Microsoft',
      status: 'active'
    },
    {
      id: '15',
      name: 'Nintendo Switch OLED',
      price: 199000,
      compare_at_price: 229000,
      description: 'Handheld gaming with vibrant OLED screen',
      images: ['/products/gaming/nintendo-switch.jpg'],
      category_id: 'gaming',
      brand: 'Nintendo',
      status: 'active'
    },
    {
      id: '16',
      name: 'Steam Deck',
      price: 349000,
      compare_at_price: 379000,
      description: 'Portable PC gaming handheld',
      images: ['/products/gaming/steam-deck.jpg'],
      category_id: 'gaming',
      brand: 'Valve',
      status: 'active'
    }
  ],

  'home-electronics': [
    {
      id: '17',
      name: 'Smart TV 65"',
      price: 779000,
      compare_at_price: 899000,
      description: 'Samsung 65" QLED 4K Smart TV',
      images: ['/products/home-electronics/smart-tv.jpg'],
      category_id: 'home-electronics',
      brand: 'Samsung',
      status: 'active'
    },
    {
      id: '18',
      name: 'Smart Speaker',
      price: 79000,
      compare_at_price: 99000,
      description: 'Voice-controlled smart speaker',
      images: ['/placeholder.jpg'],
      category_id: 'home-electronics',
      brand: 'Amazon',
      status: 'active'
    },
    {
      id: '19',
      name: 'Robot Vacuum',
      price: 299000,
      compare_at_price: 349000,
      description: 'Self-emptying robot vacuum with smart mapping',
      images: ['/products/home-electronics/robot-vacuum.jpg'],
      category_id: 'home-electronics',
      brand: 'Roomba',
      status: 'active'
    },
    {
      id: '20',
      name: 'Air Purifier',
      price: 199000,
      compare_at_price: 229000,
      description: 'HEPA air purifier for clean indoor air',
      images: ['/products/home-electronics/air-purifier.jpg'],
      category_id: 'home-electronics',
      brand: 'Dyson',
      status: 'active'
    }
  ],

  audio: [
    {
      id: '21',
      name: 'Bose Headphones',
      price: 179000,
      compare_at_price: 199000,
      description: 'Premium noise canceling headphones',
      images: ['/products/audio/bose-headphones.jpg'],
      category_id: 'audio',
      brand: 'Bose',
      status: 'active'
    },
    {
      id: '22',
      name: 'Premium Audio Equipment',
      price: 299000,
      compare_at_price: 349000,
      description: 'Professional audio equipment for audiophiles',
      images: ['/products/audio/premium-audio-equipment.png'],
      category_id: 'audio',
      brand: 'Premium',
      status: 'active'
    },
    {
      id: '23',
      name: 'Wireless Headphones',
      price: 189000,
      compare_at_price: 219000,
      description: 'High-quality wireless headphones',
      images: ['/products/audio/wireless-headphones.jpg'],
      category_id: 'audio',
      brand: 'Sony',
      status: 'active'
    }
  ],

  cameras: [
    {
      id: '24',
      name: 'Canon Professional Camera',
      price: 899000,
      compare_at_price: 999000,
      description: 'Professional DSLR camera for photography enthusiasts',
      images: ['/products/cameras/canon-camera.png'],
      category_id: 'cameras',
      brand: 'Canon',
      status: 'active'
    },
    {
      id: '25',
      name: 'Professional Camera Collection',
      price: 1299000,
      compare_at_price: 1499000,
      description: 'Complete professional camera setup',
      images: ['/products/cameras/professional-cameras.png'],
      category_id: 'cameras',
      brand: 'Professional',
      status: 'active'
    }
  ],

  wearables: [
    {
      id: '26',
      name: 'Apple Watch',
      price: 249000,
      compare_at_price: 289000,
      description: 'Advanced smartwatch with health monitoring',
      images: ['/products/accessories/apple-watch.jpg'],
      category_id: 'wearables',
      brand: 'Apple',
      status: 'active'
    }
  ]
}

export const getAllProducts = () => {
  return Object.values(productsByCategory).flat()
}

export const getProductsByCategory = (categoryId: string) => {
  return productsByCategory[categoryId as keyof typeof productsByCategory] || []
}

export const getCategoryNames = () => {
  return Object.keys(productsByCategory)
}

// Get category statistics
export const getCategoryStats = () => {
  return {
    smartphones: 4,
    laptops: 4,
    accessories: 4,
    gaming: 4,
    'home-electronics': 4,
    audio: 3,
    cameras: 2,
    wearables: 1
  }
}

// Get brand statistics across all products
export const getBrandStats = () => {
  const allProducts = getAllProducts()
  const brandCounts: { [key: string]: number } = {}
  
  allProducts.forEach(product => {
    brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1
  })
  
  return brandCounts
}

// Get price range for all products
export const getPriceRange = (): [number, number] => {
  const allProducts = getAllProducts()
  const prices = allProducts.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}

// Get price range for specific category
export const getCategoryPriceRange = (categoryId: string): [number, number] => {
  const products = getProductsByCategory(categoryId)
  if (products.length === 0) return [0, 1000000]
  
  const prices = products.map(p => p.price)
  return [Math.min(...prices), Math.max(...prices)]
}
