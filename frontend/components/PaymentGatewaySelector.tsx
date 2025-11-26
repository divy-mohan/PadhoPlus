'use client'

import { useState } from 'react'
import { Check, CreditCard, Smartphone, Building2, Wallet, Clock, Shield, Sparkles } from 'lucide-react'

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

interface PaymentGatewaySelectorProps {
  onSelect: (gateway: PaymentGateway) => void
  selectedGateway?: string
  amount: number
}

const PhonePeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <rect width="24" height="24" rx="6" fill="#5f259f"/>
    <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3.5 11.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7-4c-.83 0-1.5-.67-1.5-1.5S7.67 8.5 8.5 8.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white" fillOpacity="0.5"/>
  </svg>
)

const RazorpayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <rect width="24" height="24" rx="6" fill="#072654"/>
    <path d="M7.5 8L10.5 16H13.5L16.5 8H13.5L12 12.5L10.5 8H7.5Z" fill="#3395FF"/>
    <path d="M14 8L11 16H13L16 8H14Z" fill="white"/>
  </svg>
)

const StripeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <rect width="24" height="24" rx="6" fill="#635bff"/>
    <path d="M12 7c-2.76 0-5 1.79-5 4 0 2.76 2.76 4 5 4 1.38 0 2.63-.5 3.5-1.32V17h2v-6c0-2.21-2.24-4-5.5-4zm0 6c-1.66 0-3-.9-3-2s1.34-2 3-2 3 .9 3 2-1.34 2-3 2z" fill="white"/>
  </svg>
)

const PaytmIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
    <rect width="24" height="24" rx="6" fill="#00baf2"/>
    <path d="M6 10h2v4H6v-4zm3 0h2v4H9v-4zm3 0h2v4h-2v-4zm3 0h2v4h-2v-4z" fill="white"/>
    <path d="M6 8h12v1H6V8z" fill="white"/>
  </svg>
)

const defaultGateways: PaymentGateway[] = [
  {
    id: 'phonepe',
    name: 'phonepe',
    displayName: 'PhonePe',
    icon: 'phonepe',
    description: 'Pay using PhonePe UPI, cards, or net banking',
    supportsUpi: true,
    supportsCards: true,
    supportsNetbanking: true,
    isActive: true,
    isDefault: true,
  },
  {
    id: 'razorpay',
    name: 'razorpay',
    displayName: 'Razorpay',
    icon: 'razorpay',
    description: 'Pay using Razorpay - UPI, cards, wallets & more',
    supportsUpi: true,
    supportsCards: true,
    supportsNetbanking: true,
    supportsWallets: true,
    isActive: false,
    comingSoon: true,
  },
]

export default function PaymentGatewaySelector({
  onSelect,
  selectedGateway,
  amount
}: PaymentGatewaySelectorProps) {
  const [selected, setSelected] = useState(selectedGateway || 'phonepe')

  const handleSelect = (gateway: PaymentGateway) => {
    if (!gateway.isActive && gateway.comingSoon) return
    setSelected(gateway.id)
    onSelect(gateway)
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phonepe':
        return <PhonePeIcon />
      case 'razorpay':
        return <RazorpayIcon />
      case 'stripe':
        return <StripeIcon />
      case 'paytm':
        return <PaytmIcon />
      default:
        return <CreditCard className="w-8 h-8 text-gray-400" />
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6" />
            <h2 className="text-xl font-bold">Secure Payment</h2>
          </div>
          <p className="text-blue-100 text-sm">Choose your preferred payment method</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-blue-200 text-sm">Amount to pay:</span>
            <span className="text-2xl font-bold">₹{amount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
            Select Payment Gateway
          </h3>
          
          <div className="space-y-3">
            {defaultGateways.map((gateway) => (
              <div
                key={gateway.id}
                onClick={() => handleSelect(gateway)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all cursor-pointer
                  ${selected === gateway.id 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : gateway.comingSoon 
                      ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(gateway.icon)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{gateway.displayName}</h4>
                      {gateway.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Recommended
                        </span>
                      )}
                      {gateway.comingSoon && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{gateway.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {gateway.supportsUpi && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          <Smartphone className="w-3 h-3" />
                          UPI
                        </span>
                      )}
                      {gateway.supportsCards && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          <CreditCard className="w-3 h-3" />
                          Cards
                        </span>
                      )}
                      {gateway.supportsNetbanking && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          <Building2 className="w-3 h-3" />
                          Net Banking
                        </span>
                      )}
                      {gateway.supportsWallets && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          <Wallet className="w-3 h-3" />
                          Wallets
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {selected === gateway.id && gateway.isActive ? (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    ) : gateway.isActive ? (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-xs text-gray-600">
              Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
