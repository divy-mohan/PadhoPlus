'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { BootstrapIcon } from '@/components/BootstrapIcon'

const SUBJECTS = [
  { id: 'physics', name: 'Physics', icon: 'lightbulb' },
  { id: 'chemistry', name: 'Chemistry', icon: 'flask' },
  { id: 'biology', name: 'Biology', icon: 'heart-pulse' },
  { id: 'mathematics', name: 'Mathematics', icon: 'calculator' },
]

const TOPICS: Record<string, string[]> = {
  physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity & Magnetism'],
  chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
  biology: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology'],
  mathematics: ['Algebra', 'Calculus', 'Trigonometry', 'Geometry'],
}

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', color: 'bg-green-100 text-green-700' },
  { id: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'hard', label: 'Hard', color: 'bg-red-100 text-red-700' },
]

export default function AskDoubtPage() {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject || !title || !description) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('subject', subject)
      formData.append('topic', topic)
      formData.append('difficulty', difficulty)
      formData.append('title', title)
      formData.append('question', description)
      images.forEach((img, idx) => formData.append(`image_${idx}`, img))

      const response = await fetch('http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api/doubts/', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      if (response.ok) {
        alert('Doubt posted successfully! Our experts will respond soon.')
        router.push('/doubt')
      } else {
        alert('Failed to post doubt')
      }
    } catch (error) {
      console.error('Error posting doubt:', error)
      alert('Unable to post doubt')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[
        { label: 'Doubts', href: '/doubt' },
        { label: 'Ask a Doubt', href: '/doubt/ask' }
      ]} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ask Your Doubt</h1>
          <p className="text-gray-600 text-lg">Be specific and detailed for the best answers from our experts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 rounded-xl border border-gray-200">
          {/* Alert */}
          <div className="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <BootstrapIcon name="info-circle" className="text-xl text-blue-600 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Tips for getting better answers:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Be clear and specific about what you don't understand</li>
                <li>Include relevant formulas or equations if applicable</li>
                <li>Upload images of diagrams or handwritten work</li>
                <li>Select the correct difficulty level</li>
              </ul>
            </div>
          </div>

          {/* Subject & Topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Subject *</label>
              <div className="grid grid-cols-2 gap-3">
                {SUBJECTS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setSubject(s.id); setTopic('') }}
                    className={`p-4 rounded-lg border-2 font-semibold text-center transition-all ${
                      subject === s.id 
                        ? 'border-blue-600 bg-blue-50 text-blue-600' 
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <BootstrapIcon name={s.icon} className="block mx-auto mb-1 text-2xl" />
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Topic</label>
              {subject ? (
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a topic</option>
                  {TOPICS[subject]?.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              ) : (
                <select disabled className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500">
                  <option>Select subject first</option>
                </select>
              )}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Difficulty Level</label>
            <div className="flex gap-3">
              {DIFFICULTIES.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDifficulty(d.id)}
                  className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${
                    difficulty === d.id
                      ? `${d.color} border-current`
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What is your doubt about?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your doubt in detail..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">{description.length} / 5000 characters</p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Upload Images</label>
            <label className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
              <BootstrapIcon name="cloud-upload" className="text-xl text-gray-400" />
              <span className="text-gray-600">Click to upload or drag and drop</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Upload ${idx}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
            >
              <BootstrapIcon name="send" className="text-lg" />
              {submitting ? 'Posting...' : 'Post Your Doubt'}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
