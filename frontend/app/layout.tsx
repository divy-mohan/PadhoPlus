import type { Metadata } from 'next'
import './globals.css'
import PageProgressBar from '@/components/PageProgressBar'
import SkeletonLoader from '@/components/SkeletonLoader'
import { SkeletonProvider } from '@/context/SkeletonContext'
import { AuthProvider } from '@/context/AuthContext'

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
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      </head>
      <body>
        <AuthProvider>
          <SkeletonProvider>
            <PageProgressBar />
            <SkeletonLoader />
            {children}
          </SkeletonProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
