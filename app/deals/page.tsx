import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Flame, Zap } from "lucide-react"

// Mock deals data
const flashDeals = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    price: 850000,
    originalPrice: 950000,
    image: "/products/smartphones/iphone-15-pro-max.png",
    rating: 4.8,
    reviewCount: 124,
    category: "Smartphones",
    inStock: true,
    isOnSale: true,
    discount: 11,
    timeLeft: "2h 45m",
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    price: 180000,
    originalPrice: 220000,
    image: "/sony-wh-1000xm5.png",
    rating: 4.6,
    reviewCount: 203,
    category: "Audio",
    inStock: true,
    isOnSale: true,
    discount: 18,
    timeLeft: "5h 12m",
  },
]

const weeklyDeals = [
  {
    id: "7",
    name: "Dell XPS 13 Plus",
    price: 890000,
    originalPrice: 1050000,
    image: "/products/laptops/dell-laptop.png",
    rating: 4.4,
    reviewCount: 78,
    category: "Laptops",
    inStock: true,
    isOnSale: true,
    discount: 15,
  },
  {
    id: "8",
    name: "Canon EOS R6 Mark II",
    price: 950000,
    originalPrice: 1100000,
    image: "/products/cameras/canon-camera.png",
    rating: 4.8,
    reviewCount: 45,
    category: "Cameras",
    inStock: true,
    isOnSale: true,
    discount: 14,
  },
  {
    id: "9",
    name: "Samsung Galaxy Watch 6",
    price: 220000,
    originalPrice: 280000,
    image: "/apple-watch-series-9.png",
    rating: 4.5,
    reviewCount: 156,
    category: "Wearables",
    inStock: true,
    isOnSale: true,
    discount: 21,
  },
]

const clearanceItems = [
  {
    id: "10",
    name: "iPad Air 5th Gen",
    price: 450000,
    originalPrice: 650000,
    image: "/ipad-air-tablet.png",
    rating: 4.7,
    reviewCount: 89,
    category: "Tablets",
    inStock: true,
    isOnSale: true,
    discount: 31,
  },
  {
    id: "11",
    name: "Bose SoundLink Revolve+",
    price: 120000,
    originalPrice: 180000,
    image: "/products/audio/bose-headphones.jpg",
    rating: 4.4,
    reviewCount: 67,
    category: "Audio",
    inStock: true,
    isOnSale: true,
    discount: 33,
  },
]

export default async function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="h-8 w-8 text-red-500" />
              <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground">Hot Deals</h1>
              <Flame className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              Don't miss out on these incredible savings on premium electronics
            </p>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-16 bg-red-50/50 dark:bg-red-950/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="h-6 w-6 text-red-500" />
            <h2 className="font-sans font-bold text-3xl">Flash Deals</h2>
            <Badge variant="destructive" className="animate-pulse">
              Limited Time
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge variant="destructive" className="animate-pulse">
                    <Clock className="h-3 w-3 mr-1" />
                    {product.timeLeft}
                  </Badge>
                </div>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Deals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-sans font-bold text-3xl">Weekly Deals</h2>
            <Badge variant="secondary">Valid until Sunday</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyDeals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Clearance Sale */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl mb-4">Clearance Sale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Final markdowns on select items. These deals won't last long - grab them while supplies last!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clearanceItems.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-2 -left-2 z-10">
                  <Badge className="bg-green-500 hover:bg-green-600">{product.discount}% OFF</Badge>
                </div>
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Clearance Items
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-sans font-bold text-3xl mb-4">Never Miss a Deal</h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to get notified about flash sales, exclusive offers, and new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
              />
              <Button className="px-8">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
