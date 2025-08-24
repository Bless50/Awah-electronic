"use client"

import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2 } from "lucide-react"
import Link from "next/link"

import { createClient } from "@/lib/supabase/client"
import { getCategoryStats, getBrandStats, getPriceRange, getAllProducts, getProductsByCategory, getCategoryNames } from "@/lib/product-categories"
import { useEffect, useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  compare_at_price: number | null
  description: string | null
  images: string[] | null
  category_id: string | null
  brand: string | null
  status: string
}

interface Category {
  id: string
  name: string
  description: string
  image_url: string | null
}



export function HomePageClient() {
  // Start with fallback products for immediate render - no loading state needed

  const [products, setProducts] = useState<Product[]>(getAllProducts())
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  
  // Get one product per category for initial display
  const getFeaturedProducts = () => {
    const categories = getCategoryNames()
    const featuredProducts: Product[] = []
    
    categories.forEach(categoryId => {
      const categoryProducts = getProductsByCategory(categoryId)
      if (categoryProducts.length > 0) {
        featuredProducts.push(categoryProducts[0]) // Take first product from each category
      }
    })
    
    return featuredProducts
  }
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState<any>(null)
  const supabase = createClient()

  // Generate dynamic filters and set initial featured products
  useEffect(() => {
    const categoryStats = getCategoryStats()
    const brandStats = getBrandStats()
    const priceRange = getPriceRange()
    
    const availableCategories = Object.entries(categoryStats).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
      count
    }))
    
    const availableBrands = Object.entries(brandStats).map(([id, count]) => ({
      id: id.toLowerCase(),
      name: id,
      count
    }))
    
    setFilters({
      categories: availableCategories,
      brands: availableBrands,
      priceRange
    })
    
    // Set initial featured products (one per category)
    setFilteredProducts(getFeaturedProducts())
  }, [])

  // Temporarily disable Supabase calls to prevent fetch errors
  // useEffect(() => {
  //   async function fetchDataInBackground() {
  //     try {
  //       // Try to fetch real products, but don't block the UI
  //       const { data: featuredProducts, error: productsError } = await supabase
  //         .from('products')
  //         .select(`
  //           id,
  //           name,
  //           price,
  //           compare_at_price,
  //           description,
  //           images,
  //           brand,
  //           status,
  //           categories!inner(id, name)
  //         `)
  //         .eq('status', 'active')
  //         .eq('featured', true)
  //         .limit(6)

  //       if (!productsError && featuredProducts && featuredProducts.length > 0) {
  //         // Only update if we got real data - but keep using fallback for now
  //         // Comment out the database override to prevent price flickering
  //         // const transformedProducts = featuredProducts.map(product => ({
  //         //   id: product.id,
  //         //   name: product.name,
  //         //   price: product.price,
  //         //   compare_at_price: product.compare_at_price,
  //         //   description: product.description,
  //         //   images: product.images,
  //         //   category_id: product.categories?.[0]?.name?.toLowerCase(),
  //         //   brand: product.brand,
  //         //   status: product.status
  //         // }))
          
  //         // setProducts(transformedProducts)
  //         console.log('Database products available but using fallback data for consistent pricing')
  //       }

  //       // Fetch categories in background
  //       const { data: categoriesData } = await supabase
  //         .from('categories')
  //         .select('id, name, description, image_url')
  //         .limit(6)

  //       if (categoriesData) {
  //         setCategories(categoriesData)
  //       }
        
  //     } catch (error) {
  //       // Silently fail - we already have fallback products
  //       console.log('Background data fetch failed, using fallback data')
  //     }
  //   }

  //   // Delay the background fetch slightly to prioritize initial render
  //   setTimeout(fetchDataInBackground, 100)
  // }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-sans font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Premium Electronics for Modern Life
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Discover cutting-edge technology that empowers your digital lifestyle. From smartphones to laptops, we bring you the latest innovations at unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link href="/deals">View Deals</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <img
                  src="/african-tech-professional.png"
                  alt="African tech professional"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold">
                  New Arrivals
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-sans font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our wide range of premium electronics, carefully curated for the discerning consumer.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Smartphone, name: "Smartphones", href: "/products?category=smartphones" },
              { icon: Laptop, name: "Laptops", href: "/products?category=laptops" },
              { icon: Headphones, name: "Audio", href: "/products?category=headphones" },
              { icon: Camera, name: "Cameras", href: "/products?category=cameras" },
              { icon: Watch, name: "Wearables", href: "/products?category=watches" },
              { icon: Gamepad2, name: "Gaming", href: "/products?category=gaming" },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-card hover:bg-accent transition-colors rounded-xl p-6 text-center border border-border hover:border-primary/20"
              >
                <category.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-medium group-hover:text-primary transition-colors">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-lg p-6 border border-border">
                {filters && (
                <CategoryFilter
                  categories={filters.categories}
                  brands={filters.brands}
                  priceRange={filters.priceRange}
                  onCategoryChange={(categories) => {
                    console.log("Categories:", categories)
                    // Filter products by selected categories
                    if (categories.length === 0) {
                      setFilteredProducts(getFeaturedProducts()) // Show one per category when none selected
                    } else {
                      const filtered = products.filter(product => 
                        categories.includes(product.category_id || '')
                      )
                      setFilteredProducts(filtered)
                    }
                  }}
                  onBrandChange={(brands) => {
                    console.log("Brands:", brands)
                    // Filter products by selected brands
                    if (brands.length === 0) {
                      setFilteredProducts(getFeaturedProducts()) // Show one per category when none selected
                    } else {
                      const filtered = products.filter(product => 
                        brands.includes(product.brand?.toLowerCase() || '')
                      )
                      setFilteredProducts(filtered)
                    }
                  }}
                  onPriceChange={(range) => {
                    console.log("Price range:", range)
                    // Filter products by price range
                    const filtered = products.filter(product => 
                      product.price >= range[0] && product.price <= range[1]
                    )
                    // If no products match price range, show featured products
                    setFilteredProducts(filtered.length > 0 ? filtered : getFeaturedProducts())
                  }}
                />
              )}  
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-sans font-bold mb-2">Featured Products</h2>
                  <p className="text-muted-foreground">Handpicked electronics for the modern lifestyle</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/products">View All</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product: Product) => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.compare_at_price ?? undefined}
                    image={product.images?.[0] || "/placeholder.png"}
                    rating={4.5}
                    reviewCount={0}
                    category={product.category_id || "unknown"}
                    inStock={product.status === 'active'}
                    isOnSale={product.compare_at_price ? product.price < product.compare_at_price : false}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-sans font-bold mb-6 text-foreground">Stay Updated</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Get the latest deals, product launches, and tech news delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-foreground bg-background border border-border text-base h-14"
            />
            <Button className="px-8 text-base font-semibold h-14 sm:w-auto w-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-sans font-bold text-xl mb-4">Awah Electronics</h3>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for premium electronics in Africa. Quality, innovation, and excellence in every product.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary transition-colors">Products</Link></li>
                <li><Link href="/deals" className="hover:text-primary transition-colors">Deals</Link></li>
                <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-primary transition-colors">Returns</Link></li>
                <li><Link href="/warranty" className="hover:text-primary transition-colors">Warranty</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Awah Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
