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
        <div className="mb-12">
          <Link href="/doubt/ask" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            <BootstrapIcon name="plus" className="text-xl" />
            Ask a New Doubt
          </Link>
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
            <BootstrapIcon name="chat-dots" className="text-lg" />
            My Doubts
          </button>
        </div>

        {/* Browse Doubts */}
        {activeTab === 'browse' && (
          <div className="space-y-8">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search doubts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            {/* Subject Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SUBJECTS.map(subject => (
                <Link key={subject.id} href={`/doubt/browse?subject=${subject.id}`} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${subject.color} rounded-xl opacity-0 group-hover:opacity-50 blur transition-all duration-500`}></div>
                  <div className={`relative bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all`}>
                    <BootstrapIcon name={subject.icon} className={`block mx-auto mb-2 text-4xl`} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{subject.name}</h3>
                    <p className="text-sm text-gray-500">Browse {subject.name} doubts</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Doubts */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-6">
                <BootstrapIcon name="graph-up" className="text-2xl text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <Link key={i} href={`/doubt/answer/${i}`} className="group block">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition-all">
                      <div className="flex items-start gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">Physics</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Medium</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">How to solve kinematics problems efficiently?</h3>
                      <p className="text-gray-600 text-sm mb-4">I struggle with relative motion problems. Can you explain the approach?</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Asked by Student • 2 hours ago</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Answered</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Doubts */}
        {activeTab === 'myDoubts' && (
          <div className="space-y-6">
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <BootstrapIcon name="chat-dots" className="block mx-auto mb-4 text-6xl text-gray-300" />
              <p className="text-gray-600 text-lg">No doubts yet</p>
              <p className="text-gray-500 text-sm mt-2">Start by asking your first doubt</p>
              <Link href="/doubt/ask" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg mt-4 hover:bg-blue-700">
                <BootstrapIcon name="plus" className="text-lg" />
                Ask Now
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
