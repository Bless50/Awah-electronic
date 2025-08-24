"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Smartphone, CheckCircle, XCircle } from "lucide-react"
import { paymentService, PaymentRequest } from "@/lib/payment-service"

interface MobileMoneyPaymentProps {
  amount: number
  currency: string
  orderReference: string
  onPaymentSuccess: (transactionId: string) => void
  onPaymentError: (error: string) => void
}

export function MobileMoneyPayment({
  amount,
  currency,
  orderReference,
  onPaymentSuccess,
  onPaymentError
}: MobileMoneyPaymentProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [provider, setProvider] = useState<'MTN' | 'ORANGE'>('MTN')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle')
  const [statusMessage, setStatusMessage] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const [apiResponse, setApiResponse] = useState<any>(null)

  const handlePayment = async () => {
    if (!phoneNumber.trim()) {
      onPaymentError("Please enter your phone number")
      return
    }

    // Basic phone number validation for Cameroon
    const cleanPhone = phoneNumber.replace(/\s/g, '').replace(/^\+237/, '')
    const phoneRegex = /^(6[5-9]\d{7}|2[0-9]\d{8})$/
    if (!phoneRegex.test(cleanPhone)) {
      setPaymentStatus('failed')
      setStatusMessage("Please enter a valid Cameroon phone number (format: 6XXXXXXXX or 2XXXXXXXXX)")
      return
    }

    setIsProcessing(true)
    setPaymentStatus('pending')
    setStatusMessage("Initiating payment request...")

    try {
      const paymentData: PaymentRequest = {
        amount: amount.toString(),
        currency: currency,
        externalId: `unique_id_from_your_system_${orderReference}`,
        payer: {
          partyIdType: "MSISDN",
          partyId: cleanPhone
        },
        payerMessage: `Payment for product/service`,
        payeeNote: `Order #${orderReference}`
      }

      // Request payment
      const paymentResponse = await paymentService.requestPayment(paymentData)
      setApiResponse(paymentResponse)

      if (!paymentResponse.success) {
        setPaymentStatus('failed')
        setStatusMessage(paymentResponse.error?.message || "Payment request failed")
        return
      }

      if (!paymentResponse.data?.id) {
        setPaymentStatus('failed')
        setStatusMessage("No transaction ID received")
        return
      }

      setTransactionId(paymentResponse.data.id)
      setStatusMessage("Payment request sent. Please check your phone and enter your PIN to complete the payment.")

      // Poll for transaction status
      const finalStatus = await paymentService.pollTransactionStatus(paymentResponse.data.id)
      setApiResponse(finalStatus)

      if (finalStatus.success && finalStatus.data?.status === 'SUCCESSFUL') {
        setPaymentStatus('success')
        setStatusMessage("Payment completed successfully!")
        // Only call success callback after confirmed payment
        setTimeout(() => {
          onPaymentSuccess(paymentResponse.data?.id || transactionId)
        }, 2000) // Give user time to see the success response
      } else {
        setPaymentStatus('failed')
        setStatusMessage(finalStatus.data?.status === 'FAILED' ? "Payment was declined" : "Payment failed. Please try again.")
      }

    } catch (error) {
      setPaymentStatus('failed')
      const errorMessage = error instanceof Error ? error.message : "Payment failed"
      setStatusMessage(errorMessage)
      setApiResponse({ success: false, error: { message: errorMessage } })
    } finally {
      setIsProcessing(false)
    }
  }

  const resetPayment = () => {
    setPaymentStatus('idle')
    setStatusMessage("")
    setTransactionId("")
    setApiResponse(null)
    setIsProcessing(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Mobile Money Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentStatus === 'idle' && (
          <>
            <div>
              <Label htmlFor="provider">Mobile Money Provider</Label>
              <RadioGroup
                value={provider}
                onValueChange={(value) => setProvider(value as 'MTN' | 'ORANGE')}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MTN" id="mtn" />
                  <Label htmlFor="mtn" className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-black">M</span>
                    </div>
                    MTN Mobile Money
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ORANGE" id="orange" />
                  <Label htmlFor="orange" className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">O</span>
                    </div>
                    Orange Money
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="6XXXXXXXX or 2XXXXXXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Enter your {provider} Mobile Money number
              </p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold">{currency} {amount.toLocaleString()}</span>
              </div>
              
              {/* Payment Status Info */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>How it works:</strong> Click "Pay" to initiate the payment request. 
                  You'll receive an SMS on your phone to confirm the payment with your PIN.
                </p>
              </div>
              
              <Button 
                onClick={handlePayment} 
                className="w-full" 
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  `Pay ${currency} ${amount.toLocaleString()} with ${provider} Mobile Money`
                )}
              </Button>
            </div>
          </>
        )}

        {paymentStatus === 'pending' && (
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <div>
              <h3 className="font-medium">Payment in Progress</h3>
              <p className="text-sm text-muted-foreground mt-1">{statusMessage}</p>
              {transactionId && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Transaction Details:</p>
                  <p className="text-xs text-yellow-700 mt-1">ID: {transactionId}</p>
                  <p className="text-xs text-yellow-700">Status: Waiting for confirmation</p>
                </div>
              )}
            </div>
          </div>
        )}

        {paymentStatus === 'success' && (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-green-600">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">{statusMessage}</p>
            </div>
            
            {/* API Response Display */}
            {apiResponse && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-green-500 text-white text-xs rounded font-medium">
                    Success
                  </div>
                  <span className="text-sm font-medium text-green-800">API Response</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium text-green-700">Transaction ID:</span>
                      <p className="text-green-600">{apiResponse.data?.transactionId || transactionId}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Amount:</span>
                      <p className="text-green-600">{currency} {amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Status:</span>
                      <p className="text-green-600">{apiResponse.data?.status || 'SUCCESSFUL'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">Currency:</span>
                      <p className="text-green-600">{apiResponse.data?.currency || currency}</p>
                    </div>
                  </div>
                  
                  {apiResponse.data?.payerPartyId && (
                    <div>
                      <span className="font-medium text-green-700">Payer:</span>
                      <p className="text-green-600">{apiResponse.data.payerPartyId}</p>
                    </div>
                  )}
                  
                  {apiResponse.data?.createdAt && (
                    <div>
                      <span className="font-medium text-green-700">Created:</span>
                      <p className="text-green-600">{new Date(apiResponse.data.createdAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
                
                {/* Raw JSON Response */}
                <details className="mt-3">
                  <summary className="text-xs font-medium text-green-700 cursor-pointer">View Raw Response</summary>
                  <pre className="mt-2 p-2 bg-green-100 rounded text-xs overflow-auto max-w-full">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="space-y-4">
            <div className="text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-medium text-red-600">Payment Failed</h3>
              <p className="text-sm text-muted-foreground mt-1">{statusMessage}</p>
            </div>
            
            {/* API Response Display for Errors */}
            {apiResponse && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">
                    Error
                  </div>
                  <span className="text-sm font-medium text-red-800">API Response</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  {apiResponse.error && (
                    <div>
                      <span className="font-medium text-red-700">Error Code:</span>
                      <p className="text-red-600">{apiResponse.error.code || 'UNKNOWN_ERROR'}</p>
                    </div>
                  )}
                  
                  {apiResponse.error?.message && (
                    <div>
                      <span className="font-medium text-red-700">Error Message:</span>
                      <p className="text-red-600">{apiResponse.error.message}</p>
                    </div>
                  )}
                  
                  <div>
                    <span className="font-medium text-red-700">Success:</span>
                    <p className="text-red-600">{apiResponse.success ? 'true' : 'false'}</p>
                  </div>
                </div>
                
                {/* Raw JSON Response */}
                <details className="mt-3">
                  <summary className="text-xs font-medium text-red-700 cursor-pointer">View Raw Response</summary>
                  <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto max-w-full">
                    {JSON.stringify(apiResponse, null, 2)}
                  </pre>
                </details>
              </div>
            )}
            
            <Button onClick={resetPayment} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
