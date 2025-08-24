"use client"

import { TrendingUp, Package, ShoppingCart, Users, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardOverview() {
  // Mock data - would come from Supabase in real app
  const stats = [
    {
      title: "Total Revenue",
      value: "₣12,450,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "456",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Customers",
      value: "2,890",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
    },
  ]

  const recentOrders = [
    { id: "AE-ABC123", customer: "John Doe", amount: 850000, status: "completed" },
    { id: "AE-DEF456", customer: "Jane Smith", amount: 1200000, status: "processing" },
    { id: "AE-GHI789", customer: "Bob Johnson", amount: 180000, status: "shipped" },
    { id: "AE-JKL012", customer: "Alice Brown", amount: 450000, status: "completed" },
  ]

  const topProducts = [
    { name: "iPhone 15 Pro Max", sales: 45, revenue: 38250000 },
    { name: 'MacBook Pro 14"', sales: 23, revenue: 27600000 },
    { name: "Samsung Galaxy S24", sales: 34, revenue: 26520000 },
    { name: "Sony WH-1000XM5", sales: 67, revenue: 12060000 },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif font-bold text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(order.amount)}</p>
                    <p
                      className={`text-xs ${
                        order.status === "completed"
                          ? "text-green-600"
                          : order.status === "processing"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
