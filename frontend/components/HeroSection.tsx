import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Quality Learning at the Lowest Cost
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Prepare for JEE, NEET, and board exams with structured content, doubt support, and track your progress with real-time analytics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/batches" className="btn btn-primary flex items-center justify-center gap-2">
            Explore Batches
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/demo" className="btn btn-outline flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            Watch Demo
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">10K+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Lectures</div>
          </div>
          <div className="card">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600">Free Start</div>
          </div>
        </div>
      </div>
    </section>
  )
}
