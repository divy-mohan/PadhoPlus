'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string | number
  duration?: number
}

export default function AnimatedCounter({ value, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Extract numeric value from string (e.g., "10,000+" -> 10000)
    const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''))
    
    let startTime: number | null = null
    let animationFrameId: number

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuad = 1 - Math.pow(1 - progress, 2)
      const currentValue = Math.floor(numericValue * easeOutQuad)

      // Format the number with comma
      const formatted = currentValue.toLocaleString()
      
      // Add the suffix back (e.g., "+")
      const suffix = String(value).replace(/[0-9,]/g, '')
      setDisplayValue(formatted + suffix)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isVisible, value, duration])

  return (
    <div ref={elementRef}>
      {displayValue}
    </div>
  )
}
