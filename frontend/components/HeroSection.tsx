'use client'

import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
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
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-40 -mb-40"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold fade-in-delay-1">
          <Sparkles className="w-4 h-4" />
          Quality Learning Platform
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight fade-in-delay-2">
          Master <span className="text-gradient inline-block min-h-[1.2em]">{displayText}</span> with Expert Guidance
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto fade-in-delay-3">
          Structured curriculum, live doubt support, real-time analytics. Start learning for free today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 fade-in-delay-4">
          <Link href="/batches" className="btn btn-primary text-base group">
            Explore Batches
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
          </Link>
          <Link href="/demo" className="btn btn-outline text-base">
            <Play className="w-5 h-5" />
            Watch Demo
          </Link>
        </div>

        {/* Stats with animation */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { number: '10K+', label: 'Active Students', delay: 'fade-in-delay-1' },
            { number: '500+', label: 'Expert Lectures', delay: 'fade-in-delay-2' },
            { number: '100%', label: 'Free Access', delay: 'fade-in-delay-3' }
          ].map((stat, idx) => (
            <div key={idx} className={`card hover-lift ${stat.delay}`}>
              <div className="text-3xl font-bold text-gradient">{stat.number}</div>
              <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
