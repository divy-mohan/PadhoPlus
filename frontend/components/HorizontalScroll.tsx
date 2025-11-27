'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HorizontalScrollProps {
  children: React.ReactNode
  showArrows?: boolean
  className?: string
}

export default function HorizontalScroll({ 
  children, 
  showArrows = true,
  className = ''
}: HorizontalScrollProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 50)
    }
  }

  useEffect(() => {
    checkScroll()
    const timer = setTimeout(checkScroll, 100)
    window.addEventListener('resize', checkScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      if (direction === 'left') {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
      setTimeout(checkScroll, 600)
    }
  }

  return (
    <div className="relative group w-full">
      {/* Scroll hint indicator - shows on mobile when scrollable */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10 sm:hidden flex items-center justify-end pr-2">
          <div className="animate-pulse">
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={`flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide w-full ${className}`}
        style={{ 
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {children}
      </div>

      {showArrows && canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden sm:flex items-center justify-center border border-gray-200 hover:border-blue-400 hover:bg-blue-50"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {showArrows && canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden sm:flex items-center justify-center border border-gray-200 hover:border-blue-400 hover:bg-blue-50"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </div>
  )
}
