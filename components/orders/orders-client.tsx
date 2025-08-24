"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { createClient } from "@/lib/supabase/client"

interface OrderItem {
  id: string
  quantity: number
  unit_price: number
  total_price: number
  product: {
    id: string
    name: string
    image_url: string
  }
}

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  order_items: OrderItem[]
}

export function OrdersClient() {
  const { user, loading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      fetchOrders()
    } else {
      setOrdersLoading(false)
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      // Temporarily disabled Supabase calls due to connection issues
      // TODO: Re-enable when Supabase environment is properly configured
      
      // Mock data for development/testing
      const mockOrders: Order[] = [
        {
          id: "1",
          order_number: "AWH-2024-001",
          status: "delivered",
          total_amount: 125000,
          created_at: "2024-01-15T10:30:00Z",
          order_items: [
            {
              id: "1",
              quantity: 1,
              unit_price: 125000,
              total_price: 125000,
              product: {
                id: "1",
                name: "iPhone 15 Pro Max",
                image_url: "/products/phones/iphone-15-pro-max.png"
              }
            }
          ]
        },
        {
          id: "2", 
          order_number: "AWH-2024-002",
          status: "shipped",
          total_amount: 85000,
          created_at: "2024-01-20T14:15:00Z",
          order_items: [
            {
              id: "2",
              quantity: 1,
              unit_price: 85000,
              total_price: 85000,
              product: {
                id: "2",
                name: "Samsung Galaxy S24",
                image_url: "/products/phones/samsung-galaxy-s24.png"
              }
            }
          ]
        }
      ]
      
      setOrders(mockOrders)
      
      /* Original Supabase code - temporarily commented out
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total_amount,
          created_at,
          order_items (
            id,
            quantity,
            unit_price,
            total_price,
            products (
              id,
              name,
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } else {
        const transformedOrders = data?.map(order => ({
          ...order,
          order_items: order.order_items.map(item => ({
            ...item,
            product: item.products
          }))
        })) || []
        setOrders(transformedOrders)
      }
      */
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setOrdersLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading || ordersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-sans font-bold text-2xl mb-4">Sign in to view your orders</h2>
          <p className="text-muted-foreground mb-8">You need to be logged in to access your order history.</p>
          <Button asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-sans font-bold text-3xl mb-2">Your Orders</h1>
        <p className="text-muted-foreground">Track and manage your recent purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-sans font-bold text-2xl mb-4">No orders yet</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Button asChild size="lg">
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order {order.order_number}</CardTitle>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(order.total_amount)}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          {item.product?.image_url ? (
                            <img 
                              src={item.product.image_url} 
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product?.name || 'Unknown Product'}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} • {formatPrice(item.unit_price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="bg-transparent" asChild>
                      <Link href={`/orders/${order.id}`}>View Details</Link>
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Reorder
                      </Button>
                    )}
                    {order.status === "shipped" && (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
