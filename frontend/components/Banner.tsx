import { X } from 'lucide-react'
import { useState } from 'react'

interface BannerProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  closable?: boolean
  icon?: React.ReactNode
}

const bannerColors = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  error: 'bg-red-50 border-red-200 text-red-900',
}

export default function Banner({ 
  message, 
  type = 'info', 
  closable = true,
  icon 
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className={`border ${bannerColors[type]} px-4 py-3 rounded-lg flex items-start gap-3 mb-4`}>
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <p className="flex-1 text-sm font-medium">{message}</p>
      {closable && (
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
