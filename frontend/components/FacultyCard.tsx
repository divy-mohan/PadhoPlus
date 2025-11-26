'use client'

import { Star } from 'lucide-react'

interface FacultyCardProps {
  name: string
  subject: string
  experience: string
  expertise: string
  initials?: string
  color?: string
}

export default function FacultyCard({
  name,
  subject,
  experience,
  expertise,
  initials = 'FA',
  color = 'from-blue-600 to-blue-700'
}: FacultyCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${color} h-24 relative`}>
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      </div>

      {/* Profile section */}
      <div className="px-6 pb-6 -mt-8 relative z-10">
        {/* Avatar */}
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 shadow-lg border-4 border-white`}>
          {initials}
        </div>

        {/* Info */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <p className="text-sm font-semibold text-blue-600">{subject}</p>
        </div>

        {/* Details */}
        <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex justify-between">
            <span className="font-medium">Experience:</span>
            <span className="font-semibold text-gray-900">{experience}</span>
          </div>
          <div>
            <span className="font-medium">Expertise:</span>
            <p className="text-gray-700 mt-1 leading-relaxed">{expertise}</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all hover:scale-105 active:scale-95">
          View Profile
        </button>
      </div>
    </div>
  )
}
