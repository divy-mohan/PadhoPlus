'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { BookOpen } from 'lucide-react'

export default function NotesPage() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Physics Notes', 'Chemistry Notes', 'Biology Notes', 'Mathematics Notes', 'Previous Year Papers', 'Formula Sheets'].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item}</h3>
              <p className="text-sm text-gray-600">Coming soon - premium resources will be available here</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
