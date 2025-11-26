'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { useSkeleton } from '@/context/SkeletonContext'
import { ArrowLeft } from 'lucide-react'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { isLoading } = useSkeleton()
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    bio: '',
    target_exam: '',
    school_college: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated && user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        bio: (user as any).bio || '',
        target_exam: (user as any).target_exam || '',
        school_college: (user as any).school_college || ''
      })
    }
  }, [isAuthenticated, user, authLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/users/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/profile')
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError('Unable to update profile. Please try again.')
      console.error('Update error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || authLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200">
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">Profile updated successfully! Redirecting...</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-slate-100 text-slate-600 cursor-not-allowed"
              placeholder="Email"
            />
            <p className="text-xs text-slate-500 mt-2">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="+91 XXXXXXXXXX"
            />
          </div>

          {/* Target Exam */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Target Exam</label>
            <select
              name="target_exam"
              value={formData.target_exam}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Select target exam</option>
              <option value="JEE">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="NEET">NEET</option>
              <option value="CBSE">CBSE</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* School/College */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">School/College</label>
            <input
              type="text"
              name="school_college"
              value={formData.school_college}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Your school or college name"
            />
          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-900 mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-slate-500 mt-2">{formData.bio.length}/500 characters</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
