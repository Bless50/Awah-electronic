import { Header } from "@/components/header"
import { OrderDetailClient } from "../../../components/orders/order-detail-client"

interface OrderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OrderDetailClient orderId={id} />
    </div>
  )
}
