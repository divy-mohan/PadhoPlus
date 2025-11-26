'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Users, Award, BookOpen } from 'lucide-react'

export default function FacultyPage() {
  const faculty = [
    { name: 'Dr. Sharma', subject: 'Physics', experience: '12 years', expertise: 'Mechanics & Optics' },
    { name: 'Prof. Verma', subject: 'Chemistry', experience: '10 years', expertise: 'Organic Chemistry' },
    { name: 'Mr. Patel', subject: 'Mathematics', experience: '15 years', expertise: 'Calculus & Geometry' },
    { name: 'Dr. Reddy', subject: 'Biology', experience: '8 years', expertise: 'Human Physiology' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Faculty', href: '/faculty' }]} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Expert Faculty</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Learn from highly qualified educators with years of experience in JEE & NEET preparation</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-3">{member.subject}</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p><span className="font-medium">Experience:</span> {member.experience}</p>
                <p><span className="font-medium">Expertise:</span> {member.expertise}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
