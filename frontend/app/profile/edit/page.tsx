'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LoadingSpinner from '@/components/LoadingSpinner'
import ImageCropper from '@/components/ImageCropper'
import { useAuth } from '@/context/AuthContext'
import { useSkeleton } from '@/context/SkeletonContext'
import { ArrowLeft, Upload } from 'lucide-react'

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

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated && user) {
      fetchProfileData()
    }
  }, [isAuthenticated, user, authLoading])

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          target_exam: data.target_exam || '',
          school_college: data.school_college || ''
        })
        if (data.profile_image) {
          setAvatarUrl(data.profile_image)
        }
      } else {
        setError('Unable to load profile data')
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Unable to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string
      setTempImageUrl(imageUrl)
      setShowCropper(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = async (croppedImage: string) => {
    setShowCropper(false)
    setUploading(true)
    setError(null)

    try {
      const base64String = croppedImage.split(',')[1]
      
      const response = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64String }),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setAvatarUrl(data.profile_image)
      } else {
        setError('Failed to upload profile picture')
      }
    } catch (err) {
      console.error('Avatar upload error:', err)
      setError('Unable to upload profile picture')
    } finally {
      setUploading(false)
      setTempImageUrl(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    }
  }

  if (isLoading || authLoading || loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {showCropper && tempImageUrl && (
        <ImageCropper
          imageSrc={tempImageUrl}
          onCropComplete={handleCropComplete}
          onClose={() => {
            setShowCropper(false)
            setTempImageUrl(null)
          }}
        />
      )}

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
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

          <div className="mb-8 text-center">
            <label className="block text-sm font-semibold text-slate-900 mb-4">Profile Picture</label>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl text-white">U</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={uploading}
            />
            <p className="text-xs text-slate-500 mt-4">Click the upload button to change your profile picture</p>
          </div>

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

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Save Changes
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
