'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Users, Star } from 'lucide-react'
import { apiEndpoints } from '@/utils/api'

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const response = await fetch(apiEndpoints.faculty(), {
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response.json()
        setFaculty(data.results || data)
      }
    } catch (error) {
      console.error('Error fetching faculty:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const colors = [
    'from-blue-600 to-blue-700',
    'from-purple-600 to-purple-700',
    'from-green-600 to-green-700',
    'from-orange-600 to-orange-700',
    'from-pink-600 to-pink-700',
    'from-indigo-600 to-indigo-700'
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

        {faculty.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((member, idx) => (
              <div key={member.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`bg-gradient-to-r ${colors[idx % colors.length]} h-24 relative`}>
                  <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                </div>

                <div className="px-6 pb-6 -mt-8 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colors[idx % colors.length]} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg border-4 border-white`}>
                    {member.first_name?.[0]}{member.last_name?.[0]}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.first_name} {member.last_name}</h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <p className="text-sm font-semibold text-blue-600">{member.role}</p>
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
                    {member.bio && (
                      <div>
                        <span className="font-medium">Bio:</span>
                        <p className="text-gray-700 mt-1 leading-relaxed">{member.bio.substring(0, 100)}...</p>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex justify-between">
                        <span className="font-medium">Email:</span>
                        <span className="font-semibold text-gray-900">{member.email}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No faculty members found</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for our expert instructors</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
