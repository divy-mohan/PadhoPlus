import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import BatchCard from '@/components/BatchCard'
import { Zap, Users, TrendingUp, Shield, BookMarked, MessageSquare } from 'lucide-react'

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
    slug: 'neet-2025-lakshya'
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
    slug: 'jee-advanced-prep'
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
    slug: 'class-12-physics'
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
    slug: 'foundation-math'
  },
]

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Quality Content',
    description: 'Structured curriculum by expert educators'
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Doubt Support',
    description: 'Get instant help from teachers'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Track Progress',
    description: 'Real-time analytics and performance insights'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community',
    description: 'Learn with 10K+ students'
  },
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: 'Resources',
    description: 'Notes, PDFs, PYQs, and more'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Affordable',
    description: 'Start free, pay only for what you need'
  },
]

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose PadhoPlus?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="flex justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batches Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Batches</h2>
            <p className="text-gray-600">Start your preparation with our best programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBatches.map((batch) => (
              <BatchCard key={batch.id} {...batch} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/batches" className="btn btn-primary">
              View All Batches
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 mb-8">Join thousands of students preparing for their exams.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              Sign Up Now
            </a>
            <a href="/batches" className="btn border-2 border-white text-white hover:bg-blue-700">
              Explore Batches
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
