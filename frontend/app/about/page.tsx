'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Target, Globe, Zap, Users, BookOpen, TrendingUp, Brain, Award, Lightbulb, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: Users, title: 'Access for All', desc: 'Education should never depend on money' },
    { icon: Award, title: 'Quality First', desc: 'Expert teachers, top-tier content & structured learning' },
    { icon: Target, title: 'Student-Centric', desc: 'Every feature is designed for your success' },
    { icon: Lightbulb, title: 'Technology-Driven', desc: 'Smart analytics & innovation for better learning' },
    { icon: CheckCircle, title: 'Honest & Transparent', desc: 'No overpriced plans. No false promises. Only results.' },
  ]

  const advantages = [
    { icon: BookOpen, title: 'Live + Recorded Classes', desc: 'Learn at your own pace' },
    { icon: Brain, title: 'Notes, PYQs, + DPPs', desc: 'Comprehensive study materials' },
    { icon: Users, title: 'Doubt Support', desc: 'From skilled mentors anytime' },
    { icon: TrendingUp, title: 'Performance Analytics', desc: 'Track your progress real-time' },
    { icon: Target, title: 'Smart Test Planning', desc: 'Customized exam preparation' },
    { icon: Lightbulb, title: 'Personalized Recommendations', desc: 'AI-driven learning paths' },
  ]

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'About', href: '/about' }]} />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 scroll-fade-up">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Empowering Every Student. Everywhere.</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PadhoPlus was built with a simple belief — every student deserves access to high-quality education, regardless of money, location, or background.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
            We are transforming learning by offering premium exam preparation at a price every family can afford — and often, completely free.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 scroll-slide-left" style={{ animationDelay: '0ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg font-semibold mb-3">Make India future-ready by making education accessible, affordable, and achievable for all.</p>
            <p className="text-gray-600 leading-relaxed">
              We are here to eliminate the barriers that stop students from reaching their true potential — whether it's expensive coaching, lack of guidance, or distance from big cities.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border border-purple-200 scroll-slide-right" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 text-lg font-semibold mb-3">A country where every student has the opportunity and confidence to crack the toughest exams.</p>
            <p className="text-gray-600 leading-relaxed">
              PadhoPlus aims to become India's most trusted learning platform, empowering future innovators, doctors, engineers, and leaders.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Stand For</h2>
            <p className="text-gray-600 text-lg">Our core values guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, idx) => {
              const ValueIcon = value.icon
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all scroll-rotate-in" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <ValueIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Learning Advantage */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">The PadhoPlus Learning Advantage</h2>
            <p className="text-gray-600 text-lg">All in one platform — designed to help you score higher</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, idx) => {
              const AdvIcon = adv.icon
              const colors = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-green-500 to-green-600',
                'from-orange-500 to-orange-600',
                'from-pink-500 to-pink-600',
                'from-indigo-500 to-indigo-600',
              ]
              return (
                <div key={idx} className={`group relative overflow-hidden rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer scroll-zoom-in`} style={{ animationDelay: `${idx * 100}ms` }}>
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[idx % colors.length]} opacity-100`}></div>
                  
                  {/* Animated overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-all">
                        <AdvIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold leading-tight">{adv.title}</h3>
                      </div>
                    </div>
                    <p className="text-white/90 font-medium text-base leading-relaxed mt-3">{adv.desc}</p>
                  </div>

                  {/* Decorative bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:h-1.5 transition-all duration-300"></div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Educators Section */}
        <section className="mb-16 text-center">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Educators</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
            A passionate team of experienced teachers, IITians, NEET experts, and mentors who have already helped thousands of students achieve their dreams.
          </p>
          <p className="text-gray-700 text-xl font-semibold italic">We don't just teach… We guide. We support. We believe in you.</p>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center border border-blue-200">
          <Zap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">The Future of Learning is Here</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-3 leading-relaxed">
            PadhoPlus is not just a platform — it's a movement for educational equality.
          </p>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Together, we can ensure that every child with a dream has the tools to make it real.
          </p>
          
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Dream. Learn. Achieve.</h3>
            <p className="text-gray-600 text-lg">Because your success story starts here.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-base">Join PadhoPlus Now</button>
            <button className="btn btn-outline text-base">Explore Batches</button>
          </div>

          <p className="text-gray-600 mt-8 font-semibold">Let's build a smarter India together.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
