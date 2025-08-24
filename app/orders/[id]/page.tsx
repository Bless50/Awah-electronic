import { Header } from "@/components/header"
import { OrderDetailClient } from "../../../components/orders/order-detail-client"

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OrderDetailClient orderId={params.id} />
    </div>
  )
}
