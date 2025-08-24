import { Header } from "@/components/header"
import { OrdersClient } from "@/components/orders/orders-client"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OrdersClient />
    </div>
  )
}
