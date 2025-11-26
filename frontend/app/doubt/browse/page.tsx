'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Search, Filter, TrendingUp } from 'lucide-react'

function BrowseContent() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [doubts, setDoubts] = useState<any[]>([])

  useEffect(() => {
    fetchDoubts()
  }, [subjectParam, searchTerm, difficulty, status])

  const fetchDoubts = async () => {
    setLoading(true)
    try {
      let url = 'http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api/doubts/?'
      const params = new URLSearchParams()
      if (subjectParam) params.append('subject', subjectParam)
      if (searchTerm) params.append('search', searchTerm)
      if (difficulty) params.append('difficulty', difficulty)
      if (status) params.append('status', status)
      
      const response = await fetch(url + params.toString(), { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        setDoubts(data.results || data || [])
      }
    } catch (error) {
      console.error('Error fetching doubts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Browse', href: '/doubt/browse' }
      ]} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Browse Questions</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {doubts.length > 0 ? (
            doubts.map((doubt: any) => (
              <Link key={doubt.id} href={`/doubt/answer/${doubt.id}`} className="group block">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-2">
                        {doubt.subject && <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">{doubt.subject}</span>}
                        {doubt.difficulty && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            doubt.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                            doubt.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {doubt.difficulty.charAt(0).toUpperCase() + doubt.difficulty.slice(1)}
                          </span>
                        )}
                        {doubt.status && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            doubt.status === 'answered' ? 'bg-green-100 text-green-600' :
                            doubt.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {doubt.title || doubt.question}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doubt.description || doubt.question}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{doubt.asker_name || 'Student'} • {new Date(doubt.created_at).toLocaleDateString()}</span>
                    <span className="font-semibold text-gray-700">{doubt.answers?.length || 0} answers</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-lg">No questions found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
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
