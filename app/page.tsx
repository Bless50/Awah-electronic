import { Header } from "@/components/header"
import { HomePageClient } from "@/components/home-page-client"

export default async function HomePage() {
  // In a real app, we would fetch data from Supabase here
  // const supabase = await createClient()
  // const { data: products } = await supabase.from('products').select('*')

  return (
    <>
      <Header />
      <HomePageClient />
    </>
  )
}
