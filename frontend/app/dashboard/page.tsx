'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnimatedEducationCard from '@/components/AnimatedEducationCard'
import { Clock, BookOpen, Zap, TrendingUp, Award, Target, PlayCircle, CheckCircle, Star, Medal } from 'lucide-react'

export default function DashboardPage() {
  const [studentData] = useState({
    name: 'Arjun Singh',
    enrolledBatches: 3,
    watchTime: 156,
    streak: 12,
    avgScore: 78,
    totalTests: 24,
    achievements: 8,
  })

  const [enrollments] = useState([
    {
      id: 1,
      batchName: 'JEE Main Advanced',
      progress: 65,
      lastAccessed: '2 hours ago',
      status: 'In Progress',
      thumbnail: '🔬',
    },
    {
      id: 2,
      batchName: 'NEET Biology',
      progress: 42,
      lastAccessed: '1 day ago',
      status: 'In Progress',
      thumbnail: '🧬',
    },
    {
      id: 3,
      batchName: 'Physics Fundamentals',
      progress: 88,
      lastAccessed: '3 days ago',
      status: 'Nearly Complete',
      thumbnail: '⚛️',
    },
  ])

  const [achievements] = useState([
    { icon: Medal, label: '7-Day Streak', earned: true },
    { icon: Target, label: '80% Score', earned: true },
    { icon: Award, label: 'Power Learner', earned: true },
    { icon: Star, label: 'Quiz Master', earned: false },
  ])

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-slide-in-down">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{studentData.name}!</span>
          </h1>
          <p className="text-gray-600">Continue your learning journey with personalized insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 stagger-children">
          {[
            { icon: BookOpen, label: 'Enrolled Batches', value: studentData.enrolledBatches, color: 'from-blue-500 to-blue-600' },
            { icon: Clock, label: 'Watch Time', value: `${studentData.watchTime}m`, color: 'from-purple-500 to-purple-600' },
            { icon: Zap, label: 'Streak', value: `${studentData.streak}d`, color: 'from-orange-500 to-orange-600' },
            { icon: Award, label: 'Achievements', value: studentData.achievements, color: 'from-green-500 to-green-600' },
          ].map((stat, idx) => (
            <div key={idx} className={`animate-fade-in fade-in-delay-${idx + 1}`}>
              <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300`}>
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className="w-8 h-8 opacity-80" />
                  <TrendingUp className="w-5 h-5 opacity-50" />
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enrolled Batches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fade-in">Your Courses</h2>
          <div className="space-y-4 stagger-children">
            {enrollments.map((batch, idx) => (
              <AnimatedEducationCard key={batch.id} delay={idx * 100} variant="primary">
                <div className="p-6 hover:bg-gray-50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{batch.thumbnail}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{batch.batchName}</h3>
                        <p className="text-sm text-gray-500">Last: {batch.lastAccessed}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      batch.progress > 70 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {batch.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-sm font-bold text-blue-600">{batch.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
                        style={{ width: `${batch.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    Continue Learning →
                  </button>
                </div>
              </AnimatedEducationCard>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-fade-in">Achievements Unlocked</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {achievements.map((ach, idx) => (
              <div key={idx} className={`animate-fade-in fade-in-delay-${(idx % 4) + 1}`}>
                <div className={`rounded-2xl p-6 text-center transition-all duration-300 ${
                  ach.earned 
                    ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-2 border-yellow-300 hover:scale-110' 
                    : 'bg-gray-100 border-2 border-gray-300 opacity-50'
                }`}>
                  <ach.icon className={`w-8 h-8 mx-auto mb-2 ${ach.earned ? 'text-yellow-600 animate-star-pulse' : 'text-gray-400'}`} />
                  <p className="text-sm font-semibold text-gray-900">{ach.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="mt-12">
                  <h3 className="font-semibold text-gray-900">Chemistry - Organic</h3>
                  <p className="text-sm text-gray-600">2:00 PM - 3:30 PM</p>
                </div>
              </div>
              <button className="btn btn-secondary text-sm">Upcoming</button>
            </div>
          </div>
        </section>

        {/* Continue Watching */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Watching</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card cursor-pointer hover:border-blue-300">
                <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">Lecture {i}: Introduction to Thermodynamics</h3>
                <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                  <div className="bg-blue-600 h-1 rounded-full" style={{ width: `${60 + i * 10}%` }}></div>
                </div>
                <p className="text-xs text-gray-600">{60 + i * 10}% completed</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Tests */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Tests</h2>
          <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900">Full Syllabus Test - Physics</h3>
                <p className="text-sm text-gray-600">Tomorrow at 6:00 PM</p>
              </div>
              <button className="btn btn-primary text-sm">Prepare</button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold text-gray-900">Chapter-wise Test - Chemistry</h3>
                <p className="text-sm text-gray-600">Day after tomorrow</p>
              </div>
              <button className="btn btn-secondary text-sm">View</button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
