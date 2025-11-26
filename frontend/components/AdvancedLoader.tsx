'use client'

import { BookOpen, Award, Lightbulb, Zap } from 'lucide-react'

export default function AdvancedLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center gap-8">
        {/* Main Animated Circle Loader */}
        <div className="relative w-32 h-32">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-purple-600 animate-spin"></div>
          
          {/* Middle rotating ring (opposite direction) */}
          <div className="absolute inset-3 rounded-full border-3 border-transparent border-b-blue-500 border-l-purple-500 animate-spin-reverse"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white animate-bounce" />
          </div>
        </div>

        {/* Floating Icons */}
        <div className="flex gap-8">
          <Award className="w-8 h-8 text-yellow-500 animate-float" style={{ animationDelay: '0s' }} />
          <Lightbulb className="w-8 h-8 text-yellow-400 animate-float" style={{ animationDelay: '0.5s' }} />
          <Zap className="w-8 h-8 text-blue-500 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        {/* Loading Text with Dots */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading your learning journey
            <span className="inline-block w-1 h-1 bg-blue-600 rounded-full ml-1 animate-pulse"></span>
            <span className="inline-block w-1 h-1 bg-blue-600 rounded-full ml-1 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
            <span className="inline-block w-1 h-1 bg-blue-600 rounded-full ml-1 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
          </h3>
          <p className="text-sm text-gray-500">Preparing premium content for you...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-progress-bar"></div>
        </div>

        {/* Success Tips */}
        <div className="flex gap-4 text-xs text-gray-600 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Expert Content</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Quality Assured</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Ready to Learn</span>
          </div>
        </div>
      </div>
    </div>
  )
}
