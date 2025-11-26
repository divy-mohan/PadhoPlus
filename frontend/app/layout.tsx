import type { Metadata } from 'next'
import './globals.css'
import PageProgressBar from '@/components/PageProgressBar'
import SkeletonLoader from '@/components/SkeletonLoader'
import { SkeletonProvider } from '@/context/SkeletonContext'

export const metadata: Metadata = {
  title: 'PadhoPlus - Online Education for JEE/NEET',
  description: 'Smart study platform for IIT/NEET preparation with quality content at lowest cost',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SkeletonProvider>
          <PageProgressBar />
          <SkeletonLoader />
          {children}
        </SkeletonProvider>
      </body>
    </html>
  )
}
