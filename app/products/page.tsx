import { Header } from "@/components/header"
import { ProductsPageClient } from "@/components/products-page-client"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  // In a real app, we would fetch data from Supabase here based on searchParams
  // const supabase = await createClient()
  // const { data: products } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category', searchParams.category || '')

  const params = await searchParams
  const selectedCategory = params.category
  const searchQuery = params.search

  return (
    <>
      <Header />
      <ProductsPageClient 
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </>
  )
}
