"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    // Clear cart after successful order
    clearCart()
  }, []) // Remove clearCart from dependencies to prevent infinite loop

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="pt-12 pb-8">
              <div className="space-y-6">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h1 className="font-sans font-bold text-3xl text-foreground">Order Confirmed!</h1>
                  <p className="text-muted-foreground text-lg">
                    Thank you for your purchase. Your order has been successfully placed.
                  </p>
                </div>

                {/* Order Details */}
                <div className="bg-muted/30 rounded-lg p-6 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Order #AE-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to your email address with order details and tracking
                    information.
                  </p>
                </div>

                {/* Next Steps */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">What's Next?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Order Processing</h4>
                      <p className="text-muted-foreground">
                        We'll prepare your items for shipment within 1-2 business days.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Shipping Updates</h4>
                      <p className="text-muted-foreground">
                        You'll receive tracking information once your order ships.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button asChild className="flex-1">
                    <Link href="/orders">
                      View Order Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="flex-1 bg-transparent">
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
