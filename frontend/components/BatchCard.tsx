import Link from 'next/link'
import Image from 'next/image'
import { Users, Clock, BookOpen, ArrowRight, Star, ImageOff } from 'lucide-react'

interface BatchCardProps {
  name: string
  exam: string
  startDate: string
  price: number | string
  isFree: boolean
  language: string
  faculty: string[]
  slug: string
  image?: string
}

export default function BatchCard({
  name,
  exam,
  startDate,
  price,
  isFree,
  language,
  faculty,
  slug,
  image
}: BatchCardProps) {
  const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return 'http://localhost:8000'
    }
    return process.env.NEXT_PUBLIC_API_URL || `https://${typeof window !== 'undefined' ? window.location.hostname : 'api'}`
  }

  const imageUrl = image && !image.startsWith('http') ? `${getApiUrl()}${image}` : image

  return (
    <Link href={`/batch/${slug}`}>
      <div className="card-interactive group overflow-hidden">
        {/* Image Section - Responsive with landscape orientation */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden mb-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="flex flex-col items-center gap-2">
                <ImageOff className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-500 font-medium">No image</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-smooth line-clamp-2">{name}</h3>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 font-medium">{exam}</p>
          </div>
          <span className="badge badge-primary flex-shrink-0 ml-2">{language}</span>
        </div>

        <div className="space-y-2 mb-3 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">Starts {startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{faculty.length} instructor(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Live + Tests + Support</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div>
            {isFree ? (
              <span className="text-sm font-bold text-green-600">FREE</span>
            ) : (
              <div>
                <span className="text-xl font-bold text-gray-900">₹{price}</span>
                <p className="text-xs text-gray-500">One-time</p>
              </div>
            )}
          </div>
          <div className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1 font-medium text-sm">
            Start <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
          </div>
        </div>
      </div>
    </Link>
  )
}
