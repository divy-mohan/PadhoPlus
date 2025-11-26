'use client'

import { useEffect, useRef } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  type?: 'fade-up' | 'slide-left' | 'slide-right' | 'zoom-in' | 'rotate-in' | 'blur-fade'
  delay?: number
}

export default function ScrollAnimation({ children, type = 'fade-up', delay = 0 }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in')
              if (type !== 'fade-up') {
                entry.target.classList.add(type)
              }
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [type, delay])

  return (
    <div ref={ref} className={`scroll-${type}`}>
      {children}
    </div>
  )
}
