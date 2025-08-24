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

  // Poll transaction status until completion (matching dashboard behavior)
  async pollTransactionStatus(
    transactionId: string, 
    maxAttempts: number = 60, 
    intervalMs: number = 3000
  ): Promise<TransactionStatusResponse> {
    console.log(`Starting to poll transaction ${transactionId}`)
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      console.log(`Polling attempt ${attempt + 1}/${maxAttempts}`)
      const status = await this.checkTransactionStatus(transactionId)
      
      console.log('Status response:', status)
      
      if (status.success && status.data) {
        console.log('Transaction status:', status.data.status)
        
        if (status.data.status === 'SUCCESSFUL' || status.data.status === 'FAILED') {
          console.log('Final status reached:', status.data.status)
          return status
        }
        
        if (status.data.status === 'PENDING') {
          console.log('Still pending, continuing to poll...')
        }
      } else {
        console.log('Status check failed:', status)
        
        // If status check fails repeatedly, assume network issues
        if (attempt > 5) {
          console.log('Multiple status check failures, treating as network error')
          return {
            success: false
          }
        }
      }

      // Wait before next attempt (same as dashboard: 3 seconds)
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }

    console.log('Polling timed out after', maxAttempts, 'attempts')
    console.log('This often happens when background status updates are not working')
    return {
      success: false
    }
  }
}

// Export singleton instance
export const paymentService = new PaymentService()

// Export types
export type { PaymentRequest, PaymentResponse, TransactionStatusResponse }
