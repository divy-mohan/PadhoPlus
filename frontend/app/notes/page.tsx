'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { BookOpen, FileText, Download } from 'lucide-react'

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/notes/?is_active=true', {
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
        <div className="text-center mb-12">
          <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Access comprehensive study materials, notes, and resources for all your subjects</p>
        </div>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                    <p className="text-xs text-blue-600 font-medium mt-1">{note.get_file_type_display}</p>
                  </div>
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                
                {note.description && (
                  <p className="text-sm text-gray-600 mb-4">{note.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {note.is_free && (
                      <span className="badge bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Free</span>
                    )}
                    {note.subject && (
                      <span className="badge bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{note.subject}</span>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No resources available yet</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for study materials</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
