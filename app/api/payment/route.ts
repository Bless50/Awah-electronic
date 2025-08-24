import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...paymentData } = body

    const apiKey = process.env.STARTERPAY_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_API_KEY', message: 'API key not configured' } },
        { status: 500 }
      )
    }

    const baseUrl = 'https://sandbox-api.starterpay.cm/v1'

    if (action === 'request-payment') {

      try {
        const response = await fetch(`${baseUrl}/collections/request-to-pay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Reference-Id': paymentData.externalId,
            'X-Target-Environment': 'sandbox'
          },
          body: JSON.stringify(paymentData),
        })

        let result
        try {
          result = await response.json()
        } catch (jsonError) {
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
              code: result.error?.code || 'REQUEST_FAILED',
              message: result.error?.message || `Payment request failed: ${response.statusText}`
            }
          })
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
      const response = await fetch(`${baseUrl}/collections/${transactionId}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Target-Environment': 'sandbox'
        },
      })

      const result = await response.json()
      
      if (!response.ok) {
        return NextResponse.json({ success: false })
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
