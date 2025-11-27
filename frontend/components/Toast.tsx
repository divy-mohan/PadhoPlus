'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { BootstrapIcon } from './BootstrapIcon'

interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

interface ToastContextType {
  showToast: (type: ToastMessage['type'], message: string, duration?: number) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((type: ToastMessage['type'], message: string, duration = 4000) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, type, message, duration }])
    
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
  }, [removeToast])

  const success = useCallback((message: string) => showToast('success', message), [showToast])
  const error = useCallback((message: string) => showToast('error', message), [showToast])
  const info = useCallback((message: string) => showToast('info', message), [showToast])
  const warning = useCallback((message: string) => showToast('warning', message), [showToast])

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onRemove }: { toasts: ToastMessage[], onRemove: (id: string) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }: { toast: ToastMessage, onRemove: (id: string) => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleRemove = () => {
    setIsVisible(false)
    setTimeout(() => onRemove(toast.id), 300)
  }

  const config = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'check-circle-fill',
      iconColor: 'text-green-600',
      textColor: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'x-circle-fill',
      iconColor: 'text-red-600',
      textColor: 'text-red-800'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'info-circle-fill',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-800'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'exclamation-triangle-fill',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-800'
    }
  }

  const c = config[toast.type]

  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-md transition-all duration-300 ${c.bg} ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      <BootstrapIcon name={c.icon} className={`text-xl ${c.iconColor}`} />
      <p className={`flex-1 text-sm font-medium ${c.textColor}`}>{toast.message}</p>
      <button 
        onClick={handleRemove}
        className={`p-1 rounded hover:bg-black/10 transition ${c.textColor}`}
      >
        <BootstrapIcon name="x" className="text-lg" />
      </button>
    </div>
  )
}
