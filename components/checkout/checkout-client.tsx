"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"

export function CheckoutClient() {
  const { items, total, itemCount } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingData, setShippingData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: MapPin },
  ]

  const handleShippingSubmit = (data: any) => {
    setShippingData(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (paymentData: any) => {
    setIsProcessing(true)
    try {
      // Process payment and create order
      // This would integrate with PayStack API
      console.log("Processing payment:", paymentData)
      console.log("Shipping data:", shippingData)
      console.log("Cart items:", items)

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to success page
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-primary transition-colors whitespace-nowrap">
            Cart
          </Link>
          <span>/</span>
          <span className="text-foreground whitespace-nowrap">Checkout</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl">Checkout</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 overflow-x-auto pb-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const isDisabled = currentStep < step.id

            return (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                          ? "border-primary text-primary bg-primary/10"
                          : "border-muted-foreground text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                      isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-12 md:w-16 h-0.5 mx-2 sm:mx-4 ${
                      isCompleted ? "bg-primary" : "bg-muted-foreground/30"
                    } transition-colors`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          {currentStep === 1 && <ShippingForm onSubmit={handleShippingSubmit} />}
          {currentStep === 2 && (
            <PaymentForm onSubmit={handlePaymentSubmit} onBack={() => setCurrentStep(1)} isProcessing={isProcessing} />
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <OrderSummary />
        </div>
      </div>
      </div>
    </div>
  )
}
