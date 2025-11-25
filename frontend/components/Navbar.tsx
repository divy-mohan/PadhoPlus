'use client'

import Link from 'next/link'
import { BookOpen, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:scale-105 transition-smooth">
            <div className="p-1.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">PadhoPlus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/batches" className="text-gray-700 hover:text-blue-600 transition-smooth font-medium">Batches</Link>
            <Link href="/notes" className="text-gray-700 hover:text-blue-600 transition-smooth font-medium">Resources</Link>
            <Link href="/faculty" className="text-gray-700 hover:text-blue-600 transition-smooth font-medium">Faculty</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-smooth font-medium">About</Link>
            <div className="flex gap-3 ml-4 pl-4 border-l border-gray-200">
              <Link href="/login" className="btn btn-ghost text-sm">Login</Link>
              <Link href="/register" className="btn btn-primary text-sm">Sign Up</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-in-up">
            <Link href="/batches" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth font-medium">Batches</Link>
            <Link href="/notes" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth font-medium">Resources</Link>
            <Link href="/faculty" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth font-medium">Faculty</Link>
            <Link href="/about" className="block px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-smooth font-medium">About</Link>
            <div className="px-4 pt-2 space-y-2">
              <Link href="/login" className="block px-4 py-2 text-blue-600 text-center rounded-lg hover:bg-blue-50 font-medium">Login</Link>
              <Link href="/register" className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
