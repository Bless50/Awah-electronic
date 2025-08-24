import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { getAllProducts } from "@/lib/product-categories"
import { ProductDetailClient } from "@/components/product-detail-client"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const products = getAllProducts()
  const product = products.find(p => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetailClient product={product} />
    </div>
  )
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = getAllProducts()
  
  return products.map((product) => ({
    id: product.id,
  }))
}
