'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { BootstrapIcon } from '@/components/BootstrapIcon'
import { useAuth } from '@/context/AuthContext'

const SUBJECTS = [
  { id: 'physics', name: 'Physics', icon: 'lightbulb', color: 'from-blue-500 to-cyan-500' },
  { id: 'chemistry', name: 'Chemistry', icon: 'flask', color: 'from-green-500 to-emerald-500' },
  { id: 'biology', name: 'Biology', icon: 'heart-pulse', color: 'from-red-500 to-pink-500' },
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator', color: 'from-purple-500 to-pink-500' },
]

const TOPICS: Record<string, string[]> = {
  physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity & Magnetism', 'Modern Physics', 'Waves'],
  chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Electrochemistry', 'Chemical Bonding'],
  biology: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology', 'Plant Biology', 'Evolution'],
  mathematics: ['Algebra', 'Calculus', 'Trigonometry', 'Geometry', 'Statistics', 'Coordinate Geometry'],
}

const PRIORITIES = [
  { id: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300', description: 'No rush, can wait a day' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300', description: 'Need answer today' },
  { id: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300', description: 'Urgent, exam soon!' },
]

export default function AskDoubtPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [priority, setPriority] = useState('medium')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/doubt/ask')
    }
  }, [isAuthenticated, authLoading, router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!subject) newErrors.subject = 'Please select a subject'
    if (!title.trim()) newErrors.title = 'Please enter a title for your doubt'
    if (title.trim().length < 10) newErrors.title = 'Title should be at least 10 characters'
    if (!description.trim()) newErrors.description = 'Please describe your doubt'
    if (description.trim().length < 30) newErrors.description = 'Description should be at least 30 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024)
    if (validFiles.length < files.length) {
      setErrors(prev => ({ ...prev, images: 'Some files were too large (max 5MB)' }))
    }
    setImages(prev => [...prev, ...validFiles].slice(0, 5))
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('subject_id', subject)
      if (topic) formData.append('topic', topic)
      formData.append('priority', priority)
      formData.append('title', title.trim())
      formData.append('description', description.trim())
      if (images[0]) formData.append('image', images[0])

      const response = await fetch('/backend/api/doubts/', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => router.push('/doubt'), 2000)
      } else {
        const data = await response.json()
        setErrors({ submit: data.error || 'Failed to post doubt. Please try again.' })
      }
    } catch (error) {
      console.error('Error posting doubt:', error)
      setErrors({ submit: 'Network error. Please check your connection.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center p-12 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BootstrapIcon name="check-circle-fill" className="text-5xl text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Doubt Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">Our expert mentors will respond to your question soon.</p>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Redirecting to doubt portal...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Ask a Doubt', href: '/doubt/ask' }
      ]} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <BootstrapIcon name="question-circle" className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask Your Doubt</h1>
          <p className="text-gray-600">Be specific and detailed for the best answers from our experts</p>
        </div>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <BootstrapIcon name="exclamation-circle" className="text-xl text-red-600" />
            <p className="text-red-800">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BootstrapIcon name="info-circle" className="text-xl text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Tips for getting better answers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <BootstrapIcon name="check2-circle" className="text-blue-600 mt-0.5" />
                <span className="text-blue-800">Be clear and specific about what you don't understand</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <BootstrapIcon name="check2-circle" className="text-blue-600 mt-0.5" />
                <span className="text-blue-800">Include relevant formulas or equations if applicable</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <BootstrapIcon name="check2-circle" className="text-blue-600 mt-0.5" />
                <span className="text-blue-800">Upload images of diagrams or handwritten work</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <BootstrapIcon name="check2-circle" className="text-blue-600 mt-0.5" />
                <span className="text-blue-800">Set correct priority to get timely responses</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BootstrapIcon name="book" className="text-blue-600" />
              Select Subject *
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => { setSubject(s.id); setTopic(''); setErrors(prev => ({ ...prev, subject: '' })) }}
                  className={`group relative p-4 rounded-xl border-2 font-semibold text-center transition-all duration-300 ${
                    subject === s.id 
                      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' 
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center transition-all ${
                    subject === s.id ? `bg-gradient-to-r ${s.color}` : 'bg-gray-100 group-hover:bg-blue-100'
                  }`}>
                    <BootstrapIcon name={s.icon} className={`text-2xl ${subject === s.id ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  {s.name}
                  {subject === s.id && (
                    <div className="absolute top-2 right-2">
                      <BootstrapIcon name="check-circle-fill" className="text-blue-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {errors.subject && <p className="mt-2 text-sm text-red-600">{errors.subject}</p>}
          </div>

          {subject && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BootstrapIcon name="bookmark" className="text-blue-600" />
                Select Topic (Optional)
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOPICS[subject]?.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(topic === t ? '' : t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      topic === t
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BootstrapIcon name="exclamation-triangle" className="text-blue-600" />
              Priority Level
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRIORITIES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPriority(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    priority === p.id
                      ? `${p.color} border-current shadow-md`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold mb-1">{p.label}</div>
                  <div className={`text-xs ${priority === p.id ? '' : 'text-gray-500'}`}>{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BootstrapIcon name="pencil" className="text-blue-600" />
              Your Question
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: '' })) }}
                  placeholder="e.g., How to solve kinematics problems with relative motion?"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={200}
                />
                <div className="flex justify-between mt-1">
                  {errors.title ? (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Write a clear, specific question</p>
                  )}
                  <span className="text-sm text-gray-400">{title.length}/200</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: '' })) }}
                  placeholder="Explain your doubt in detail. What have you tried? Where are you stuck?"
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                    errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  maxLength={5000}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <p className="text-sm text-red-600">{errors.description}</p>
                  ) : (
                    <p className="text-sm text-gray-500">The more detail you provide, the better the answer</p>
                  )}
                  <span className="text-sm text-gray-400">{description.length}/5000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BootstrapIcon name="image" className="text-blue-600" />
              Attach Images (Optional)
            </h3>
            
            <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 cursor-pointer transition-colors bg-gray-50 hover:bg-blue-50">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <BootstrapIcon name="cloud-upload" className="text-2xl text-blue-600" />
              </div>
              <div className="text-center">
                <span className="text-blue-600 font-medium">Click to upload</span>
                <span className="text-gray-500"> or drag and drop</span>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB (max 5 images)</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {errors.images && <p className="mt-2 text-sm text-red-600">{errors.images}</p>}

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                    >
                      <BootstrapIcon name="x" className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Posting...
                </>
              ) : (
                <>
                  <BootstrapIcon name="send" className="text-lg" />
                  Post Your Doubt
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
