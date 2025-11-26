'use client'

import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface LoadingButtonProps {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  variant?: 'primary' | 'outline' | 'secondary'
}

export default function LoadingButton({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary'
}: LoadingButtonProps) {
  const baseStyles = 'w-full transition-all duration-200 flex items-center justify-center gap-2'
  
  const variantStyles = {
    primary: 'btn btn-primary',
    outline: 'btn btn-outline',
    secondary: 'btn btn-secondary'
  }

  const buttonClassName = `${baseStyles} ${variantStyles[variant]} ${className} ${
    (loading || disabled) ? 'opacity-75 cursor-not-allowed' : ''
  }`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={buttonClassName}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      <span>{children}</span>
    </button>
  )
}
