'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { BootstrapIcon } from '@/components/BootstrapIcon'
import { useAuth } from '@/context/AuthContext'

const SUBJECTS = [
  { id: 'physics', name: 'Physics', color: 'from-blue-600 to-cyan-500', icon: 'lightbulb', bgColor: 'bg-blue-100' },
  { id: 'chemistry', name: 'Chemistry', color: 'from-green-600 to-emerald-500', icon: 'flask', bgColor: 'bg-green-100' },
  { id: 'biology', name: 'Biology', color: 'from-red-600 to-pink-500', icon: 'heart-pulse', bgColor: 'bg-red-100' },
  { id: 'mathematics', name: 'Mathematics', color: 'from-purple-600 to-pink-500', icon: 'calculator', bgColor: 'bg-purple-100' },
]

interface Doubt {
  id: number
  title: string
  description: string
  subject_name?: string
  topic_name?: string
  student_name?: string
  status: string
  status_display?: string
  upvotes: number
  views_count: number
  response_count: number
  created_at: string
}

export default function DoubtPage() {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<'browse' | 'myDoubts'>('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [recentDoubts, setRecentDoubts] = useState<Doubt[]>([])
  const [myDoubts, setMyDoubts] = useState<Doubt[]>([])
  const [loading, setLoading] = useState(true)
  const [myDoubtsLoading, setMyDoubtsLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0, answered: 0, pending: 0 })

  useEffect(() => {
    fetchRecentDoubts()
  }, [])

  useEffect(() => {
    if (activeTab === 'myDoubts' && isAuthenticated) {
      fetchMyDoubts()
    }
  }, [activeTab, isAuthenticated])

  const fetchRecentDoubts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/backend/api/doubts/?ordering=-created_at&limit=6', { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        const results = data.results || data || []
        setRecentDoubts(results)
        
        const answeredCount = results.filter((d: Doubt) => d.status === 'answered' || d.status === 'closed').length
        setStats({
          total: data.count || results.length,
          answered: answeredCount,
          pending: results.length - answeredCount
        })
      }
    } catch (error) {
      console.error('Error fetching doubts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyDoubts = async () => {
    setMyDoubtsLoading(true)
    try {
      const response = await fetch('/backend/api/doubts/my_doubts/', { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        setMyDoubts(data.results || data || [])
      }
    } catch (error) {
      console.error('Error fetching my doubts:', error)
    } finally {
      setMyDoubtsLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'answered':
        return { bg: 'bg-green-100 text-green-700', icon: 'check-circle-fill', label: 'Answered' }
      case 'in_progress':
        return { bg: 'bg-blue-100 text-blue-700', icon: 'hourglass-split', label: 'In Progress' }
      case 'closed':
        return { bg: 'bg-gray-100 text-gray-700', icon: 'check-circle', label: 'Resolved' }
      default:
        return { bg: 'bg-yellow-100 text-yellow-700', icon: 'clock', label: 'Pending' }
    }
  }

  const filteredDoubts = searchTerm 
    ? recentDoubts.filter(d => 
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recentDoubts

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Doubt Portal', href: '/doubt' }]} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-4 shadow-lg">
            <BootstrapIcon name="chat-dots" className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Doubt Portal</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get instant answers from expert faculty. Ask anything, clear everything!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Link 
            href="/doubt/ask" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <BootstrapIcon name="plus-circle" className="text-xl" />
            Ask a New Doubt
          </Link>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <BootstrapIcon name="lightning-charge" className="text-yellow-500" />
            Average response time: <span className="font-semibold text-blue-600">15 minutes</span>
          </p>
        </div>

        <div className="flex gap-2 mb-8 border-b border-gray-200 justify-center">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 rounded-t-xl ${
              activeTab === 'browse' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <BootstrapIcon name="search" className="text-lg" />
            Browse & Search
          </button>
          <button
            onClick={() => setActiveTab('myDoubts')}
            className={`px-6 py-3 font-semibold transition-all flex items-center gap-2 rounded-t-xl ${
              activeTab === 'myDoubts' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <BootstrapIcon name="bookmark" className="text-lg" />
            My Doubts
            {myDoubts.length > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">{myDoubts.length}</span>
            )}
          </button>
        </div>

        {activeTab === 'browse' && (
          <div className="space-y-10">
            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <BootstrapIcon name="search" className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search doubts by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              <Link 
                href="/doubt/browse"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-sm"
              >
                <BootstrapIcon name="sliders" />
                Advanced Filters
              </Link>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <BootstrapIcon name="collection" className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Browse by Subject</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SUBJECTS.map(subject => (
                  <Link 
                    key={subject.id} 
                    href={`/doubt/browse?subject=${subject.id}`} 
                    className="group relative"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${subject.color} rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition-all duration-500`}></div>
                    <div className="relative bg-white rounded-2xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all group-hover:border-transparent">
                      <div className={`w-16 h-16 ${subject.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <BootstrapIcon name={subject.icon} className="text-3xl" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{subject.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <BootstrapIcon name="arrow-right" className="text-xs group-hover:translate-x-1 transition-transform" />
                        Browse doubts
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <BootstrapIcon name="clock-history" className="text-2xl text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
                </div>
                <Link 
                  href="/doubt/browse" 
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  View all
                  <BootstrapIcon name="arrow-right" />
                </Link>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredDoubts.length > 0 ? (
                <div className="grid gap-4">
                  {filteredDoubts.slice(0, 6).map(doubt => {
                    const statusBadge = getStatusBadge(doubt.status)
                    return (
                      <Link key={doubt.id} href={`/doubt/answer/${doubt.id}`} className="group block">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {doubt.subject_name && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                {doubt.subject_name}
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${statusBadge.bg}`}>
                              <BootstrapIcon name={statusBadge.icon} className="text-xs" />
                              {statusBadge.label}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition line-clamp-2">
                            {doubt.title}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doubt.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <BootstrapIcon name="person" />
                                {doubt.student_name || 'Student'}
                              </span>
                              <span className="flex items-center gap-1">
                                <BootstrapIcon name="clock" />
                                {formatTimeAgo(doubt.created_at)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <BootstrapIcon name="hand-thumbs-up" />
                                {doubt.upvotes || 0}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-gray-700">
                                <BootstrapIcon name="chat-dots" />
                                {doubt.response_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <BootstrapIcon name="search" className="text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-600">No doubts found. Be the first to ask!</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border border-blue-200">
                <BootstrapIcon name="chat-dots" className="block mx-auto mb-2 text-3xl text-blue-600" />
                <p className="text-3xl font-bold text-gray-900">{stats.total > 0 ? `${Math.round(stats.total / 100) * 100}+` : '2.5K+'}</p>
                <p className="text-sm text-gray-600">Questions Asked</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border border-green-200">
                <BootstrapIcon name="check-circle" className="block mx-auto mb-2 text-3xl text-green-600" />
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Questions Answered</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border border-purple-200">
                <BootstrapIcon name="lightning-charge" className="block mx-auto mb-2 text-3xl text-purple-600" />
                <p className="text-3xl font-bold text-gray-900">Avg 15m</p>
                <p className="text-sm text-gray-600">Response Time</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center border border-orange-200">
                <BootstrapIcon name="people" className="block mx-auto mb-2 text-3xl text-orange-600" />
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Expert Mentors</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'myDoubts' && (
          <div className="max-w-4xl mx-auto">
            {!isAuthenticated ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BootstrapIcon name="person-lock" className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
                <p className="text-gray-600 mb-6">Please login to view your doubts and track their status.</p>
                <Link 
                  href="/login?redirect=/doubt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  <BootstrapIcon name="box-arrow-in-right" />
                  Login to Continue
                </Link>
              </div>
            ) : myDoubtsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : myDoubts.length > 0 ? (
              <div className="space-y-4">
                {myDoubts.map(doubt => {
                  const statusBadge = getStatusBadge(doubt.status)
                  return (
                    <Link key={doubt.id} href={`/doubt/answer/${doubt.id}`} className="group block">
                      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition-all">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {doubt.subject_name && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                  {doubt.subject_name}
                                </span>
                              )}
                              <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${statusBadge.bg}`}>
                                <BootstrapIcon name={statusBadge.icon} className="text-xs" />
                                {statusBadge.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                              {doubt.title}
                            </h3>
                          </div>
                          <BootstrapIcon name="chevron-right" className="text-gray-400 group-hover:text-blue-600 transition ml-4" />
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span>{formatTimeAgo(doubt.created_at)}</span>
                          <span>{doubt.response_count || 0} answers</span>
                          <span>{doubt.views_count || 0} views</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <BootstrapIcon name="bookmark" className="text-5xl text-blue-300" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <BootstrapIcon name="plus" className="text-xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Doubts Yet</h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  You haven't asked any doubts yet. Start by asking your first question!
                </p>
                <Link 
                  href="/doubt/ask" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                  <BootstrapIcon name="plus-circle" />
                  Ask Your First Doubt
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
          </div>
          <div className="relative">
            <BootstrapIcon name="rocket-takeoff" className="block mx-auto mb-4 text-5xl" />
            <h2 className="text-3xl font-bold mb-3">Start Clearing Your Doubts Today</h2>
            <p className="mb-8 text-blue-100 max-w-lg mx-auto">
              Join thousands of students getting expert help instantly. Your success is just one question away!
            </p>
            <Link 
              href="/doubt/ask" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              <BootstrapIcon name="pencil-square" className="text-lg" />
              Post Your Doubt Now
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
