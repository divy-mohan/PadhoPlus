'use client'

import { useState, useEffect } from 'react'
import PaymentGatewaySelector from './PaymentGatewaySelector'
import LoadingButton from './LoadingButton'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

interface PaymentGateway {
  id: string
  name: string
  displayName: string
  icon: string
  description: string
  supportsUpi: boolean
  supportsCards: boolean
  supportsNetbanking: boolean
  supportsWallets?: boolean
  isActive: boolean
  isDefault?: boolean
  comingSoon?: boolean
}

interface PaymentCheckoutProps {
  batchId: string
  batchName: string
  amount: number
  onBack?: () => void
}

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8000'
    }
    // For Replit: convert xxx-00-yyy.picard.replit.dev to xxx-8000-yyy.picard.replit.dev
    const backendHost = hostname.replace(/([^.]+)-00-/, '$1-8000-')
    return `${window.location.protocol}//${backendHost}`
  }
  return process.env.NEXT_PUBLIC_API_URL || ''
}

export default function PaymentCheckout({
  batchId,
  batchName,
  amount,
  onBack
}: PaymentCheckoutProps) {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiUrl, setApiUrl] = useState('')

  useEffect(() => {
    setApiUrl(getApiBaseUrl())
  }, [])

  const handleGatewaySelect = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway)
    setError(null)
  }

  const handlePayment = async () => {
    if (!selectedGateway) {
      setError('Please select a payment method')
      return
    }

    if (selectedGateway.comingSoon) {
      setError(`${selectedGateway.displayName} is coming soon! Please select another payment method.`)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiUrl}/api/payments/initiate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          gateway: selectedGateway.id,
          amount: amount,
          batch_id: batchId,
        }),
      })

      const data = await response.json()

      if (data.success && data.payment_url) {
        window.location.href = data.payment_url
      } else if (data.coming_soon) {
        setError(`${selectedGateway.displayName} integration is coming soon!`)
      } else {
        setError(data.error || 'Failed to initiate payment')
      }
    } catch (err) {
      setError('Payment initiation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Batch Details</span>
          </button>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Enrollment</h1>
          <p className="text-gray-600 mt-1">
            You're enrolling in: <span className="font-medium text-blue-600">{batchName}</span>
          </p>
        </div>

        <PaymentGatewaySelector
          onSelect={handleGatewaySelect}
          selectedGateway={selectedGateway?.id}
          amount={amount}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="mt-6">
          <LoadingButton
            onClick={handlePayment}
            disabled={!selectedGateway || selectedGateway.comingSoon}
            loading={loading}
            variant="primary"
            className="py-4 px-6 rounded-xl text-lg"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Pay ₹{amount.toLocaleString('en-IN')} with {selectedGateway?.displayName || 'Selected Gateway'}</span>
          </LoadingButton>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
