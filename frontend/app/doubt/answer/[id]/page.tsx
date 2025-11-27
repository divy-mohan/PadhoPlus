'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BootstrapIcon } from '@/components/BootstrapIcon'
import { useAuth } from '@/context/AuthContext'

interface DoubtResponse {
  id: number
  responder: { id: number; full_name: string; role: string }
  content: string
  image?: string
  is_accepted: boolean
  upvotes: number
  created_at: string
}

interface Doubt {
  id: number
  title: string
  description: string
  image?: string
  student: { id: number; full_name: string }
  subject: { id: number; name: string; slug: string }
  topic?: { id: number; name: string }
  status: string
  priority: string
  is_resolved: boolean
  upvotes: number
  views_count: number
  responses: DoubtResponse[]
  created_at: string
}

export default function AnswerPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()
  const [id, setId] = useState<string | null>(null)
  const [doubt, setDoubt] = useState<Doubt | null>(null)
  const [loading, setLoading] = useState(true)
  const [userVote, setUserVote] = useState(false)
  const [answerText, setAnswerText] = useState('')
  const [submittingAnswer, setSubmittingAnswer] = useState(false)
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const [relatedDoubts, setRelatedDoubts] = useState<any[]>([])

  useEffect(() => {
    params.then(p => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!id) return
    fetchDoubt()
    fetchRelatedDoubts()
  }, [id])

  const fetchDoubt = async () => {
    try {
      const response = await fetch(`/backend/api/doubts/${id}/`, { credentials: 'include' })
      if (response.ok) {
        setDoubt(await response.json())
      }
    } catch (error) {
      console.error('Error fetching doubt:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedDoubts = async () => {
    try {
      const response = await fetch(`/backend/api/doubts/?limit=3`, { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        setRelatedDoubts((data.results || data || []).filter((d: any) => d.id.toString() !== id).slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching related doubts:', error)
    }
  }

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/doubt/answer/' + id)
      return
    }
    try {
      const response = await fetch(`/backend/api/doubts/${id}/upvote/`, {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setUserVote(data.upvoted)
        if (doubt) {
          setDoubt({ ...doubt, upvotes: data.upvotes })
        }
      }
    } catch (error) {
      console.error('Error upvoting:', error)
    }
  }

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!answerText.trim() || !isAuthenticated) return

    setSubmittingAnswer(true)
    try {
      const response = await fetch('/backend/api/doubt-responses/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doubt: parseInt(id!),
          content: answerText.trim()
        })
      })
      if (response.ok) {
        setAnswerText('')
        setShowAnswerForm(false)
        fetchDoubt()
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
    } finally {
      setSubmittingAnswer(false)
    }
  }

  const handleAcceptAnswer = async (responseId: number) => {
    try {
      const response = await fetch(`/backend/api/doubt-responses/${responseId}/accept/`, {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        fetchDoubt()
      }
    } catch (error) {
      console.error('Error accepting answer:', error)
    }
  }

  const handleUpvoteResponse = async (responseId: number) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/doubt/answer/' + id)
      return
    }
    try {
      const response = await fetch(`/backend/api/doubt-responses/${responseId}/upvote/`, {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        fetchDoubt()
      }
    } catch (error) {
      console.error('Error upvoting response:', error)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
    return date.toLocaleDateString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'answered':
        return { bg: 'bg-green-100 text-green-700 border-green-200', icon: 'check-circle-fill', label: 'Answered' }
      case 'in_progress':
        return { bg: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'hourglass-split', label: 'In Progress' }
      case 'closed':
        return { bg: 'bg-gray-100 text-gray-700 border-gray-200', icon: 'x-circle-fill', label: 'Resolved' }
      default:
        return { bg: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: 'clock-fill', label: 'Pending' }
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-100 text-red-700', label: 'High Priority' }
      case 'medium':
        return { bg: 'bg-yellow-100 text-yellow-700', label: 'Medium' }
      default:
        return { bg: 'bg-green-100 text-green-700', label: 'Low' }
    }
  }

  if (loading) return <LoadingSpinner />
  
  if (!doubt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BootstrapIcon name="question-circle" className="text-4xl text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Question Not Found</h2>
          <p className="text-gray-600 mb-6">This question may have been deleted or doesn't exist.</p>
          <Link href="/doubt" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
            <BootstrapIcon name="arrow-left" />
            Back to Doubt Portal
          </Link>
        </div>
      </div>
    )
  }

  const statusBadge = getStatusBadge(doubt.status)
  const priorityBadge = getPriorityBadge(doubt.priority)
  const isOwner = user && doubt.student && user.id === doubt.student.id

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Question', href: `/doubt/answer/${id}` }
      ]} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {doubt.subject && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {doubt.subject.name}
                    </span>
                  )}
                  {doubt.topic && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                      {doubt.topic.name}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full border ${statusBadge.bg}`}>
                    <BootstrapIcon name={statusBadge.icon} />
                    {statusBadge.label}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${priorityBadge.bg}`}>
                    {priorityBadge.label}
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">{doubt.title}</h1>
                
                <div className="prose prose-gray max-w-none mb-6">
                  <p className="text-gray-700 whitespace-pre-wrap">{doubt.description}</p>
                </div>

                {doubt.image && (
                  <div className="mb-6">
                    <img 
                      src={doubt.image} 
                      alt="Question attachment" 
                      className="max-w-full h-auto rounded-xl border border-gray-200"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {(doubt.student?.full_name || 'S').charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">{doubt.student?.full_name || 'Student'}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <BootstrapIcon name="clock" />
                      {formatTimeAgo(doubt.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BootstrapIcon name="eye" />
                      {doubt.views_count} views
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <button 
                      onClick={handleUpvote}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        userVote 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <BootstrapIcon name={userVote ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'} />
                      <span>{doubt.upvotes}</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                      <BootstrapIcon name="share" className="text-lg" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
                      <BootstrapIcon name="bookmark" className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BootstrapIcon name="chat-dots" className="text-blue-600" />
                  {doubt.responses?.length || 0} Answers
                </h2>
                {isAuthenticated && !showAnswerForm && (
                  <button
                    onClick={() => setShowAnswerForm(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
                  >
                    <BootstrapIcon name="pencil" />
                    Write Answer
                  </button>
                )}
              </div>

              {showAnswerForm && (
                <form onSubmit={handleSubmitAnswer} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BootstrapIcon name="pencil-square" className="text-blue-600" />
                    Your Answer
                  </h3>
                  <textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Write your detailed answer here. Include explanations, formulas, or step-by-step solutions..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
                    maxLength={10000}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{answerText.length}/10000</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setShowAnswerForm(false); setAnswerText('') }}
                        className="px-4 py-2 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!answerText.trim() || submittingAnswer}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {submittingAnswer ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Posting...
                          </>
                        ) : (
                          <>
                            <BootstrapIcon name="send" />
                            Post Answer
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {doubt.responses && doubt.responses.length > 0 ? (
                <div className="space-y-4">
                  {doubt.responses
                    .sort((a, b) => (b.is_accepted ? 1 : 0) - (a.is_accepted ? 1 : 0))
                    .map((response) => (
                    <div 
                      key={response.id} 
                      className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                        response.is_accepted ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-200'
                      }`}
                    >
                      {response.is_accepted && (
                        <div className="bg-green-50 px-6 py-2 border-b border-green-200 flex items-center gap-2">
                          <BootstrapIcon name="check-circle-fill" className="text-green-600" />
                          <span className="text-green-800 font-medium text-sm">Accepted Answer</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="prose prose-gray max-w-none mb-4">
                          <p className="text-gray-700 whitespace-pre-wrap">{response.content}</p>
                        </div>

                        {response.image && (
                          <div className="mb-4">
                            <img 
                              src={response.image} 
                              alt="Answer attachment" 
                              className="max-w-full h-auto rounded-xl border border-gray-200"
                            />
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {(response.responder?.full_name || 'F').charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">{response.responder?.full_name || 'Faculty'}</span>
                                {response.responder?.role === 'teacher' && (
                                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">Expert</span>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{formatTimeAgo(response.created_at)}</span>
                          </div>

                          <div className="flex items-center gap-2 mt-3 sm:mt-0">
                            <button 
                              onClick={() => handleUpvoteResponse(response.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                            >
                              <BootstrapIcon name="hand-thumbs-up" />
                              {response.upvotes}
                            </button>
                            {isOwner && !response.is_accepted && !doubt.is_resolved && (
                              <button
                                onClick={() => handleAcceptAnswer(response.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium"
                              >
                                <BootstrapIcon name="check-circle" />
                                Accept
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BootstrapIcon name="clock" className="text-3xl text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Answers Yet</h3>
                  <p className="text-gray-600 mb-6">Our experts are working on this. Be the first to help!</p>
                  {isAuthenticated ? (
                    <button
                      onClick={() => setShowAnswerForm(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                    >
                      <BootstrapIcon name="pencil" />
                      Write an Answer
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                    >
                      <BootstrapIcon name="box-arrow-in-right" />
                      Login to Answer
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BootstrapIcon name="lightbulb" className="text-blue-600" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  href="/doubt/ask"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition">
                    <BootstrapIcon name="plus-circle" className="text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">Ask Follow-up</span>
                </Link>
                <Link
                  href="/doubt/browse"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition">
                    <BootstrapIcon name="search" className="text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-700">Browse More</span>
                </Link>
              </div>
            </div>

            {relatedDoubts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BootstrapIcon name="link-45deg" className="text-blue-600" />
                  Related Questions
                </h3>
                <div className="space-y-3">
                  {relatedDoubts.map((rd: any) => (
                    <Link
                      key={rd.id}
                      href={`/doubt/answer/${rd.id}`}
                      className="block p-3 rounded-xl hover:bg-gray-50 transition group"
                    >
                      <h4 className="font-medium text-gray-800 text-sm line-clamp-2 group-hover:text-blue-600 transition">
                        {rd.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <span>{rd.response_count || 0} answers</span>
                        <span>•</span>
                        <span>{rd.upvotes || 0} votes</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <BootstrapIcon name="question-circle" className="text-3xl mb-3" />
              <h3 className="font-bold mb-2">Still have doubts?</h3>
              <p className="text-blue-100 text-sm mb-4">Our experts are available 24/7 to help you succeed.</p>
              <Link
                href="/doubt/ask"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition text-sm"
              >
                <BootstrapIcon name="pencil" />
                Ask New Doubt
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
