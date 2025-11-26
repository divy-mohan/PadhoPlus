'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Clock, BookOpen, Zap, TrendingUp, Award, Target, Play } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
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
        } else {
          setError('Failed to load dashboard')
        }
      } catch (err) {
        setError('Unable to load dashboard data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

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
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{studentData?.name || 'Student'}</span>!
          </h1>
          <p className="text-gray-600">Continue your learning journey with personalized insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {[
            { icon: BookOpen, label: 'Enrolled Batches', value: studentData?.stats?.enrolledBatches || 0, color: 'from-blue-500 to-blue-600' },
            { icon: Clock, label: 'Watch Time', value: `${studentData?.stats?.watchTime || 0}m`, color: 'from-purple-500 to-purple-600' },
            { icon: Zap, label: 'Streak', value: `${studentData?.stats?.streak || 0}d`, color: 'from-orange-500 to-orange-600' },
            { icon: Award, label: 'Achievements', value: studentData?.stats?.achievements || 0, color: 'from-green-500 to-green-600' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300`}>
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className="w-8 h-8 opacity-80" />
                  <TrendingUp className="w-5 h-5 opacity-50" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Batches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
          {enrollments && enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((batch, idx) => (
                <div key={batch.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{batch.thumbnail}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{batch.batchName}</h3>
                        <p className="text-sm text-gray-500">Last: {batch.lastAccessed}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      batch.progress > 70 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {batch.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-blue-600">{batch.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                        style={{ width: `${batch.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Continue Learning →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No enrolled batches yet. <a href="/batches" className="text-blue-600 hover:underline">Explore batches</a></p>
          )}
        </div>

        {/* Achievements Section */}
        {achievements && achievements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements Unlocked</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {achievements.map((ach, idx) => (
                <div key={ach.id || idx}>
                  <div className={`rounded-2xl p-6 text-center transition-all duration-300 bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300 hover:scale-110`}>
                    <div className="text-4xl mx-auto mb-2">{ach.icon}</div>
                    <p className="text-sm font-semibold text-gray-900">{ach.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{ach.earnedAt}</p>
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
