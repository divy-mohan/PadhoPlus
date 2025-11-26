'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Menu, X, GraduationCap, FileText, Users, Info, LogIn, UserPlus, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/batches', label: 'Batches', icon: GraduationCap },
    { href: '/notes', label: 'Resources', icon: FileText },
    { href: '/faculty', label: 'Faculty', icon: Users },
    { href: '/about', label: 'About', icon: Info },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 pointer-events-none"></div>
      
      {/* Glassmorphism layer */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl pointer-events-none border-b border-white/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with animation */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BookOpen className="w-6 h-6 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PadhoPlus</span>
              <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">Learn Smarter</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                    active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {/* Background hover effect */}
                  <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    active ? 'bg-blue-100/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 transition-all duration-300 ${
                      active ? 'rotate-0' : 'group-hover:rotate-6 group-hover:scale-110'
                    }`} />
                    <span className="relative">
                      {link.label}
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></div>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login" 
              className="group relative px-4 py-2 rounded-lg font-semibold text-sm text-gray-700 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-2">
                <LogIn className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                Login
              </div>
            </Link>
            
            <Link 
              href="/register" 
              className="group relative px-5 py-2.5 rounded-lg font-semibold text-sm text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover:from-blue-700 group-hover:to-purple-600 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 shadow-lg group-hover:shadow-2xl transition-shadow duration-300 rounded-lg"></div>
              <div className="relative z-10 flex items-center gap-2">
                <UserPlus className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                Sign Up
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 rounded-xl transition-all duration-300 relative group"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900 relative z-10 rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-2 animate-slide-in-up">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    active ? 'text-white' : 'text-blue-600 group-hover:scale-125'
                  }`} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
            
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Link 
                href="/login" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
              <Link 
                href="/register" 
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
