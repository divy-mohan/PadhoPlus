'use client'

import { useSkeleton } from '@/context/SkeletonContext'
import { useRouter } from 'next/navigation'

export function useLoadingButton() {
  const { setIsLoading } = useSkeleton()
  const router = useRouter()

  const handleNavigation = (url: string) => {
    setIsLoading(true)
    setTimeout(() => {
      router.push(url)
    }, 100)
  }

  return { handleNavigation, setIsLoading }
}
