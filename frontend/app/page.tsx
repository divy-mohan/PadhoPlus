'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import BatchCard from '@/components/BatchCard'
import FeatureCard from '@/components/FeatureCard'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Zap, Users, TrendingUp, Shield, BookMarked, MessageSquare, ArrowRight, CheckCircle, Award, Lightbulb, BookOpen, Target, Brain, Play, DollarSign, UserCheck, Sparkles, Layers, Star, Gift } from 'lucide-react'
import Link from 'next/link'

const featuredBatches = [
  {
    id: '1',
    name: 'NEET 2025 - Lakshya',
    exam: 'NEET',
    startDate: 'Jan 15, 2025',
    price: '4,999',
    isFree: false,
    language: 'Hindi',
    faculty: ['Dr. Sharma', 'Prof. Verma'],
    slug: 'neet-2025-lakshya',
    image: '/media/batches/thumbnails/neet-2025-lakshya.jpg'
  },
  {
    id: '2',
    name: 'JEE Advanced Prep',
    exam: 'JEE',
    startDate: 'Jan 20, 2025',
    price: 'FREE',
    isFree: true,
    language: 'English',
    faculty: ['Mr. Patel'],
    slug: 'jee-advanced-prep',
    image: '/media/batches/thumbnails/jee-advanced-prep.jpg'
  },
  {
    id: '3',
    name: 'Class 12 Boards - Physics',
    exam: 'Boards',
    startDate: 'Feb 1, 2025',
    price: '2,999',
    isFree: false,
    language: 'Hinglish',
    faculty: ['Dr. Reddy'],
    slug: 'class-12-physics',
    image: '/media/batches/thumbnails/class-12-physics.jpg'
  },
  {
    id: '4',
    name: 'Foundation - Mathematics',
    exam: 'Foundation',
    startDate: 'Feb 10, 2025',
    price: 'FREE',
    isFree: true,
    language: 'English',
    faculty: ['Prof. Khan'],
    slug: 'foundation-math',
    image: '/media/batches/thumbnails/foundation-math.jpg'
  },
]

const features = [
  {
    icon: Zap,
    title: 'Quality Content',
    description: 'Structured curriculum designed by IIT/AIIMS experts'
  },
  {
    icon: MessageSquare,
    title: 'Instant Doubt Support',
    description: 'Get answers from mentors within minutes'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Analytics',
    description: 'Track progress and identify weak areas'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Learn with 10K+ ambitious students'
  },
  {
    icon: BookMarked,
    title: 'Rich Resources',
    description: 'Notes, PDFs, PYQs, formula sheets'
  },
  {
    icon: Shield,
    title: 'Affordable & Free',
    description: 'Start free, pay only for advanced features'
  },
]

