"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, ArrowLeft, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MobileMoneyPayment } from "@/components/checkout/mobile-money-payment"
import { useCart } from "@/contexts/cart-context"

interface PaymentFormProps {
  onSubmit: (data: any) => void
  onBack: () => void
  isProcessing: boolean
}

export function PaymentForm({ onSubmit, onBack, isProcessing }: PaymentFormProps) {
  const { total } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [mobileMoneyData, setMobileMoneyData] = useState({
    provider: "",
    phoneNumber: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const paymentData = {
      method: paymentMethod,
      ...(paymentMethod === "card" ? cardData : mobileMoneyData),
    }
    onSubmit(paymentData)
  }

  const handleMobileMoneySuccess = (transactionId: string) => {
    onSubmit({ method: "mobile", transactionId, success: true })
  }

  const handleMobileMoneyError = (error: string) => {
    console.error("Mobile money payment error:", error)
    // Could show error toast or alert here
  }

  const handleCardInputChange = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMobileMoneyChange = (field: string, value: string) => {
    setMobileMoneyData((prev) => ({ ...prev, [field]: value }))
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "mobile",
      name: "Mobile Money",
      description: "MTN Mobile Money, Orange Money",
      icon: Smartphone,
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div key={method.id} className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <Label htmlFor={method.id} className="font-medium cursor-pointer">
                      {method.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Details */}
      {paymentMethod === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                value={cardData.cardholderName}
                onChange={(e) => handleCardInputChange("cardholderName", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardData.cardNumber}
                onChange={(e) => handleCardInputChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={cardData.expiryDate}
                  onChange={(e) => handleCardInputChange("expiryDate", e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentMethod === "mobile" && (
        <div className="w-full overflow-hidden">
          <MobileMoneyPayment
            amount={total}
            currency="XAF"
            orderReference={`ORDER-${Date.now()}`}
            onPaymentSuccess={handleMobileMoneySuccess}
            onPaymentError={handleMobileMoneyError}
          />
        </div>
      )}

      {/* Security Notice */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
              </svg>
            </div>
            <span>Your payment information is encrypted and secure</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {paymentMethod !== "mobile" && (
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shipping
          </Button>
          <Button type="submit" className="flex-1" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </Button>
        </div>
      )}

      {/* Mobile Money Back Button Only */}
      {paymentMethod === "mobile" && (
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shipping
          </Button>
        </div>
      )}
    </form>
  )
}
