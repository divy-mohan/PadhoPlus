'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Users, Award, BookOpen, Star } from 'lucide-react'

export default function FacultyPage() {
  const faculty = [
    { 
      name: 'Dr. Sharma', 
      subject: 'Physics', 
      experience: '12 years', 
      expertise: 'Mechanics & Optics',
      initials: 'DS',
      color: 'from-blue-600 to-blue-700'
    },
    { 
      name: 'Prof. Verma', 
      subject: 'Chemistry', 
      experience: '10 years', 
      expertise: 'Organic Chemistry',
      initials: 'PV',
      color: 'from-purple-600 to-purple-700'
    },
    { 
      name: 'Mr. Patel', 
      subject: 'Mathematics', 
      experience: '15 years', 
      expertise: 'Calculus & Geometry',
      initials: 'MP',
      color: 'from-green-600 to-green-700'
    },
    { 
      name: 'Dr. Reddy', 
      subject: 'Biology', 
      experience: '8 years', 
      expertise: 'Human Physiology',
      initials: 'DR',
      color: 'from-orange-600 to-orange-700'
    },
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
            <div key={idx} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${member.color} h-24 relative`}>
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
              </div>

              {/* Profile section */}
              <div className="px-6 pb-6 -mt-8 relative z-10">
                {/* Avatar */}
                <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg border-4 border-white`}>
                  {member.initials}
                </div>

                {/* Info */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <p className="text-sm font-semibold text-blue-600">{member.subject}</p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="font-medium">Experience:</span>
                    <span className="font-semibold text-gray-900">{member.experience}</span>
                  </div>
                  <div>
                    <span className="font-medium">Expertise:</span>
                    <p className="text-gray-700 mt-1 leading-relaxed">{member.expertise}</p>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
