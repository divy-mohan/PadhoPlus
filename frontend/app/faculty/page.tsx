'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Users, Star } from 'lucide-react'
import { apiEndpoints, apiCall } from '@/utils/api'

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [typingText, setTypingText] = useState<{[key: string]: string}>({})
  const [isTyping, setIsTyping] = useState<{[key: string]: boolean}>({})
  const timers = useRef<{[key: string]: NodeJS.Timeout}>({})

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const data = await apiCall(apiEndpoints.faculty())
      setFaculty(data.results || data)
    } catch (error) {
      console.error('Error fetching faculty:', error)
      setFaculty([])
    } finally {
      setLoading(false)
    }
  }

  const startTyping = (key: string, text: string) => {
    console.log('Starting typing for:', key, text.substring(0, 20))
    setTypingText(prev => ({...prev, [key]: text}))
  }
  
  const stopTyping = (key: string) => {
    console.log('Stopping typing for:', key)
    setTypingText(prev => ({...prev, [key]: ''}))
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

        <div>Faculty count: {faculty.length}</div>
        {faculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {faculty.map((member, idx) => (
              <div key={member.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200">
                <div className={`bg-gradient-to-br ${colors[idx % colors.length]} h-32 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full"></div>
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/10 rounded-full"></div>
                </div>

                <div className="px-6 pb-6 -mt-12 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors[idx % colors.length]} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-xl border-4 border-white mx-auto`}>
                    {member.user?.first_name?.[0]}{member.user?.last_name?.[0]}
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.user?.first_name} {member.user?.last_name}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <i className="bi bi-award text-blue-600"></i>
                      <p className="text-sm font-semibold text-blue-600">{member.designation || member.user?.role}</p>
                    </div>
                    {member.subjects && member.subjects.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1 mb-3">
                        {member.subjects.slice(0, 3).map((subject: any, i: number) => (
                          <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            {subject.name === 'Mathematics' && <i className="bi bi-calculator"></i>}
                            {subject.name === 'Physics' && <i className="bi bi-lightning"></i>}
                            {subject.name === 'Chemistry' && <i className="bi bi-radioactive"></i>}
                            {subject.name === 'English' && <i className="bi bi-book"></i>}
                            {subject.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    {member.achievements && (
                      <div 
                        className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 hover:bg-red-200 transition-colors cursor-pointer"
                        onClick={() => {
                          console.log('CLICKED - Achievement', member.achievements)
                          alert('Achievement clicked!')
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <i className="bi bi-trophy text-yellow-600"></i>
                          <span className="font-semibold text-yellow-800">Achievements</span>
                        </div>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          {typingText[`achievement-${member.id}`] ? typingText[`achievement-${member.id}`] : member.achievements.substring(0, 50) + '...'}
                        </p>
                      </div>
                    )}
                    {member.teaching_style && (
                      <div 
                        className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400 hover:bg-green-100 transition-colors cursor-pointer"
                        onMouseEnter={() => startTyping(`teaching-${member.id}`, member.teaching_style)}
                        onMouseLeave={() => stopTyping(`teaching-${member.id}`)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <i className="bi bi-person-check text-green-600"></i>
                          <span className="font-semibold text-green-800">Teaching Style</span>
                        </div>
                        <p className="text-gray-700 text-xs leading-relaxed">
                          {typingText[`teaching-${member.id}`] ? typingText[`teaching-${member.id}`] : member.teaching_style.substring(0, 50) + '...'}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    {member.intro_video_url && (
                      <a href={member.intro_video_url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2">
                        <i className="bi bi-play-circle"></i>
                        Intro Video
                      </a>
                    )}
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-3 rounded-lg font-medium text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      <i className="bi bi-person-lines-fill"></i>
                      View Profile
                    </button>
                  </div>
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
