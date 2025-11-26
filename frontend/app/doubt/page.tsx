'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { BootstrapIcon } from '@/components/BootstrapIcon'

const SUBJECTS = [
  { id: 'physics', name: 'Physics', color: 'from-blue-600 to-cyan-500', icon: 'lightbulb' },
  { id: 'chemistry', name: 'Chemistry', color: 'from-green-600 to-emerald-500', icon: 'flask' },
  { id: 'biology', name: 'Biology', color: 'from-red-600 to-pink-500', icon: 'heart-pulse' },
  { id: 'mathematics', name: 'Mathematics', color: 'from-purple-600 to-pink-500', icon: 'calculator' },
]

export default function DoubtPage() {
  const [activeTab, setActiveTab] = useState<'browse' | 'myDoubts'>('browse')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Ask Doubts', href: '/doubt' }]} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BootstrapIcon name="chat-dots" className="w-12 h-12 text-blue-600 text-3xl" />
            <h1 className="text-4xl font-bold text-gray-900">Doubt Portal</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Get instant answers from expert faculty. Ask anything, clear everything!</p>
        </div>

        {/* Quick Action */}
        <div className="mb-12 flex items-center gap-3">
          <Link href="/doubt/ask" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            <BootstrapIcon name="plus" className="text-xl" />
            Ask a New Doubt
          </Link>
          <div className="text-gray-500 text-sm flex items-center gap-1">
            <BootstrapIcon name="info-circle" className="text-base" />
            Get answers from expert mentors within minutes
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'browse' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <BootstrapIcon name="search" className="text-lg" />
            Browse & Search
          </button>
          <button
            onClick={() => setActiveTab('myDoubts')}
            className={`px-4 py-3 font-semibold transition-all flex items-center gap-2 ${activeTab === 'myDoubts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <BootstrapIcon name="bookmark" className="text-lg" />
            My Doubts
          </button>
        </div>

        {/* Browse Doubts */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <BootstrapIcon name="search" className="absolute left-3 top-3 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search doubts by keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <BootstrapIcon name="funnel" className="absolute right-3 top-3 text-gray-400 text-lg pointer-events-none" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">All Subjects</option>
                  {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {/* Subject Cards Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BootstrapIcon name="collection" className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Browse by Subject</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUBJECTS.map(subject => (
                  <Link key={subject.id} href={`/doubt/browse?subject=${subject.id}`} className="group relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${subject.color} rounded-xl opacity-0 group-hover:opacity-50 blur transition-all duration-500`}></div>
                    <div className={`relative bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all`}>
                      <BootstrapIcon name={subject.icon} className={`block mx-auto mb-3 text-5xl`} />
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{subject.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <BootstrapIcon name="arrow-right" className="text-xs" />
                        Browse {subject.name} doubts
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Doubts */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <BootstrapIcon name="clock-history" className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <Link key={i} href={`/doubt/answer/${i}`} className="group block">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all">
                      {/* Tags */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                          <BootstrapIcon name="lightbulb" className="text-xs" />
                          Physics
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                          <BootstrapIcon name="star-fill" className="text-xs" />
                          Medium
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          <BootstrapIcon name="check-circle-fill" className="text-xs" />
                          Answered
                        </span>
                      </div>

                      {/* Question Title */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition flex items-start gap-2">
                        <BootstrapIcon name="question-circle" className="text-blue-600 flex-shrink-0 mt-0.5 text-lg" />
                        <span>How to solve kinematics problems efficiently?</span>
                      </h3>

                      {/* Question Description */}
                      <p className="text-gray-600 text-sm mb-4 pl-6">I struggle with relative motion problems. Can you explain the approach?</p>

                      {/* Footer with Metadata */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <BootstrapIcon name="person-circle" className="text-lg text-gray-400" />
                            <span>Student</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BootstrapIcon name="clock" className="text-lg text-gray-400" />
                            <span>2 hours ago</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <BootstrapIcon name="chat-dots" className="text-lg text-gray-400" />
                          <span className="font-semibold text-gray-700">5 Answers</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View More */}
              <div className="text-center mt-8">
                <Link href="/doubt/browse" className="inline-flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all">
                  <BootstrapIcon name="arrow-repeat" className="text-lg" />
                  View More Questions
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center border border-blue-200">
                <BootstrapIcon name="chat-dots" className="block mx-auto mb-2 text-3xl text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">2.5K+</p>
                <p className="text-sm text-gray-600">Questions Asked</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
                <BootstrapIcon name="check-circle" className="block mx-auto mb-2 text-3xl text-green-600" />
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Questions Answered</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center border border-purple-200">
                <BootstrapIcon name="lightning-charge" className="block mx-auto mb-2 text-3xl text-purple-600" />
                <p className="text-2xl font-bold text-gray-900">Avg 15m</p>
                <p className="text-sm text-gray-600">Response Time</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center border border-orange-200">
                <BootstrapIcon name="people" className="block mx-auto mb-2 text-3xl text-orange-600" />
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Expert Mentors</p>
              </div>
            </div>
          </div>
        )}

        {/* My Doubts */}
        {activeTab === 'myDoubts' && (
          <div className="space-y-6">
            <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-200">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <BootstrapIcon name="bookmark" className="block text-6xl text-gray-300" />
                  <BootstrapIcon name="plus" className="absolute -bottom-2 -right-2 text-3xl text-blue-600 bg-white rounded-full p-1" />
                </div>
              </div>
              <p className="text-gray-600 text-lg font-semibold mb-2">No doubts yet</p>
              <p className="text-gray-500 text-sm mb-6">Start by asking your first doubt. Our experts will respond quickly!</p>
              <Link href="/doubt/ask" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
                <BootstrapIcon name="plus-circle" className="text-xl" />
                Ask Your First Doubt
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <BootstrapIcon name="rocket" className="block mx-auto mb-4 text-4xl" />
          <h2 className="text-2xl font-bold mb-2">Start Clearing Your Doubts Today</h2>
          <p className="mb-6 text-blue-100">Join thousands of students getting expert help instantly</p>
          <Link href="/doubt/ask" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all">
            <BootstrapIcon name="pencil-square" className="text-lg" />
            Post Your Doubt Now
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