const benefits = [
  { icon: Target, title: 'Structured Learning', desc: 'Complete syllabus coverage with a planned roadmap' },
  { icon: BookMarked, title: 'Top-Level Content', desc: 'Notes, PYQs, DPPs & test series by expert educators' },
  { icon: UserCheck, title: '1:1 Doubt Support', desc: 'Ask anytime and get quick, clear solutions' },
  { icon: Brain, title: 'AI-Powered Analytics', desc: 'Track strengths & weaknesses with smart analysis' },
  { icon: Play, title: 'Live + Recorded', desc: 'Never miss a class, learn at your own pace' },
  { icon: DollarSign, title: 'Most Affordable', desc: 'Premium features without expensive price tags' },
]

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose PadhoPlus?</h2>
                <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">Everything you need to ace your exams, at a fraction of the cost</p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 100}>
                  <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                    <div className="flex justify-center mb-4 p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg w-fit mx-auto">
                      <FeatureIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-center text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Layers className="w-8 h-8 text-purple-600" />
                <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
                <Layers className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-gray-600 text-lg">Your journey to success in 4 simple steps</p>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
            {/* Animated connector line - Desktop only */}
            <div className="hidden md:block absolute top-16 left-12 right-12 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent">
              <div className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 rounded-full animate-pulse" style={{
                backgroundSize: '200% 100%',
                animation: 'slideFlow 3s ease-in-out infinite'
              }}></div>
            </div>

            {/* Arrow indicators */}
            <div className="hidden md:block absolute top-12 left-1/4 transform -translate-x-1/2 z-20">
              <div className="text-3xl text-blue-400 animate-bounce-smooth">→</div>
            </div>
            <div className="hidden md:block absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="text-3xl text-purple-400 animate-bounce-smooth" style={{ animationDelay: '0.2s' }}>→</div>
            </div>
            <div className="hidden md:block absolute top-12 right-1/4 transform -translate-x-1/2 z-20">
              <div className="text-3xl text-blue-400 animate-bounce-smooth" style={{ animationDelay: '0.4s' }}>→</div>
            </div>

            {[
              { step: 1, title: 'Sign Up', desc: 'Create your free account', icon: '✍️', color: 'from-blue-600 to-blue-700' },
              { step: 2, title: 'Choose Batch', desc: 'Pick your exam & batch', icon: '📚', color: 'from-purple-600 to-purple-700' },
              { step: 3, title: 'Start Learning', desc: 'Access all resources', icon: '🎓', color: 'from-pink-600 to-pink-700' },
              { step: 4, title: 'Track Progress', desc: 'Get real-time insights', icon: '📊', color: 'from-green-600 to-green-700' }
            ].map((item, idx) => (
              <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                  
                  <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-blue-300 overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine-once"></div>

                    {/* Step number with animation */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg group-hover:scale-125 group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{item.step}</span>
                    </div>

                    {/* Step content */}
                    <div className="text-center relative z-10">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
                    </div>

                    {/* Animated border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Mobile connector */}
          <div className="md:hidden mt-12 space-y-4">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex items-center justify-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS for flow animation */}
        <style jsx>{`
          @keyframes slideFlow {
            0%, 100% { background-position: 0% 0%; }
            50% { background-position: 100% 0%; }
          }
          @keyframes shineOnce {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shine-once {
            animation: shineOnce 0.6s ease-in-out;
          }
        `}</style>
      </section>

      {/* Featured Batches */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-0 sm:justify-start">
              <Star className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-900">Popular Batches</h2>
            </div>
            <p className="text-gray-600">Start your preparation with our most loved programs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {featuredBatches.map((batch, idx) => (
              <div key={batch.id} className={`animate-fade-in fade-in-delay-${(idx % 4) + 1}`}>
                <BatchCard {...batch} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/batches" className="btn btn-outline">
              View All Batches
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Award className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl font-bold text-gray-900">Why Students Choose Us</h2>
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-blue-600 text-lg">Join thousands of successful learners</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, label: '10,000+', text: 'Active Students', color: 'from-blue-500 to-cyan-500' },
              { icon: Award, label: '500+', text: 'Expert Lectures', color: 'from-purple-500 to-pink-500' },
              { icon: Lightbulb, label: '100%', text: 'Success Rate', color: 'from-orange-500 to-red-500' }
            ].map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                  <div className="group relative">
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500`}></div>
                    
                    {/* Card */}
                    <div className="relative bg-white rounded-2xl p-8 border border-blue-200 group-hover:border-blue-400 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon container */}
                        <div className={`inline-flex items-center justify-center mb-6 p-4 bg-gradient-to-br ${stat.color} rounded-full relative group/icon`}>
                          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                          <StatIcon className="w-8 h-8 text-white relative z-10 group-hover/icon:scale-125 group-hover/icon:rotate-12 transition-all duration-300" />
                        </div>

                        {/* Animated counter */}
                        <div className="mb-3">
                          <h3 className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                            {stat.label}
                          </h3>
                        </div>

                        {/* Text */}
                        <p className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">
                          {stat.text}
                        </p>
                      </div>

                      {/* Bottom accent bar */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>

          {/* Floating stats indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { number: '98%', label: 'Student Satisfaction' },
              { number: '50K+', label: 'Problems Solved' },
              { number: '24/7', label: 'Doubt Support' }
            ].map((item, idx) => (
              <ScrollAnimation key={idx} type="blur-fade" delay={idx * 100}>
                <div className="bg-blue-100/50 backdrop-blur-sm border border-blue-300 rounded-lg p-4 text-center hover:bg-blue-100 transition-all duration-300 group cursor-pointer">
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text group-hover:scale-110 transition-transform duration-300 inline-block">
                    {item.number}
                  </div>
                  <p className="text-blue-700 text-sm mt-1 group-hover:text-blue-900 transition-colors duration-300">{item.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-20 w-80 h-80 bg-green-200/25 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-200/25 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '0.75s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Gift className="w-8 h-8 text-green-600" />
                <h2 className="text-4xl font-bold text-gray-900">What You Get in Every Batch</h2>
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-blue-700 text-lg">Complete preparation with everything you need to succeed</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-orange-500 to-red-500',
                'from-green-500 to-emerald-500',
                'from-indigo-500 to-blue-500',
                'from-rose-500 to-pink-500'
              ]
              const color = colors[idx % colors.length]
              
              return (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 100}>
                  <div className="group relative h-full">
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-40 blur transition-all duration-500`}></div>

                    {/* Card */}
                    <div className="relative h-full bg-white rounded-2xl p-8 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 flex flex-col shadow-md group-hover:shadow-2xl">
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        {/* Icon container with animation */}
                        <div className={`inline-flex items-center justify-center mb-4 p-3 bg-gradient-to-br ${color} rounded-xl relative group/icon`}>
                          <div className="absolute inset-0 bg-white/30 rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                          <BenefitIcon className="w-6 h-6 text-white relative z-10 group-hover/icon:scale-125 group-hover/icon:rotate-12 transition-all duration-300" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                          {benefit.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {benefit.desc}
                        </p>
                      </div>

                      {/* Bottom accent bar */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl`}></div>

                      {/* Arrow icon on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900">Ready to Start Learning?</h2>
            <Lightbulb className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-600 mb-8 text-lg">Join thousands of students preparing for their exams. Start for free today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary text-base">
              Start Free Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/batches" className="btn btn-outline text-base">
              Explore Batches
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
