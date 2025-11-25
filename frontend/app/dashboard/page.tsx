'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Clock, BookOpen, Zap, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome back, Student!</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Study Time Today</h3>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2.5h</p>
            <p className="text-xs text-gray-600">+30 min from yesterday</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Lectures Watched</h3>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-600">4 more to go</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Current Streak</h3>
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">7 days</p>
            <p className="text-xs text-gray-600">Keep it going!</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Accuracy</h3>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">75%</p>
            <p className="text-xs text-gray-600">Improving!</p>
          </div>
        </div>

        {/* Today's Classes */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Classes</h2>
          <div className="card">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Physics - Mechanics</h3>
                  <p className="text-sm text-gray-600">10:00 AM - 11:30 AM</p>
                </div>
              </div>
              <button className="btn btn-primary text-sm">Join Live</button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
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
