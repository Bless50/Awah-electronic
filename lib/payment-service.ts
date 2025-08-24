// Payment service for Startupy API integration
interface PaymentRequest {
  amount: string
  currency: string
  externalId: string
  payer: {
    partyIdType: string
    partyId: string
  }
  payerMessage: string
  payeeNote: string
}

interface PaymentResponse {
  success: boolean
  data?: {
    id: string
    amount: number
    status: string
  }
  error?: {
    code: string
    message: string
  }
}

interface TransactionStatusResponse {
  success: boolean
  data?: {
    transactionId: string
    externalId: string
    status: string
    amount: number
    currency: string
    payerPartyId: string
    createdAt: string
  }
}

class PaymentService {

  constructor() {
  }

  // Initialize payment request
  async requestPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'request-payment',
          ...paymentData
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Payment request failed'
        }
      }
    }
  }

  // Check transaction status
  async checkTransactionStatus(transactionId: string): Promise<TransactionStatusResponse> {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'check-status',
          transactionId
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return {
        success: false
      }
    }
  }

  // Poll transaction status until completion
  async pollTransactionStatus(
    transactionId: string, 
    maxAttempts: number = 30, 
    intervalMs: number = 2000
  ): Promise<TransactionStatusResponse> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const status = await this.checkTransactionStatus(transactionId)
      
      if (status.success && status.data && 
          (status.data.status === 'SUCCESSFUL' || status.data.status === 'FAILED')) {
        return status
      }

      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }

    return {
      success: false
    }
  }
}

// Export singleton instance
export const paymentService = new PaymentService()

// Export types
export type { PaymentRequest, PaymentResponse, TransactionStatusResponse }
