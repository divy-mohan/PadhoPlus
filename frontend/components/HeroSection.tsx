'use client'

import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Users, BookOpen, Unlock } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [examIndex, setExamIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const exams = ['9 to 12th', 'JEE-NEET']
  const currentExam = exams[examIndex]

  useEffect(() => {
    const typeSpeed = 80
    const deleteSpeed = 50
    const pauseDuration = 2500

    let timeout

    if (!isDeleting) {
      if (displayText.length < currentExam.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentExam.slice(0, displayText.length + 1))
        }, typeSpeed)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentExam.slice(0, displayText.length - 1))
        }, deleteSpeed)
      } else {
        setIsDeleting(false)
        setExamIndex((prev) => (prev + 1) % exams.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, examIndex, currentExam])

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 sm:py-24 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-40 -mb-40"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold fade-in-delay-1">
          <Sparkles className="w-4 h-4" />
          Quality Learning Platform
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight fade-in-delay-2">
          Master <span className="text-gradient inline-block min-h-[1em] sm:min-h-[1.2em]">{displayText}</span> with Expert Guidance
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto fade-in-delay-3">
          Structured curriculum, live doubt support, real-time analytics. Start learning for free today.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-14 fade-in-delay-4">
          <Link href="/batches" className="btn btn-primary text-sm sm:text-base group">
            Explore Batches
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-smooth" />
          </Link>
          <Link href="/demo" className="btn btn-outline text-sm sm:text-base">
            <Play className="w-4 sm:w-5 h-4 sm:h-5" />
            Watch Demo
          </Link>
        </div>

        {/* Stats with Bootstrap Icons - Responsive - All 3 in one horizontal line */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
          {[
            { 
              number: '10K+', 
              label: 'Active Students', 
              icon: Users,
              color: 'from-blue-500 to-blue-600',
              delay: 'fade-in-delay-1' 
            },
            { 
              number: '500+', 
              label: 'Expert Lectures', 
              icon: BookOpen,
              color: 'from-purple-500 to-purple-600',
              delay: 'fade-in-delay-2' 
            },
            { 
              number: '100%', 
              label: 'Free Access', 
              icon: Unlock,
              color: 'from-green-500 to-green-600',
              delay: 'fade-in-delay-3' 
            }
          ].map((stat, idx) => {
            const IconComponent = stat.icon
            return (
              <div key={idx} className={`${stat.delay} group`}>
                <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden h-full">
                  {/* Icon background */}
                  <div className={`absolute -top-2 -right-2 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${stat.color} opacity-5 rounded-full`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center p-1.5 sm:p-2 md:p-3 bg-gradient-to-br ${stat.color} rounded-lg mb-1.5 sm:mb-2 md:mb-3 relative z-10`}>
                    <IconComponent className="w-3 sm:w-5 md:w-6 h-3 sm:h-5 md:h-6 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-left relative z-10">
                    <div className="text-base sm:text-2xl md:text-3xl font-bold text-gradient">{stat.number}</div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-0.5 sm:mt-1 md:mt-2 line-clamp-2">{stat.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
