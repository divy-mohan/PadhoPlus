'use client'

import { useSkeleton } from '@/context/SkeletonContext'

export default function SkeletonLoader() {
  const { isLoading } = useSkeleton()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center pointer-events-auto">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-300 rounded-lg w-32 animate-pulse mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
