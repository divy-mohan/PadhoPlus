'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import BatchCard from '@/components/BatchCard'
import AnimatedEducationCard from '@/components/AnimatedEducationCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Search, Sparkles } from 'lucide-react'

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([])
  const [allBatches, setAllBatches] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExam, setSelectedExam] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState('')

  useEffect(() => {
    fetchBatches()
  }, [])

  const fetchBatches = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/batches/?is_active=true', {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setAllBatches(data.results || data)
        setBatches(data.results || data)
      }
    } catch (error) {
      console.error('Error fetching batches:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = allBatches

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedExam) {
      filtered = filtered.filter(b => b.target_exam === selectedExam)
    }

    if (selectedClass) {
      filtered = filtered.filter(b => b.target_class === selectedClass)
    }

    if (selectedPrice === 'free') {
      filtered = filtered.filter(b => b.is_free)
    } else if (selectedPrice === 'paid') {
      filtered = filtered.filter(b => !b.is_free)
    }

    setBatches(filtered)
  }, [searchTerm, selectedExam, selectedClass, selectedPrice, allBatches])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
        <Breadcrumb items={[{ label: 'Batches' }]} />
      </div>

      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Explore All Batches</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Perfect Batch</h1>
            <p className="text-gray-600 text-lg">Choose from our curated selection of expert-led preparation programs</p>
          </div>

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
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam</label>
                <select 
                  value={selectedExam} 
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Exams</option>
                  <option value="jee_main">JEE Main</option>
                  <option value="jee_advanced">JEE Advanced</option>
                  <option value="neet">NEET</option>
                  <option value="boards">Boards</option>
                  <option value="foundation">Foundation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select 
                  value={selectedClass} 
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Classes</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Dropper">Dropper</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <select 
                  value={selectedPrice} 
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
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
                    setSelectedClass('')
                    setSelectedPrice('')
                  }}
                  className="btn btn-outline w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg py-2 font-semibold"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div>
            {batches.length > 0 ? (
              <>
                <div className="mb-6 text-sm text-gray-600 font-medium">
                  Showing <span className="text-blue-600 font-semibold">{batches.length}</span> batch{batches.length !== 1 ? 'es' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {batches.map((batch) => (
                    <div key={batch.id}>
                      <BatchCard 
                        id={batch.id}
                        name={batch.name} 
                        exam={batch.get_target_exam_display} 
                        startDate={batch.start_date}
                        price={batch.is_free ? 'FREE' : batch.price}
                        isFree={batch.is_free}
                        language={batch.language}
                        faculty={batch.faculty || []}
                        slug={batch.slug}
                        image={batch.thumbnail}
                      />
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
