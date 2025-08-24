"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function OrderSummary() {
  const { items, total } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = total
  const shipping = total > 100000 ? 0 : 5000 // Free shipping over 100,000 XAF
  const tax = Math.round(total * 0.1) // 10% tax
  const finalTotal = subtotal + shipping + tax

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {item.quantity}
                </Badge>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 mb-1">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Tax (10%)</span>
            <span>{formatPrice(tax)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        {/* Free Shipping Notice */}
        {shipping > 0 && (
          <div className="p-3 bg-accent/10 rounded-lg">
            <p className="text-sm text-accent-foreground">
              Add {formatPrice(100000 - subtotal)} more for free shipping!
            </p>
          </div>
        )}

        {/* Security Info */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">🔒 Secure checkout with SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
