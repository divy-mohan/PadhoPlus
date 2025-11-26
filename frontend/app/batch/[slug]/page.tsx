'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingButton from '@/components/LoadingButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Star, Users, CheckCircle, GraduationCap, Calendar, BookOpen, Zap } from 'lucide-react'
import Link from 'next/link'
import { apiEndpoints } from '@/utils/api'

export default function BatchDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [batch, setBatch] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const resolvedParams = await params
        const response = await fetch(apiEndpoints.batch(resolvedParams.slug), {
          credentials: 'include'
        })
        
        if (response.ok) {
          const data = await response.json()
          setBatch(data)
        } else {
          setError('Batch not found')
        }
      } catch (err) {
        console.error('Error fetching batch:', err)
        setError('Failed to load batch details')
      } finally {
        setLoading(false)
      }
    }

    fetchBatch()
  }, [params])

  const handleEnroll = async () => {
    setEnrollLoading(true)
    try {
      const response = await fetch(apiEndpoints.batchEnroll(batch.slug), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({})
      })

      if (response.ok) {
        alert('Successfully enrolled in batch')
        router.push('/dashboard')
      } else if (response.status === 400) {
        const data = await response.json()
        alert(data.error || 'Already enrolled in this batch')
      } else if (response.status === 403) {
        alert('Only students can enroll in batches')
      } else {
        alert('Failed to enroll in batch')
      }
    } catch (err) {
      console.error('Enrollment error:', err)
      alert('Unable to enroll in batch')
    } finally {
      setEnrollLoading(false)
    }
  }

  const handleDemo = async () => {
    setDemoLoading(true)
    try {
      const response = await fetch(apiEndpoints.batchDemo(batch.slug), {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.length > 0) {
          router.push(`/batch/${batch.slug}?demo=true`)
        } else {
          alert('No demo lectures available for this batch')
        }
      }
    } catch (err) {
      console.error('Demo error:', err)
      alert('Failed to load demo lectures')
    } finally {
      setDemoLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !batch) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error || 'Batch not found'}</p>
          <Link href="/batches" className="btn btn-primary">
            Back to Batches
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const tabs = ['overview', 'schedule', 'syllabus', 'faculty', 'reviews', 'faq']
  const enrolledCount = batch.enrollments?.filter((e: any) => e.status === 'active').length || 0
  const avgRating = batch.reviews?.length > 0 
    ? (batch.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / batch.reviews.length).toFixed(1)
    : 0

  return (
    <div className="bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <Breadcrumb items={[
          { label: 'Batches', href: '/batches' },
          { label: batch.get_target_exam_display || batch.target_exam },
          { label: batch.name }
        ]} />
      </div>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
            <div className="lg:col-span-2">
              <div className="flex gap-3 mb-4">
                <span className="badge badge-primary">
                  <GraduationCap className="w-4 h-4" />
                  {batch.get_target_exam_display || batch.target_exam}
                </span>
                <span className="badge bg-purple-100 text-purple-700">
                  {batch.language}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{batch.name}</h1>
              <div className="flex items-center gap-8 text-sm text-gray-600 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{avgRating}</span>
                  <span className="text-gray-500">({batch.reviews?.length || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{enrolledCount} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Starts {new Date(batch.start_date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{batch.description}</p>
            </div>

            <div className="lg:col-span-1 h-fit sticky top-24 animate-fade-in fade-in-delay-1">
              <div className="card border-2 border-gradient-to-br from-blue-200 to-blue-100">
                <div className="mb-6">
                  {batch.is_free ? (
                    <div>
                      <span className="text-4xl font-bold text-gradient">FREE</span>
                      <p className="text-sm text-gray-600 mt-1">Start learning today</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">₹{batch.price}</span>
                      {batch.discounted_price && batch.discounted_price < batch.price && (
                        <p className="text-sm text-red-600 mt-1">Save ₹{(batch.price - batch.discounted_price).toFixed(0)}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</p>
                    </div>
                  )}
                </div>

                <LoadingButton 
                  loading={enrollLoading} 
                  onClick={handleEnroll}
                  className="mb-3"
                  variant="primary"
                >
                  Enroll Now
                </LoadingButton>
                <LoadingButton 
                  loading={demoLoading} 
                  onClick={handleDemo}
                  className="mb-6"
                  variant="outline"
                >
                  Try Demo
                </LoadingButton>

                <div className="space-y-3 text-sm">
                  {(batch.includes || ['Live Classes', 'Study Materials', 'Doubt Support', 'Performance Analytics']).slice(0, 4).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-8 overflow-x-auto">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-semibold text-sm capitalize transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12 animate-fade-in">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">What You'll Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(batch.includes || batch.features || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover-lift">
                      <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && batch.schedules && batch.schedules.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Class Schedule</h2>
                <div className="space-y-4">
                  {batch.schedules.map((schedule: any, idx: number) => (
                    <div key={idx} className="card hover-lift">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{schedule.subject}</h3>
                          <p className="text-sm text-gray-600">{schedule.day} • {schedule.start_time} - {schedule.end_time}</p>
                        </div>
                        {schedule.is_live && (
                          <span className="badge bg-red-100 text-red-700">Live</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faculty' && batch.faculty && batch.faculty.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Meet Your Instructors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {batch.faculty.map((prof: any, idx: number) => (
                    <div key={idx} className="card hover-lift">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {prof.first_name?.[0]}{prof.last_name?.[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{prof.first_name} {prof.last_name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{prof.email}</p>
                        </div>
                      </div>
                      {prof.bio && <p className="text-sm text-gray-600">{prof.bio}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faq' && batch.faqs && batch.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {batch.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="card">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && batch.reviews && batch.reviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Student Reviews</h2>
                <div className="space-y-4">
                  {batch.reviews.map((review: any, idx: number) => (
                    <div key={idx} className="card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{review.student_name}</h3>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {review.review && <p className="text-gray-600 text-sm">{review.review}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'overview' && activeTab !== 'faculty' && activeTab !== 'faq' && activeTab !== 'reviews' && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Content coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
