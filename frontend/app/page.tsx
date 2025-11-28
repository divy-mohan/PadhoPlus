'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import BatchCard from '@/components/BatchCard'
import ScrollAnimation from '@/components/ScrollAnimation'
import HowItWorksAnimated from '@/components/HowItWorksAnimated'
import HorizontalScroll from '@/components/HorizontalScroll'
import AnimatedCounter from '@/components/AnimatedCounter'
import { Zap, Users, Shield, BookMarked, MessageSquare, ArrowRight, CheckCircle, Award, Lightbulb, BookOpen, Target, Brain, Play, DollarSign, UserCheck, Sparkles, Layers, Star, Gift, Smile, Clock, MessageCircle, Heart, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { apiEndpoints } from '@/utils/api'



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
    icon: ArrowUpRight,
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

const examCategoriesConfig = [
  {
    id: 'neet',
    name: 'NEET',
    icon: Target,
    gradient: 'from-red-500 to-pink-500',
    classLevels: ['Class 11', 'Class 12', 'Dropper']
  },
  {
    id: 'jee_main',
    name: 'IIT JEE',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
    classLevels: ['Class 11', 'Class 12', 'Dropper']
  },
  {
    id: 'foundation',
    name: 'Foundation',
    icon: BookOpen,
    gradient: 'from-green-500 to-emerald-500',
    classLevels: ['Class 9-10']
  },
  {
    id: 'boards',
    name: 'Board Exams',
    icon: Award,
    gradient: 'from-yellow-500 to-orange-500',
    classLevels: ['Class 10', 'Class 12']
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Arjun Kumar',
    exam: 'IIT JEE',
    rank: 'AIR 47',
    year: 2024,
    quote: 'PadhoPlus transformed my JEE preparation. The structured content and doubt support were exactly what I needed to crack AIR 47. Best investment in my education!',
    image: 'https://i.pravatar.cc/150?img=12',
    featured: true
  },
  {
    id: 2,
    name: 'Priya Singh',
    exam: 'NEET',
    rank: 'AIR 132',
    year: 2024,
    quote: 'The video lectures and daily practice problems kept me on track. I could never have scored 710 without PadhoPlus. Highly recommended for NEET aspirants!',
    image: 'https://i.pravatar.cc/150?img=47',
    featured: true
  },
  {
    id: 3,
    name: 'Rohit Patel',
    exam: 'IIT JEE',
    rank: 'AIR 156',
    year: 2024,
    quote: 'The analytics dashboard showed me exactly where I was weak. The personalized study plan helped me improve from 45% to 89% in just 6 months!',
    image: 'https://i.pravatar.cc/150?img=33',
    featured: true
  },
  {
    id: 4,
    name: 'Sakshi Sharma',
    exam: 'NEET',
    rank: 'AIR 89',
    year: 2024,
    quote: 'The 1:1 doubt support was a game-changer. I got my doubts cleared instantly, and the faculty guidance was invaluable. PadhoPlus is worth every penny!',
    image: 'https://i.pravatar.cc/150?img=25',
    featured: true
  },
  {
    id: 5,
    name: 'Vikram Singh',
    exam: 'IIT JEE',
    rank: 'AIR 203',
    year: 2024,
    quote: 'From zero confidence to AIR 203 - that\'s the PadhoPlus effect! The live classes and recorded sessions made learning flexible and effective.',
    image: 'https://i.pravatar.cc/150?img=21',
    featured: false
  },
  {
    id: 6,
    name: 'Anjali Verma',
    exam: 'NEET',
    rank: 'AIR 156',
    year: 2024,
    quote: 'Affordable quality education is no longer a dream. PadhoPlus proves that you don\'t need expensive coaching to succeed. Grateful forever!',
    image: 'https://i.pravatar.cc/150?img=58',
    featured: false
  }
]

export default function Home() {
  const [batchesByCategory, setBatchesByCategory] = useState<any>({})
  const [featuredBatches, setFeaturedBatches] = useState<any[]>([])

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(apiEndpoints.batches(), {
          credentials: 'include'
        })
        if (response.ok) {
          const data = await response.json()
          const batches = data.results || data
          
          // Get featured batches
          const featured = batches.filter((b: any) => b.is_featured).slice(0, 4)
          setFeaturedBatches(featured)
          
          // Group batches by exam type
          const grouped: any = {}
          examCategoriesConfig.forEach(cat => {
            grouped[cat.id] = {}
            cat.classLevels.forEach(level => {
              grouped[cat.id][level] = batches.filter(
                (b: any) => b.target_exam === cat.id && b.target_class === level
              )
            })
          })
          setBatchesByCategory(grouped)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching batches:', error.message)
        }
      }
    }
    fetchBatches()
  }, [])
  
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
          
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-6">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 100}>
                  <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-4 lg:p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                    <div className="flex justify-center mb-1.5 sm:mb-3 lg:mb-4 p-1 sm:p-2 lg:p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg w-fit mx-auto">
                      <FeatureIcon className="w-3 sm:w-5 lg:w-6 h-3 sm:h-5 lg:h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-2 text-center text-[10px] sm:text-sm lg:text-lg leading-tight">{feature.title}</h3>
                    <p className="text-[8px] sm:text-sm text-gray-600 text-center leading-tight flex-1 hidden sm:block">{feature.description}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Animated */}
      <HowItWorksAnimated />

      {/* Exam Categories Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Layers className="w-8 h-8 text-blue-600" />
                <h2 className="text-4xl font-bold text-gray-900">Exam Categories</h2>
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-600 text-lg">Choose your exam and get prepared with our comprehensive courses</p>
            </div>
          </ScrollAnimation>

          <div className="space-y-12">
            {examCategoriesConfig.map((category, idx) => {
              const CategoryIcon = category.icon
              const categoryBatches = batchesByCategory[category.id] || {}
              
              return (
                <ScrollAnimation key={category.id} type="fade-up" delay={idx * 100}>
                  <div className="group relative">
                    {/* Category Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-br ${category.gradient} rounded-lg relative group/icon`}>
                          <div className="absolute inset-0 bg-white/30 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                          <CategoryIcon className="w-6 h-6 text-white relative z-10 group-hover/icon:scale-125 group-hover/icon:rotate-12 transition-all duration-300" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">Choose your class level and start learning</p>
                        </div>
                      </div>
                    </div>

                    {/* Class Level Groups - Horizontal Scroll on Mobile */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.classLevels.map((classLevel) => {
                        const classBatches = categoryBatches[classLevel] || []
                        return (
                          <div key={classLevel} className="relative h-full">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-500`}></div>
                            
                            <div className="relative bg-white rounded-lg p-5 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm group-hover:shadow-md flex flex-col h-full">
                              {/* Class Level Header */}
                              <div className="mb-4 pb-3 border-b border-gray-100">
                                <h4 className={`text-base font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300`}>
                                  {classLevel}
                                </h4>
                              </div>

                              {/* Batches for this Class Level */}
                              <div className="flex-1 space-y-2 mb-4">
                                {classBatches.length > 0 ? (
                                  classBatches.map((batch: any) => (
                                    <Link
                                      key={batch.id}
                                      href={`/batch/${batch.slug}`}
                                      className="block text-sm text-gray-700 hover:text-blue-600 hover:font-semibold truncate transition-all group/batch"
                                    >
                                      <span className="text-xs text-gray-500 mr-1">→</span>
                                      {batch.name}
                                    </Link>
                                  ))
                                ) : (
                                  <p className="text-xs text-gray-400 italic">Coming soon</p>
                                )}
                              </div>

                              {/* Explore Button */}
                              <Link 
                                href={`/batches?exam=${category.id}&class=${classLevel.replace(/[\s-]/g, '_')}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-600 font-semibold hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 transition-all duration-300 group/btn w-full justify-center"
                              >
                                View All
                                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                              </Link>

                              {/* Bottom accent bar */}
                              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg`}></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Mobile Horizontal Scroll */}
                    <div className="md:hidden w-full overflow-hidden">
                      <HorizontalScroll showArrows={true}>
                        {category.classLevels.map((classLevel) => {
                          const classBatches = categoryBatches[classLevel] || []
                          return (
                            <div key={classLevel} className="flex-shrink-0 w-72 sm:w-96 relative">
                              <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-lg opacity-0 group-hover:opacity-30 blur transition-all duration-500`}></div>
                              
                              <div className="relative bg-white rounded-lg p-5 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm group-hover:shadow-md h-full flex flex-col">
                                {/* Class Level Header */}
                                <div className="mb-4 pb-3 border-b border-gray-100">
                                  <h4 className={`text-base font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300`}>
                                    {classLevel}
                                  </h4>
                                </div>

                                {/* Batches for this Class Level */}
                                <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-32">
                                  {classBatches.length > 0 ? (
                                    classBatches.map((batch: any) => (
                                      <Link
                                        key={batch.id}
                                        href={`/batch/${batch.slug}`}
                                        className="block text-xs sm:text-sm text-gray-700 hover:text-blue-600 hover:font-semibold truncate transition-all"
                                      >
                                        <span className="text-xs text-gray-500 mr-1">→</span>
                                        {batch.name}
                                      </Link>
                                    ))
                                  ) : (
                                    <p className="text-xs text-gray-400 italic">Coming soon</p>
                                  )}
                                </div>

                                {/* Explore Button */}
                                <Link 
                                  href={`/batches?exam=${category.id}&class=${classLevel.replace(/[\s-]/g, '_')}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-600 font-semibold hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 transition-all duration-300 w-full justify-center"
                                >
                                  View All
                                  <ArrowRight className="w-3 h-3" />
                                </Link>

                                {/* Bottom accent bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg`}></div>
                              </div>
                            </div>
                          )
                        })}
                      </HorizontalScroll>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
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

          <div className="grid grid-cols-3 gap-1.5 sm:gap-3 lg:gap-6">
            {[
              { icon: Users, label: '10,000+', text: 'Active Students', color: 'from-blue-500 to-cyan-500' },
              { icon: Award, label: '500+', text: 'Expert Lectures', color: 'from-purple-500 to-pink-500' },
              { icon: Lightbulb, label: '100%', text: 'Success Rate', color: 'from-orange-500 to-red-500' }
            ].map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                  <div className="group relative h-full">
                    {/* Glow effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-lg sm:rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500`}></div>
                    
                    {/* Card */}
                    <div className="relative bg-white rounded-lg sm:rounded-2xl p-2 sm:p-3 md:p-5 border border-blue-200 group-hover:border-blue-400 transition-all duration-300 shadow-lg group-hover:shadow-2xl h-[110px] sm:h-[110px] md:h-[140px] flex flex-col justify-center items-center gap-0.5 sm:gap-1">
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon container */}
                        <div className={`inline-flex items-center justify-center mb-0.5 sm:mb-1 md:mb-2 p-1 sm:p-1.5 md:p-3 bg-gradient-to-br ${stat.color} rounded-full relative group/icon`}>
                          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                          <StatIcon className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-white relative z-10 group-hover/icon:scale-125 group-hover/icon:rotate-12 transition-all duration-300" />
                        </div>

                        {/* Animated counter */}
                        <div className="mb-0">
                          <h3 className={`text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}>
                            <AnimatedCounter value={stat.label} duration={2500} />
                          </h3>
                        </div>

                        {/* Text */}
                        <p className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300 text-[10px] sm:text-xs md:text-sm line-clamp-2">
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
          <div className="mt-8 sm:mt-12 grid grid-cols-3 sm:grid-cols-3 gap-1.5 sm:gap-3 md:gap-4">
            {[
              { number: '98%', label: 'Student Satisfaction', icon: Smile, color: 'text-green-500' },
              { number: '50K+', label: 'Problems Solved', icon: CheckCircle, color: 'text-blue-500' },
              { number: '24/7', label: 'Doubt Support', icon: Clock, color: 'text-orange-500' }
            ].map((item, idx) => {
              const ItemIcon = item.icon
              return (
                <ScrollAnimation key={idx} type="blur-fade" delay={idx * 100}>
                  <div className="bg-blue-100/50 backdrop-blur-sm border border-blue-300 rounded-lg p-2 sm:p-3 md:p-4 text-center hover:bg-blue-100 transition-all duration-300 group cursor-pointer flex flex-col sm:flex-row items-center gap-2 sm:gap-3 min-h-[80px] sm:min-h-auto">
                    <ItemIcon className={`w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 ${item.color} flex-shrink-0`} />
                    <div className="text-center sm:text-left flex-1">
                      <div className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text group-hover:scale-110 transition-transform duration-300 inline-block">
                        {item.number}
                      </div>
                      <p className="text-blue-700 text-[10px] sm:text-xs mt-0.5 group-hover:text-blue-900 transition-colors duration-300">{item.label}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
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

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
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
                    <div className="relative h-full bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 flex flex-col shadow-md group-hover:shadow-2xl">
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-lg sm:rounded-2xl bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        {/* Icon container with animation */}
                        <div className={`inline-flex items-center justify-center mb-3 sm:mb-4 p-2 sm:p-3 bg-gradient-to-br ${color} rounded-lg sm:rounded-xl relative group/icon`}>
                          <div className="absolute inset-0 bg-white/30 rounded-lg sm:rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                          <BenefitIcon className="w-5 sm:w-6 h-5 sm:h-6 text-white relative z-10 group-hover/icon:scale-125 group-hover/icon:rotate-12 transition-all duration-300" />
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                          {benefit.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                          {benefit.desc}
                        </p>
                      </div>

                      {/* Bottom accent bar */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg sm:rounded-b-2xl`}></div>

                      {/* Arrow icon on hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-20 w-80 h-80 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollAnimation type="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Heart className="w-8 h-8 text-red-500" />
                <h2 className="text-4xl font-bold text-gray-900">Success Stories from Students</h2>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-gray-600 text-lg">Thousands of students have achieved their dreams with PadhoPlus</p>
            </div>
          </ScrollAnimation>

          {/* Featured Testimonials Carousel - Horizontal Scroll on Mobile */}
          <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.filter((_, idx) => idx < 3).map((testimonial, idx) => (
              <ScrollAnimation key={testimonial.id} type="zoom-in" delay={idx * 100}>
                <div className="group relative h-full">
                  {/* Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500"></div>

                  {/* Card */}
                  <div className="relative h-full bg-white rounded-2xl p-6 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 shadow-md group-hover:shadow-2xl flex flex-col">
                    {/* Quote Icon */}
                    <MessageCircle className="w-6 h-6 text-purple-500 mb-3" />

                    {/* Quote */}
                    <p className="text-gray-700 italic mb-4 flex-1 text-sm leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Divider */}
                    <div className="h-0.5 bg-gradient-to-r from-purple-200 to-pink-200 mb-4"></div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-purple-600 font-semibold">{testimonial.exam} - Rank {testimonial.rank}</p>
                      </div>
                      <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Mobile Horizontal Scroll Testimonials */}
          <div className="md:hidden mb-8 w-full overflow-hidden -mx-4 px-4">
            <HorizontalScroll showArrows={true}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-72 sm:w-96">
                  <div className="group relative h-full">
                    {/* Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-500"></div>

                    {/* Card */}
                    <div className="relative h-full bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 shadow-md group-hover:shadow-2xl flex flex-col">
                      {/* Quote Icon */}
                      <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-purple-500 mb-3" />

                      {/* Quote */}
                      <p className="text-gray-700 italic mb-4 flex-1 text-xs sm:text-sm leading-relaxed">
                        "{testimonial.quote}"
                      </p>

                      {/* Divider */}
                      <div className="h-0.5 bg-gradient-to-r from-purple-200 to-pink-200 mb-4"></div>

                      {/* Author */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <img src={testimonial.image} alt={testimonial.name} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-purple-600 font-semibold">{testimonial.exam} - {testimonial.rank}</p>
                        </div>
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </HorizontalScroll>
          </div>

          {/* Add Your Testimonial Button */}
          <div className="text-center">
            <Link href="/submit-testimonial" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Share Your Success Story
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-gray-600 text-xs mt-3">Your testimonial will be verified by our admin team</p>
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
