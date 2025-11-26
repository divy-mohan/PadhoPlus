'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SkeletonContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const SkeletonContext = createContext<SkeletonContextType | undefined>(undefined)

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Auto-hide skeleton after page load
    const handleRouteChangeComplete = () => {
      setIsLoading(false)
    }

    // Add slight delay to ensure page is truly ready
    const hideTimer = setTimeout(handleRouteChangeComplete, 300)

    return () => clearTimeout(hideTimer)
  }, [])

  return (
    <SkeletonContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </SkeletonContext.Provider>
  )
}

export function useSkeleton() {
  const context = useContext(SkeletonContext)
  if (!context) {
    throw new Error('useSkeleton must be used within SkeletonProvider')
  }
  return context
}
