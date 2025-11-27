'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BootstrapIcon } from '@/components/BootstrapIcon'

const SUBJECTS = [
  { id: 'physics', name: 'Physics', icon: 'lightbulb', color: 'bg-blue-100 text-blue-600' },
  { id: 'chemistry', name: 'Chemistry', icon: 'flask', color: 'bg-green-100 text-green-600' },
  { id: 'biology', name: 'Biology', icon: 'heart-pulse', color: 'bg-red-100 text-red-600' },
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator', color: 'bg-purple-100 text-purple-600' },
]

const STATUS_OPTIONS = [
  { id: '', label: 'All Status', icon: 'collection' },
  { id: 'pending', label: 'Pending', icon: 'clock', color: 'text-yellow-600' },
  { id: 'in_progress', label: 'In Progress', icon: 'hourglass-split', color: 'text-blue-600' },
  { id: 'answered', label: 'Answered', icon: 'check-circle', color: 'text-green-600' },
]

const SORT_OPTIONS = [
  { id: '-created_at', label: 'Newest First' },
  { id: 'created_at', label: 'Oldest First' },
  { id: '-upvotes', label: 'Most Upvoted' },
  { id: '-views_count', label: 'Most Viewed' },
]

function BrowseContent() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState(subjectParam || '')
  const [status, setStatus] = useState('')
  const [sortBy, setSortBy] = useState('-created_at')
  const [loading, setLoading] = useState(true)
  const [doubts, setDoubts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const fetchDoubts = useCallback(async (resetPage = false) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedSubject) params.append('subject', selectedSubject)
      if (searchTerm) params.append('search', searchTerm)
      if (status) params.append('status', status)
      params.append('ordering', sortBy)
      params.append('page', resetPage ? '1' : page.toString())
      
      const response = await fetch(`/backend/api/doubts/?${params.toString()}`, { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        const results = data.results || data || []
        if (resetPage) {
          setDoubts(results)
          setPage(1)
        } else {
          setDoubts(prev => page === 1 ? results : [...prev, ...results])
        }
        setHasMore(!!data.next)
        setTotalCount(data.count || results.length)
      }
    } catch (error) {
      console.error('Error fetching doubts:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedSubject, searchTerm, status, sortBy, page])

  useEffect(() => {
    fetchDoubts(true)
  }, [selectedSubject, status, sortBy])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm !== '') fetchDoubts(true)
    }, 500)
    return () => clearTimeout(debounce)
  }, [searchTerm])

  useEffect(() => {
    if (page > 1) fetchDoubts()
  }, [page])

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(prev => prev === subjectId ? '' : subjectId)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSubject('')
    setStatus('')
    setSortBy('-created_at')
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

  const getStatusBadge = (doubtStatus: string) => {
    switch (doubtStatus) {
      case 'answered':
        return { bg: 'bg-green-100 text-green-700', icon: 'check-circle-fill', label: 'Answered' }
      case 'in_progress':
        return { bg: 'bg-blue-100 text-blue-700', icon: 'hourglass-split', label: 'In Progress' }
      case 'closed':
        return { bg: 'bg-gray-100 text-gray-700', icon: 'x-circle', label: 'Closed' }
      default:
        return { bg: 'bg-yellow-100 text-yellow-700', icon: 'clock', label: 'Pending' }
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Browse', href: '/doubt/browse' }
      ]} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BootstrapIcon name="search" className="text-blue-600" />
              Browse Questions
            </h1>
            <p className="text-gray-600 mt-1">
              {totalCount > 0 ? `Found ${totalCount} questions` : 'Find answers to common doubts'}
            </p>
          </div>
          <Link 
            href="/doubt/ask"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <BootstrapIcon name="plus-circle" className="text-lg" />
            Ask New Doubt
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BootstrapIcon name="funnel" className="text-blue-600" />
              Filters
            </h2>
            {(selectedSubject || status || searchTerm) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <BootstrapIcon name="x-circle" />
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="relative">
              <BootstrapIcon name="search" className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search questions by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSubjectClick(s.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubject === s.id
                      ? `${s.color} ring-2 ring-current ring-offset-2`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BootstrapIcon name={s.icon} />
                  {s.name}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <div className="flex gap-1">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setStatus(opt.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        status === opt.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading && doubts.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : doubts.length > 0 ? (
          <>
            <div className="space-y-4">
              {doubts.map((doubt: any) => {
                const statusBadge = getStatusBadge(doubt.status)
                return (
                  <Link key={doubt.id} href={`/doubt/answer/${doubt.id}`} className="group block">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="hidden sm:flex flex-col items-center gap-1 min-w-[60px] text-center">
                          <div className="text-xl font-bold text-gray-900">{doubt.upvotes || 0}</div>
                          <div className="text-xs text-gray-500">votes</div>
                          <div className={`mt-2 text-lg font-semibold ${doubt.response_count > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            {doubt.response_count || 0}
                          </div>
                          <div className="text-xs text-gray-500">answers</div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            {doubt.subject_name && (
                              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                                SUBJECTS.find(s => s.id === doubt.subject?.slug || s.name === doubt.subject_name)?.color || 'bg-gray-100 text-gray-600'
                              }`}>
                                {doubt.subject_name}
                              </span>
                            )}
                            {doubt.topic_name && (
                              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                {doubt.topic_name}
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full ${statusBadge.bg}`}>
                              <BootstrapIcon name={statusBadge.icon} className="text-xs" />
                              {statusBadge.label}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2 mb-2">
                            {doubt.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {doubt.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <BootstrapIcon name="person" />
                              {doubt.student_name || 'Student'}
                            </span>
                            <span className="flex items-center gap-1">
                              <BootstrapIcon name="clock" />
                              {formatTimeAgo(doubt.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <BootstrapIcon name="eye" />
                              {doubt.views_count || 0} views
                            </span>
                            <div className="sm:hidden flex items-center gap-3 ml-auto">
                              <span className="flex items-center gap-1">
                                <BootstrapIcon name="hand-thumbs-up" />
                                {doubt.upvotes || 0}
                              </span>
                              <span className="flex items-center gap-1">
                                <BootstrapIcon name="chat-dots" />
                                {doubt.response_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <BootstrapIcon name="arrow-down-circle" className="text-lg" />
                      Load More Questions
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BootstrapIcon name="search" className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or be the first to ask!</p>
            <Link
              href="/doubt/ask"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
            >
              <BootstrapIcon name="plus-circle" />
              Ask a Question
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowseContent />
    </Suspense>
  )
}
