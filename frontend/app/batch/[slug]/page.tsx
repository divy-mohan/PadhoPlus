'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Star, Users, Clock, CheckCircle } from 'lucide-react'

export default function BatchDetailPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('overview')

  const batch = {
    id: '1',
    name: 'NEET 2025 - Lakshya',
    exam: 'NEET',
    slug: params.slug,
    price: 4999,
    isFree: false,
    language: 'Hindi',
    startDate: 'Jan 15, 2025',
    duration: '12 months',
    rating: 4.8,
    reviews: 324,
    enrolledCount: 2450,
    description: 'Comprehensive NEET preparation course with live classes, recorded lectures, daily practice problems, and doubt support.',
    highlights: [
      'Live Classes: 5 days a week',
      'Recorded Lectures: Access anytime',
      'Daily Practice Problems',
      'Weekly Mock Tests',
      'Doubt Support: 24/7',
      'Study Materials: Notes + PDFs',
      'Performance Analytics'
    ],
    faculty: [
      { name: 'Dr. Sharma', subject: 'Biology', experience: '12 years' },
      { name: 'Prof. Verma', subject: 'Chemistry', experience: '10 years' }
    ],
    syllabus: [
      { subject: 'Physics', topics: ['Mechanics', 'Optics', 'Modern Physics'] },
      { subject: 'Chemistry', topics: ['Organic', 'Inorganic', 'Physical'] },
      { subject: 'Biology', topics: ['Botany', 'Zoology', 'Genetics'] }
    ]
  }

  const tabs = ['overview', 'schedule', 'syllabus', 'faculty', 'reviews', 'faq']

  return (
    <div className="bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[
          { label: 'Batches', href: '/batches' },
          { label: batch.exam },
          { label: batch.name }
        ]} />
      </div>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {batch.exam}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {batch.language}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{batch.name}</h1>
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{batch.rating} ({batch.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{batch.enrolledCount} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Starts {batch.startDate}</span>
                </div>
              </div>
              <p className="text-gray-700">{batch.description}</p>
            </div>

            {/* Enroll Card */}
            <div className="card h-fit sticky top-20">
              <div className="mb-6">
                {batch.isFree ? (
                  <div>
                    <span className="text-3xl font-bold text-green-600">FREE</span>
                    <p className="text-sm text-gray-600 mt-1">Start learning today</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-bold text-gray-900">₹{batch.price}</span>
                    <p className="text-sm text-gray-600 mt-1">One-time payment</p>
                  </div>
                )}
              </div>

              <button className="btn btn-primary w-full mb-2">
                Enroll Now
              </button>
              <button className="btn btn-outline w-full">
                Try Demo
              </button>

              <div className="mt-6 space-y-2 text-sm">
                {batch.highlights.slice(0, 3).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm capitalize transition-colors border-b-2 ${
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

          {/* Tab Content */}
          <div className="mb-12">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">What You'll Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batch.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Syllabus</h2>
                <div className="space-y-4">
                  {batch.syllabus.map((item, idx) => (
                    <div key={idx} className="card">
                      <h3 className="font-semibold text-gray-900 mb-3">{item.subject}</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faculty' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Faculty</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {batch.faculty.map((prof, idx) => (
                    <div key={idx} className="card">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {prof.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{prof.name}</h3>
                          <p className="text-sm text-gray-600">{prof.subject}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{prof.experience} experience</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'overview' && activeTab !== 'syllabus' && activeTab !== 'faculty' && (
              <div className="text-center py-12">
                <p className="text-gray-600">Coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
