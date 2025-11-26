'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import BatchCard from '@/components/BatchCard'
import FeatureCard from '@/components/FeatureCard'
import ScrollAnimation from '@/components/ScrollAnimation'
import { Zap, Users, TrendingUp, Shield, BookMarked, MessageSquare, ArrowRight, CheckCircle, Award, Lightbulb, BookOpen, Target, Brain, Play, DollarSign, UserCheck } from 'lucide-react'
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
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose PadhoPlus?</h2>
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center animate-fade-in">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create your free account' },
              { step: 2, title: 'Choose Batch', desc: 'Pick your exam & batch' },
              { step: 3, title: 'Start Learning', desc: 'Access all resources' },
              { step: 4, title: 'Track Progress', desc: 'Get real-time insights' }
            ].map((item, idx) => (
              <div key={idx} className={`relative animate-fade-in fade-in-delay-${(idx % 4) + 1}`}>
                <div className="card text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {idx < 3 && <div className="hidden md:block absolute top-6 right-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent transform translate-x-1/2"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Batches */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Batches</h2>
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
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Users, label: '10,000+', text: 'Active Students', color: 'from-blue-600 to-blue-700' },
              { icon: Award, label: '500+', text: 'Expert Lectures', color: 'from-purple-600 to-purple-700' },
              { icon: Lightbulb, label: '100%', text: 'Success Rate', color: 'from-orange-500 to-red-500' }
            ].map((stat, idx) => (
              <div key={idx} className={`animate-fade-in fade-in-delay-${idx + 1}`}>
                <div className={`bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-white text-center transform hover:scale-110 transition-all duration-300`}>
                  <div className="flex justify-center mb-4 animate-bounce-smooth">
                    <stat.icon className="w-10 h-10 animate-star-pulse" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.label}</h3>
                  <p className="text-sm font-medium opacity-90">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation type="fade-up">
            <h2 className="text-3xl font-bold mb-4">What You Get in Every Batch</h2>
            <p className="text-blue-100 mb-12">Complete preparation with everything you need to succeed</p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              const BenefitIcon = benefit.icon;
              return (
                <div key={idx} className={`flex items-start gap-4 fade-in-delay-${(idx % 4) + 1}`}>
                  <div className="p-2 bg-blue-300 rounded-lg flex-shrink-0">
                    <BenefitIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-blue-100 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
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
