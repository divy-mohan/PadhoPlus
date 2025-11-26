'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { MessageCircle, Send, ThumbsUp, Clock } from 'lucide-react'

export default function DoubtPage() {
  const [doubts, setDoubts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newDoubt, setNewDoubt] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchDoubts()
  }, [])

  const fetchDoubts = async () => {
    try {
      const response = await fetch('http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api/doubts/', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setDoubts(data.results || data)
      }
    } catch (error) {
      console.error('Error fetching doubts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitDoubt = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDoubt.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch('http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api/doubts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ question: newDoubt })
      })

      if (response.ok) {
        setNewDoubt('')
        fetchDoubts()
        alert('Doubt posted successfully!')
      } else {
        alert('Failed to post doubt')
      }
    } catch (error) {
      console.error('Error posting doubt:', error)
      alert('Unable to post doubt')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Ask Doubts', href: '/doubt' }]} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <MessageCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ask Your Doubts</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Get instant answers from our expert faculty and community. Ask anything related to your studies.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ask Doubt Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200 sticky top-20">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Ask a Question</h2>
              <form onSubmit={handleSubmitDoubt} className="space-y-4">
                <textarea
                  value={newDoubt}
                  onChange={(e) => setNewDoubt(e.target.value)}
                  placeholder="Type your doubt here... Be specific for quick answers"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  rows={6}
                />
                <button
                  type="submit"
                  disabled={submitting || !newDoubt.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Posting...' : 'Post Question'}
                </button>
              </form>
            </div>
          </div>

          {/* Doubts List */}
          <div className="lg:col-span-2 space-y-4">
            {doubts.length > 0 ? (
              doubts.map((doubt) => (
                <div key={doubt.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{doubt.question}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-700">{doubt.asker_name || 'Student'}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {doubt.created_at ? new Date(doubt.created_at).toLocaleDateString() : 'Recently'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Answers */}
                  {doubt.answers && doubt.answers.length > 0 && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-900 mb-2">Expert Answer</h4>
                      <p className="text-sm text-green-800">{doubt.answers[0].answer}</p>
                      <p className="text-xs text-green-600 mt-2">Answered by {doubt.answers[0].answered_by || 'Faculty'}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful</span>
                      </button>
                      <span className="text-gray-500">{doubt.answers?.length || 0} Answers</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No questions yet</p>
                <p className="text-gray-500 text-sm mt-2">Be the first to ask a doubt!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
