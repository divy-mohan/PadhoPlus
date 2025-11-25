'use client'

import Link from 'next/link'
import { BookOpen, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="text-gray-900">PadhoPlus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/batches" className="text-gray-700 hover:text-blue-600 transition">Batches</Link>
            <Link href="/notes" className="text-gray-700 hover:text-blue-600 transition">Resources</Link>
            <Link href="/faculty" className="text-gray-700 hover:text-blue-600 transition">Faculty</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
            <div className="flex gap-3">
              <Link href="/login" className="btn btn-secondary text-sm">Login</Link>
              <Link href="/register" className="btn btn-primary text-sm">Sign Up</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/batches" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Batches</Link>
            <Link href="/notes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Resources</Link>
            <Link href="/faculty" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Faculty</Link>
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">About</Link>
            <Link href="/login" className="block px-4 py-2 text-blue-600 font-medium">Login</Link>
            <Link href="/register" className="block px-4 py-2 bg-blue-600 text-white rounded-lg">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
