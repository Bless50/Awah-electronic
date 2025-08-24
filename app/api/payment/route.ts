import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...paymentData } = body

    const apiKey = 'sk_sandbox_f1406bbf-a172-4034-aa26-04a572ff132e'
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_API_KEY', message: 'API key not configured' } },
        { status: 500 }
      )
    }

    const baseUrl = 'https://starter-pay.vercel.app/api/sandbox'

    if (action === 'request-payment') {

      try {
        // Transform the data to match StarterPay's expected format (exactly like dashboard)
        const starterPayData = {
          amount: parseInt(paymentData.amount),
          currency: 'XAF', // Force XAF for sandbox
          externalId: paymentData.externalId,
          payerPhone: paymentData.payer.partyId, // Direct phone number
          payerMessage: paymentData.payerMessage || 'Payment for product/service',
          payeeNote: paymentData.payeeNote || `Order #${paymentData.externalId}`
        }

        console.log('Sending payment request to StarterPay:', starterPayData)
        
        const response = await fetch(`${baseUrl}/collect-payment`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(starterPayData),
        })
        
        console.log('StarterPay response status:', response.status)

        let result
        try {
          result = await response.json()
          console.log('StarterPay response body:', result)
        } catch (jsonError) {
          console.log('Failed to parse StarterPay response as JSON')
          return NextResponse.json({
            success: false,
            error: {
              code: 'INVALID_RESPONSE',
              message: 'Invalid JSON response from payment provider'
            }
          }, { status: 500 })
        }
        
        if (!response.ok) {
          return NextResponse.json({
            success: false,
            error: {
              code: (result && (result.code || result.error)) || 'REQUEST_FAILED',
              message: (result && (result.message || result.error || (result.details && result.details[0]?.message))) || `Payment request failed: ${response.statusText}`,
              details: result?.details
            }
          }, { status: response.status })
        }

        return NextResponse.json({
          success: true,
          data: result
        })
      } catch (fetchError) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'NETWORK_ERROR',
            message: fetchError instanceof Error ? fetchError.message : 'Failed to connect to payment provider'
          }
        }, { status: 500 })
      }
    }

    if (action === 'check-status') {
      const { transactionId } = paymentData
      
      console.log('Checking status for transaction:', transactionId)
      console.log('Status check URL:', `${baseUrl}/transactions/${transactionId}`)
      
      const response = await fetch(`${baseUrl}/transactions/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })

      let result
      try {
        result = await response.json()
      } catch (jsonError) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'INVALID_RESPONSE',
            message: 'Invalid JSON response from status check'
          }
        }, { status: 500 })
      }
      
      console.log('Status check response:', response.status, result)
      
      if (!response.ok) {
        return NextResponse.json({
          success: false,
          error: {
            code: (result && (result.code || result.error)) || 'REQUEST_FAILED',
            message: (result && (result.message || result.error)) || `Status check failed: ${response.statusText}`,
            details: result?.details
          }
        }, { status: response.status })
      }

      return NextResponse.json({
        success: true,
        data: result
      })
    }

    return NextResponse.json(
      { success: false, error: { code: 'INVALID_ACTION', message: 'Invalid action' } },
      { status: 400 }
    )

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: { 
          code: 'NETWORK_ERROR', 
          message: error instanceof Error ? error.message : 'Payment request failed' 
        } 
      },
      { status: 500 }
    )
  }
}

