import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2 } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Latest smartphones from top brands with cutting-edge features",
    count: 4,
    icon: Smartphone,
    image: "/products/smartphones/modern-smartphones.png",
    featured: ["iPhone 15 Pro", "Samsung Galaxy S24", "Google Pixel 8"],
  },
  {
    id: "laptops",
    name: "Laptops",
    description: "High-performance laptops for work, gaming, and creativity",
    count: 4,
    icon: Laptop,
    image: "/modern-laptops.png",
    featured: ["MacBook Pro M3", "Dell XPS 13", "ThinkPad X1 Carbon"],
  },
  {
    id: "audio",
    name: "Audio",
    description: "Premium headphones, speakers, and audio equipment",
    count: 3,
    icon: Headphones,
    image: "/products/audio/premium-audio-equipment.png",
    featured: ["Sony WH-1000XM5", "AirPods Pro", "Bose QuietComfort"],
  },
  {
    id: "cameras",
    name: "Cameras",
    description: "Professional cameras and photography equipment",
    count: 2,
    icon: Camera,
    image: "/products/cameras/professional-cameras.png",
    featured: ["Canon EOS R6", "Sony A7 IV", "Nikon Z9"],
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart watches and fitness trackers for active lifestyles",
    count: 1,
    icon: Watch,
    image: "/apple-watch-series-9.png",
    featured: ["Apple Watch Series 9", "Samsung Galaxy Watch", "Fitbit Sense"],
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Gaming consoles, accessories, and equipment",
    count: 4,
    icon: Gamepad2,
    image: "/products/gaming/gaming-setup.png",
    featured: ["PlayStation 5", "Xbox Series X", "Nintendo Switch"],
  },
]

export default async function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-sans font-bold text-4xl md:text-5xl text-foreground mb-4">Shop by Category</h1>
            <p className="text-lg text-muted-foreground">
              Explore our carefully curated categories to find exactly what you're looking for
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <IconComponent className="h-6 w-6" />
                        <span className="font-semibold text-lg">{category.name}</span>
                      </div>
                      <p className="text-sm opacity-90">{category.count} products available</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">{category.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm mb-2">Featured Products:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.featured.map((product, index) => (
                          <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link href={`/products?category=${category.id}`}>
                      <Button className="w-full">Browse {category.name}</Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
