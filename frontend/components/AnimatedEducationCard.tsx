'use client'

import { ReactNode } from 'react'

interface AnimatedEducationCardProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: 'primary' | 'success' | 'warning' | 'info'
}

export default function AnimatedEducationCard({ 
  children, 
  delay = 0, 
  className = '',
  variant = 'primary'
}: AnimatedEducationCardProps) {
  const variantClasses = {
    primary: 'before:from-blue-500 to-blue-500',
    success: 'before:from-green-500 to-green-500',
    warning: 'before:from-yellow-500 to-yellow-500',
    info: 'before:from-purple-500 to-purple-500'
  }

  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative group">
        {/* Gradient Border Animation */}
        <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-md group-hover:blur-lg transition-all duration-500 rounded-xl ${variantClasses[variant]}`}></div>
        
        {/* Card Content */}
        <div className="relative bg-white rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {children}
        </div>
      </div>
    </div>
  )
}
