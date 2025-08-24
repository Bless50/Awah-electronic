"use client"

import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsView() {
  // Mock analytics data
  const metrics = [
    {
      title: "Revenue Growth",
      value: "+12.5%",
      description: "vs last month",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      description: "vs 2.8% last month",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Average Order Value",
      value: "₣425,000",
      description: "vs ₣398,000 last month",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Customer Retention",
      value: "68%",
      description: "vs 72% last month",
      trend: "down",
      icon: Users,
    },
  ]

  const topCategories = [
    { name: "Smartphones", revenue: 15600000, percentage: 35 },
    { name: "Laptops", revenue: 12400000, percentage: 28 },
    { name: "Audio", revenue: 8900000, percentage: 20 },
    { name: "Cameras", revenue: 4200000, percentage: 10 },
    { name: "Wearables", revenue: 3100000, percentage: 7 },
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
        <h1 className="font-serif font-bold text-3xl mb-2">Analytics</h1>
        <p className="text-muted-foreground">Track your store's performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown
          const trendColor = metric.trend === "up" ? "text-green-600" : "text-red-600"

          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs flex items-center ${trendColor}`}>
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{formatPrice(category.revenue)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{category.percentage}% of total revenue</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New order placed", details: "Order #AE-ABC123 - ₣850,000", time: "2 minutes ago" },
                { action: "Product updated", details: "iPhone 15 Pro Max stock updated", time: "15 minutes ago" },
                { action: "New customer registered", details: "john.doe@example.com", time: "1 hour ago" },
                { action: "Order shipped", details: "Order #AE-DEF456 shipped", time: "2 hours ago" },
                { action: "Payment received", details: "₣1,200,000 payment confirmed", time: "3 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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
