'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingButton from '@/components/LoadingButton'
import { User, Mail, Lock, GraduationCap, CheckCircle, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    targetExam: '',
    role: 'student'
  })
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)
    try {
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.protocol}//${window.location.hostname.split('-')[0]}-8000-${window.location.hostname.split('-').slice(1).join('-')}`
        : 'http://localhost:8000'

      const response = await fetch(`${apiUrl}/api/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          first_name: formData.name.split(' ')[0],
          last_name: formData.name.split(' ').slice(1).join(' ') || '',
          role: formData.role,
          phone: ''
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          targetExam: '',
          role: 'student'
        })
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } else {
        setError(data.email?.[0] || data.message || 'Registration failed. Please try again.')
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again later.')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join 10K+ students preparing for their exams</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">✓ Account created successfully! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="card border-2 border-gray-200 mb-6">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 text-base"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 text-base"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Exam</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  name="targetExam"
                  value={formData.targetExam}
                  onChange={handleChange}
                  className="pl-10 text-base appearance-none"
                  required
                >
                  <option value="">Select your target exam</option>
                  <option value="jee">JEE Mains/Advanced</option>
                  <option value="neet">NEET</option>
                  <option value="boards">Board Exams</option>
                  <option value="foundation">Foundation</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 text-base"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 pr-10 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300" required />
              <span className="text-sm text-gray-600">
                I agree to the <Link href="/terms" className="text-blue-600 hover:underline font-medium">Terms & Conditions</Link> and <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>
              </span>
            </label>

            <LoadingButton type="submit" loading={loading} className="text-base mb-4">
              Create Free Account
            </LoadingButton>
          </form>

          <p className="text-center text-gray-600 mb-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </Link>
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>100% free to get started</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Access 100+ free lectures</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
