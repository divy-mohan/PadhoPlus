'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import BatchCard from '@/components/BatchCard'
import { Search } from 'lucide-react'

const mockBatches = [
  {
    id: '1',
    name: 'NEET 2025 - Lakshya',
    exam: 'NEET',
    startDate: 'Jan 15, 2025',
    price: '4,999',
    isFree: false,
    language: 'Hindi',
    faculty: ['Dr. Sharma', 'Prof. Verma'],
    slug: 'neet-2025-lakshya'
  },
  {
    id: '2',
    name: 'JEE Mains 2025',
    exam: 'JEE',
    startDate: 'Jan 20, 2025',
    price: 'FREE',
    isFree: true,
    language: 'English',
    faculty: ['Mr. Patel'],
    slug: 'jee-mains-2025'
  },
  {
    id: '3',
    name: 'NEET 2026 Foundation',
    exam: 'NEET',
    startDate: 'Feb 1, 2025',
    price: '2,999',
    isFree: false,
    language: 'Hinglish',
    faculty: ['Dr. Reddy'],
    slug: 'neet-2026-foundation'
  },
  {
    id: '4',
    name: 'Class 12 Physics',
    exam: 'Boards',
    startDate: 'Feb 10, 2025',
    price: 'FREE',
    isFree: true,
    language: 'English',
    faculty: ['Prof. Khan'],
    slug: 'class-12-physics'
  },
  {
    id: '5',
    name: 'Advanced Mathematics',
    exam: 'JEE',
    startDate: 'Feb 15, 2025',
    price: '3,999',
    isFree: false,
    language: 'Hindi',
    faculty: ['Mr. Saxena'],
    slug: 'advanced-mathematics'
  },
  {
    id: '6',
    name: 'Chemistry Fundamentals',
    exam: 'NEET',
    startDate: 'Feb 20, 2025',
    price: 'FREE',
    isFree: true,
    language: 'Hinglish',
    faculty: ['Dr. Patel'],
    slug: 'chemistry-fundamentals'
  },
]

export default function BatchesPage() {
  const [batches, setBatches] = useState(mockBatches)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')

  useEffect(() => {
    let filtered = mockBatches

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedExam) {
      filtered = filtered.filter(b => b.exam === selectedExam)
    }

    if (selectedPrice === 'free') {
      filtered = filtered.filter(b => b.isFree)
    } else if (selectedPrice === 'paid') {
      filtered = filtered.filter(b => !b.isFree)
    }

    setBatches(filtered)
  }, [searchTerm, selectedExam, selectedPrice])

  return (
    <div className="bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'Batches' }]} />
      </div>

      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">All Batches</h1>
          <p className="text-gray-600 mb-8">Find the perfect batch for your preparation</p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
              <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                <option value="">All Exams</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="Boards">Boards</option>
                <option value="Foundation">Foundation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedExam('')
                  setSelectedPrice('')
                }}
                className="btn btn-secondary w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <BatchCard key={batch.id} {...batch} />
            ))}
          </div>

          {batches.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No batches found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
