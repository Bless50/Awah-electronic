"use client"

import { ProductCard } from "@/components/product-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Suspense, useState, useEffect } from "react"
import { getAllProducts, getProductsByCategory, getCategoryStats, getBrandStats, getPriceRange, getCategoryPriceRange } from "@/lib/product-categories"

// Mock data - will be replaced with real data from Supabase
const mockProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    price: 850000,
    originalPrice: 950000,
    image: "/iphone-15-pro-max.png",
    rating: 4.8,
    reviews: 1234,
    category: "smartphones",
    brand: "Apple",
    isNew: true,
    discount: 11,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    price: 799000,
    originalPrice: 899000,
    image: "/samsung-galaxy-s24-ultra.png",
    rating: 4.7,
    reviews: 987,
    category: "smartphones",
    brand: "Samsung",
    isNew: true,
    discount: 11,
  },
  {
    id: "3",
    name: "MacBook Pro 14-inch",
    price: 1999000,
    originalPrice: 2299000,
    image: "/macbook-pro-14-inch.png",
    rating: 4.9,
    reviews: 567,
    category: "laptops",
    brand: "Apple",
    isNew: true,
    discount: 13,
  },
  {
    id: "4",
    name: "Dell Laptop",
    price: 999000,
    originalPrice: 1199000,
    image: "/dell-laptop.png",
    rating: 4.6,
    reviews: 432,
    category: "laptops",
    brand: "Dell",
    isNew: false,
    discount: 17,
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    price: 299000,
    originalPrice: 349000,
    image: "/sony-wh-1000xm5.png",
    rating: 4.8,
    reviews: 1876,
    category: "headphones",
    brand: "Sony",
    isNew: false,
    discount: 14,
  },
  {
    id: "6",
    name: "Gaming Headset",
    price: 199000,
    originalPrice: 229000,
    image: "/gaming-headset.png",
    rating: 4.7,
    reviews: 2341,
    category: "headphones",
    brand: "Gaming",
    isNew: true,
    discount: 13,
  },
  {
    id: "7",
    name: "Canon Camera",
    price: 2499000,
    originalPrice: 2799000,
    image: "/canon-camera.png",
    rating: 4.9,
    reviews: 234,
    category: "cameras",
    brand: "Canon",
    isNew: false,
    discount: 11,
  },
  {
    id: "8",
    name: "Apple Watch Series 9",
    price: 299000,
    originalPrice: 349000,
    image: "/apple-watch-series-9.png",
    rating: 4.6,
    reviews: 1543,
    category: "watches",
    brand: "Apple",
    isNew: true,
    discount: 14,
  },
]

const mockFilterData = {
  categories: [
    { id: "smartphones", name: "Smartphones", count: 156 },
    { id: "laptops", name: "Laptops", count: 89 },
    { id: "headphones", name: "Headphones", count: 234 },
    { id: "cameras", name: "Cameras", count: 67 },
    { id: "watches", name: "Smart Watches", count: 123 },
    { id: "gaming", name: "Gaming", count: 98 },
  ],
  brands: [
    { id: "apple", name: "Apple", count: 45 },
    { id: "samsung", name: "Samsung", count: 67 },
    { id: "sony", name: "Sony", count: 34 },
    { id: "dell", name: "Dell", count: 23 },
    { id: "hp", name: "HP", count: 29 },
    { id: "lenovo", name: "Lenovo", count: 18 },
  ],
}

interface ProductsPageClientProps {
  selectedCategory?: string
  searchQuery?: string
}

export function ProductsPageClient({ selectedCategory, searchQuery }: ProductsPageClientProps) {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [filters, setFilters] = useState<any>(null)

  useEffect(() => {
    // Get products based on selected category
    let productList = selectedCategory ? getProductsByCategory(selectedCategory) : getAllProducts()
    setProducts(productList)
    setFilteredProducts(productList)
    
    // Generate dynamic filters based on current products
    const categoryStats = getCategoryStats()
    const brandStats = getBrandStats()
    const priceRange = selectedCategory ? getCategoryPriceRange(selectedCategory) : getPriceRange()
    
    // Filter categories and brands based on current context
    let availableCategories = Object.entries(categoryStats).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' '),
      count
    }))
    
    let availableBrands = Object.entries(brandStats).map(([id, count]) => ({
      id: id.toLowerCase(),
      name: id,
      count
    }))
    
    // If viewing specific category, filter brands to only those in that category
    if (selectedCategory) {
      const categoryProducts = getProductsByCategory(selectedCategory)
      const categoryBrands = [...new Set(categoryProducts.map(p => p.brand))]
      availableBrands = availableBrands.filter(brand => 
        categoryBrands.includes(brand.name)
      ).map(brand => ({
        ...brand,
        count: categoryProducts.filter(p => p.brand === brand.name).length
      }))
    }
    
    setFilters({
      categories: availableCategories,
      brands: availableBrands,
      priceRange
    })
  }, [selectedCategory])

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery, products])
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-sans font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Premium Electronics Collection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our curated selection of cutting-edge technology, designed for the modern African lifestyle. Quality, innovation, and style in every product.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                defaultValue={searchQuery}
                onChange={(e) => {
                  const query = e.target.value
                  const filtered = getAllProducts().filter(product => 
                    product.name.toLowerCase().includes(query.toLowerCase()) ||
                    product.brand.toLowerCase().includes(query.toLowerCase())
                  )
                  setFilteredProducts(filtered)
                }}
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => {
                  const input = document.querySelector('input[placeholder*="Search for products"]') as HTMLInputElement
                  if (input) {
                    const query = input.value
                    const filtered = getAllProducts().filter(product => 
                      product.name.toLowerCase().includes(query.toLowerCase()) ||
                      product.brand.toLowerCase().includes(query.toLowerCase())
                    )
                    setFilteredProducts(filtered)
                  }
                }}
              >
                Search
              </Button>
            </div>
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
                  selectedCategory={selectedCategory}
                  onCategoryChange={(categories) => {
                    console.log("Categories:", categories)
                    // Filter products by selected categories
                    if (categories.length === 0) {
                      setFilteredProducts(products)
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
                      setFilteredProducts(products)
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
                    setFilteredProducts(filtered)
                  }}
                />
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Mobile Filters Button */}
              <div className="lg:hidden mb-6">
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-sans font-bold mb-2">
                    {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : "All Products"}
                  </h2>
                  <p className="text-muted-foreground">
                    Showing {mockProducts.length} products
                    {selectedCategory && ` in ${selectedCategory}`}
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="hidden sm:block">
                  <select className="px-4 py-2 rounded-lg border border-border bg-card text-foreground">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                    <option>Best Rating</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <Suspense fallback={<div>Loading products...</div>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.compare_at_price}
                      image={product.images?.[0] || "/placeholder.png"}
                      rating={4.5}
                      reviewCount={0}
                      category={product.category_id}
                      inStock={product.status === 'active'}
                      isOnSale={product.compare_at_price ? product.price < product.compare_at_price : false}
                    />
                  ))}
                </div>
              </Suspense>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
