'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ThumbsUp, MessageCircle, Clock, User, CheckCircle } from 'lucide-react'

export default function AnswerPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null)
  const [doubt, setDoubt] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [helpful, setHelpful] = useState(false)

  useEffect(() => {
    params.then(p => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!id) return
    const fetchDoubt = async () => {
      try {
        const response = await fetch(
          `http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api/doubts/${id}/`,
          { credentials: 'include' }
        )
        if (response.ok) {
          setDoubt(await response.json())
        }
      } catch (error) {
        console.error('Error fetching doubt:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoubt()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!doubt) return <div className="min-h-screen flex items-center justify-center">Question not found</div>

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Question', href: '/doubt/answer/' + id }
      ]} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Question */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-gray-200 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-2">
              {doubt.subject && <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">{doubt.subject}</span>}
              {doubt.difficulty && (
                <span className={`px-3 py-1 text-xs font-semibold rounded ${
                  doubt.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                  doubt.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {doubt.difficulty.charAt(0).toUpperCase() + doubt.difficulty.slice(1)}
                </span>
              )}
            </div>
            {doubt.status === 'answered' && (
              <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                <CheckCircle className="w-4 h-4" />
                Answered
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{doubt.title || doubt.question}</h1>
          <p className="text-gray-700 text-lg mb-6">{doubt.description || doubt.question}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{doubt.asker_name || 'Student'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(doubt.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Answer */}
        {doubt.answers && doubt.answers.length > 0 ? (
          <div className="space-y-6">
            {doubt.answers.map((answer: any, idx: number) => (
              <div key={idx} className="bg-green-50 border border-green-200 rounded-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    Expert Answer
                  </h2>
                </div>
                <p className="text-green-900 text-lg leading-relaxed mb-6">{answer.answer}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-green-200 text-sm text-green-700">
                  <span className="font-semibold">Answered by {answer.answered_by || 'Faculty'}</span>
                  <span>{new Date(answer.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Clock className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <p className="text-yellow-900 font-semibold">Answer Pending</p>
            <p className="text-yellow-700 text-sm mt-2">Our experts are working on this. Check back soon!</p>
          </div>
        )}

        {/* Helpful */}
        <div className="mt-12 p-8 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Was this answer helpful?</h3>
              <p className="text-gray-600">Your feedback helps us improve our service</p>
            </div>
            <button
              onClick={() => setHelpful(!helpful)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${
                helpful
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              {helpful ? 'Helpful!' : 'Mark Helpful'}
            </button>
          </div>
        </div>

        {/* Follow-up */}
        <div className="mt-8 p-8 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Have more questions?
          </h3>
          <p className="text-gray-700 mb-4">Ask a follow-up question or explore related doubts</p>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Ask Follow-up
            </button>
            <button className="px-6 py-2 bg-white border border-blue-300 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
              View Related Questions
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
