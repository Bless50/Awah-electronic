import { Header } from "@/components/header"
import { CheckoutClient } from "@/components/checkout/checkout-client"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CheckoutClient />
    </div>
  )
}
