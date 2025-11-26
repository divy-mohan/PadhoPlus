'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import BatchCard from '@/components/BatchCard'
import { Search, Sparkles } from 'lucide-react'

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
    slug: 'neet-2025-lakshya',
    image: '/media/batches/thumbnails/neet-2025-lakshya.jpg'
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
    slug: 'jee-mains-2025',
    image: '/media/batches/thumbnails/jee-mains-2025.jpg'
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
    slug: 'neet-2026-foundation',
    image: '/media/batches/thumbnails/neet-2026-foundation.jpg'
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
    slug: 'class-12-physics',
    image: '/media/batches/thumbnails/class-12-physics.jpg'
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
    slug: 'advanced-mathematics',
    image: '/media/batches/thumbnails/advanced-mathematics.jpg'
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
    slug: 'chemistry-fundamentals',
    image: '/media/batches/thumbnails/chemistry-fundamentals.jpg'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <Breadcrumb items={[{ label: 'Batches' }]} />
      </div>

      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Explore All Batches</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Batch</h1>
            <p className="text-gray-600 text-lg">Choose from our curated selection of expert-led preparation programs</p>
          </div>

          {/* Filters */}
          <div className="mb-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 animate-fade-in fade-in-delay-1">
            <h3 className="font-semibold text-gray-900 mb-4">Filter Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  className="btn btn-outline w-full"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            {batches.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-gray-600 font-medium">
                  Showing <span className="text-blue-600 font-semibold">{batches.length}</span> batch{batches.length !== 1 ? 'es' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {batches.map((batch, idx) => (
                    <div key={batch.id} className={`fade-in-delay-${(idx % 4) + 1}`}>
                      <BatchCard {...batch} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg font-medium mb-2">No batches found</p>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
