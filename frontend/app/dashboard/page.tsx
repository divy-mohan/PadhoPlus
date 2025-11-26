'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSkeleton } from '@/context/SkeletonContext'
import { Clock, BookOpen, Zap, TrendingUp, Award, Target, Play } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { setIsLoading } = useSkeleton()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studentData, setStudentData] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard/')
        if (response.status === 401) {
          router.push('/login')
          return
        }
        
        const data = await response.json()
        if (data.success) {
          setStudentData(data.user)
          setEnrollments(data.enrollments)
          setAchievements(data.achievements)
          setIsLoading(false)
        } else {
          setError('Failed to load dashboard')
          setIsLoading(false)
        }
      } catch (err) {
        setError('Unable to load dashboard data')
        console.error(err)
        setIsLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [setIsLoading])

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <LoadingSpinner />
        </main>
      </div>
    )
  }

  if (error || !studentData) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg mb-4">{error || 'Failed to load dashboard'}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-gray-700">{studentData?.name || 'Student'}</span>
          </h1>
          <p className="text-gray-500 text-sm">Continue your learning journey with personalized insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: BookOpen, label: 'Enrolled Batches', value: studentData?.stats?.enrolledBatches || 0, color: 'text-blue-600' },
            { icon: Clock, label: 'Watch Time', value: `${studentData?.stats?.watchTime || 0}m`, color: 'text-purple-600' },
            { icon: Zap, label: 'Streak', value: `${studentData?.stats?.streak || 0}d`, color: 'text-amber-600' },
            { icon: Award, label: 'Achievements', value: studentData?.stats?.achievements || 0, color: 'text-emerald-600' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-semibold text-slate-900 mb-1">{stat.value}</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Batches */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Courses</h2>
          {enrollments && enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((batch, idx) => (
                <div key={batch.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{batch.thumbnail}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{batch.batchName}</h3>
                        <p className="text-sm text-slate-500">Last: {batch.lastAccessed}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      batch.progress > 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {batch.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-600">Progress</span>
                      <span className="text-sm font-semibold text-slate-700">{batch.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-500"
                        style={{ width: `${batch.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-all duration-200">
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No enrolled batches yet. <a href="/batches" className="text-slate-700 hover:underline font-medium">Explore batches</a></p>
          )}
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Achievements Unlocked</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((ach, idx) => (
                <div key={ach.id || idx}>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 text-center transition-all duration-300 border border-slate-200 hover:shadow-md">
                    <div className="text-4xl mx-auto mb-3">{ach.icon}</div>
                    <p className="text-sm font-semibold text-slate-900">{ach.name}</p>
                    <p className="text-xs text-slate-500 mt-2">{ach.earnedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
