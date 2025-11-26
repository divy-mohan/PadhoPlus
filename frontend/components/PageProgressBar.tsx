'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Start progress on route change
    setProgress(10)
    setIsVisible(true)

    // Simulate progress increment
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 30
        }
        return prev
      })
    }, 500)

    return () => clearInterval(interval)
  }, [pathname, searchParams])

  // Complete progress when DOM is ready
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(100)
        const hideTimer = setTimeout(() => {
          setIsVisible(false)
          setProgress(0)
        }, 300)
        return () => clearTimeout(hideTimer)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out z-[10000] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: `${progress}%`,
      }}
    />
  )
}
