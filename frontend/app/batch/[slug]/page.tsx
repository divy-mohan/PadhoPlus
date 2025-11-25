'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Star, Users, CheckCircle, GraduationCap, Calendar, BookOpen, Zap } from 'lucide-react'
import Link from 'next/link'

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <Breadcrumb items={[
          { label: 'Batches', href: '/batches' },
          { label: batch.exam },
          { label: batch.name }
        ]} />
      </div>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 animate-fade-in">
            <div className="lg:col-span-2">
              <div className="flex gap-3 mb-4">
                <span className="badge badge-primary">
                  <GraduationCap className="w-4 h-4" />
                  {batch.exam}
                </span>
                <span className="badge bg-purple-100 text-purple-700">
                  {batch.language}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{batch.name}</h1>
              <div className="flex items-center gap-8 text-sm text-gray-600 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-900">{batch.rating}</span>
                  <span className="text-gray-500">({batch.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{batch.enrolledCount.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Starts {batch.startDate}</span>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">{batch.description}</p>
            </div>

            {/* Enroll Card */}
            <div className="lg:col-span-1 h-fit sticky top-24 animate-fade-in fade-in-delay-1">
              <div className="card border-2 border-gradient-to-br from-blue-200 to-blue-100">
                <div className="mb-6">
                  {batch.isFree ? (
                    <div>
                      <span className="text-4xl font-bold text-gradient">FREE</span>
                      <p className="text-sm text-gray-600 mt-1">Start learning today</p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900">₹{batch.price}</span>
                      <p className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</p>
                    </div>
                  )}
                </div>

                <button className="btn btn-primary w-full mb-3">
                  Enroll Now
                </button>
                <button className="btn btn-outline w-full mb-6">
                  Try Demo
                </button>

                <div className="space-y-3 text-sm">
                  {batch.highlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
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

          {/* Tab Content */}
          <div className="mb-12 animate-fade-in">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">What You'll Get</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batch.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover-lift">
                      <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Complete Syllabus</h2>
                <div className="space-y-4">
                  {batch.syllabus.map((item, idx) => (
                    <div key={idx} className="card hover-lift">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        {item.subject}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium">
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
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Meet Your Instructors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {batch.faculty.map((prof, idx) => (
                    <div key={idx} className="card hover-lift">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {prof.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{prof.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{prof.subject}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{prof.experience} years of teaching experience</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== 'overview' && activeTab !== 'syllabus' && activeTab !== 'faculty' && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg">Coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
