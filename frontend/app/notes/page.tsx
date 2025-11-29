'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
// Using Bootstrap Icons instead of Lucide
import { apiEndpoints } from '@/utils/api'

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([])
  const [filteredNotes, setFilteredNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('title')

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    filterAndSortNotes()
  }, [notes, searchTerm, selectedSubject, selectedType, sortBy])

  const filterAndSortNotes = () => {
    let filtered = notes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSubject = !selectedSubject || note.subject?.name === selectedSubject
      const matchesType = !selectedType || note.file_type === selectedType
      return matchesSearch && matchesSubject && matchesType
    })

    filtered.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'subject') return (a.subject?.name || '').localeCompare(b.subject?.name || '')
      if (sortBy === 'type') return a.file_type.localeCompare(b.file_type)
      return 0
    })

    setFilteredNotes(filtered)
  }

  const subjects = [...new Set(notes.map(note => note.subject?.name).filter(Boolean))]
  const types = [...new Set(notes.map(note => note.file_type))]

  const fetchNotes = async () => {
    try {
      const response = await fetch(apiEndpoints.notes(), {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setNotes(data.results || data)
      }
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Resources', href: '/notes' }]} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <i className="bi bi-book text-blue-600 mx-auto mb-4" style={{fontSize: '4rem'}}></i>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Access comprehensive study materials, notes, and resources for all your subjects</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <i className="bi bi-book absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <i className="bi bi-filter absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'notes' && 'Notes'}
                    {type === 'formula' && 'Formula Sheet'}
                    {type === 'pyq' && 'Previous Year Questions'}
                    {type === 'dpp' && 'Practice Problems'}
                    {type === 'pdf' && 'PDF'}
                    {type === 'solution' && 'Solutions'}
                    {type === 'other' && 'Other'}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <i className="bi bi-sort-down absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="title">Sort by Title</option>
                <option value="subject">Sort by Subject</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>
          </div>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className={`bg-white rounded-xl p-6 border-l-4 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                note.subject?.name === 'Mathematics' ? 'border-blue-500' :
                note.subject?.name === 'Physics' ? 'border-purple-500' :
                note.subject?.name === 'Chemistry' ? 'border-green-500' : 'border-gray-500'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      note.file_type === 'notes' ? 'bg-blue-100 text-blue-700' :
                      note.file_type === 'formula' ? 'bg-purple-100 text-purple-700' :
                      note.file_type === 'pyq' ? 'bg-orange-100 text-orange-700' :
                      note.file_type === 'dpp' ? 'bg-red-100 text-red-700' :
                      note.file_type === 'pdf' ? 'bg-pink-100 text-pink-700' :
                      note.file_type === 'solution' ? 'bg-teal-100 text-teal-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {note.file_type === 'notes' && <><i className="bi bi-journal-bookmark"></i> Notes</>}
                      {note.file_type === 'formula' && <><i className="bi bi-calculator-fill"></i> Formula Sheet</>}
                      {note.file_type === 'pyq' && <><i className="bi bi-clock-history"></i> Previous Year Questions</>}
                      {note.file_type === 'dpp' && <><i className="bi bi-trophy"></i> Practice Problems</>}
                      {note.file_type === 'pdf' && <><i className="bi bi-file-earmark-pdf-fill"></i> PDF</>}
                      {note.file_type === 'solution' && <><i className="bi bi-check-circle-fill"></i> Solutions</>}
                      {note.file_type === 'other' && <><i className="bi bi-file-earmark"></i> Other</>}
                    </span>
                  </div>
                  <i className="bi bi-file-earmark-text text-blue-600" style={{fontSize: '1.25rem'}}></i>
                </div>
                
                {note.description && (
                  <p className="text-sm text-gray-600 mb-4">{note.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {note.is_free && (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Free</span>
                    )}
                    {note.subject && (
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        {note.subject.name === 'Mathematics' && <i className="bi bi-calculator"></i>}
                        {note.subject.name === 'Physics' && <i className="bi bi-lightning"></i>}
                        {note.subject.name === 'Chemistry' && <i className="bi bi-flask"></i>}
                        {note.subject.name || note.subject}
                      </span>
                    )}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors">
                    <i className="bi bi-download"></i>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="bi bi-book text-gray-300 mx-auto mb-4" style={{fontSize: '4rem'}}></i>
            <p className="text-gray-600 text-lg">No resources available yet</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for study materials</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
