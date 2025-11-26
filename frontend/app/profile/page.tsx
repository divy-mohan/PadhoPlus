'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { useSkeleton } from '@/context/SkeletonContext'
import { User, Mail, Zap, ShoppingBag, FileText, BarChart3, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { isLoading } = useSkeleton()
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated && user) {
      fetchProfileData()
    }
  }, [isAuthenticated, user, authLoading])

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setProfileData(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || authLoading || loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-500">Manage your account and view your learning history</p>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* User Card */}
          <div className="md:col-span-1 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.first_name} {user.last_name}</h2>
              <p className="text-sm text-slate-600 mb-6">{user.email}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Total Purchases</p>
                <ShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">{profileData?.purchases_count || 0}</h3>
              <p className="text-xs text-slate-500 mt-2">Active courses and batches</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Learning Time</p>
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">{profileData?.total_watch_time || 0}h</h3>
              <p className="text-xs text-slate-500 mt-2">Total hours on platform</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Enrolled Batches</p>
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">{profileData?.enrolled_batches || 0}</h3>
              <p className="text-xs text-slate-500 mt-2">Active courses</p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Member Since</p>
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{profileData?.member_since || 'Recently'}</h3>
              <p className="text-xs text-slate-500 mt-2">Account creation date</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchase History */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold text-slate-900">Purchase History</h3>
            </div>

            {profileData?.purchases && profileData.purchases.length > 0 ? (
              <div className="space-y-4">
                {profileData.purchases.map((purchase: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{purchase.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{purchase.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">Rs. {purchase.amount}</p>
                      <p className="text-xs text-green-600 mt-1">{purchase.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No purchases yet. Start learning with our courses!</p>
            )}
          </div>

          {/* Invoices & Documents */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-emerald-600" />
              <h3 className="text-2xl font-semibold text-slate-900">Invoices</h3>
            </div>

            {profileData?.invoices && profileData.invoices.length > 0 ? (
              <div className="space-y-2">
                {profileData.invoices.map((invoice: any, idx: number) => (
                  <a
                    key={idx}
                    href={invoice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-all group"
                  >
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors truncate">{invoice.name}</p>
                      <p className="text-xs text-slate-500">{invoice.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8 text-sm">No invoices available</p>
            )}
          </div>

          {/* Analytics */}
          <div className="lg:col-span-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-semibold text-slate-900">Learning Analytics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-2">Avg Daily Study</p>
                <p className="text-2xl font-bold text-slate-900">{profileData?.avg_daily_study || '0'}h</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-2">Completion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{profileData?.completion_rate || '0'}%</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-2">Courses Completed</p>
                <p className="text-2xl font-bold text-slate-900">{profileData?.courses_completed || '0'}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-2">Total Achievements</p>
                <p className="text-2xl font-bold text-slate-900">{profileData?.total_achievements || '0'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
