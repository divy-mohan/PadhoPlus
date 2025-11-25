import Link from 'next/link'
import { Users, Clock, BookOpen, ArrowRight, Star } from 'lucide-react'

interface BatchCardProps {
  name: string
  exam: string
  startDate: string
  price: number | string
  isFree: boolean
  language: string
  faculty: string[]
  slug: string
}

export default function BatchCard({
  name,
  exam,
  startDate,
  price,
  isFree,
  language,
  faculty,
  slug
}: BatchCardProps) {
  return (
    <Link href={`/batch/${slug}`}>
      <div className="card-interactive group">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-smooth">{name}</h3>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-xs text-gray-500 font-medium">{exam}</p>
          </div>
          <span className="badge badge-primary">{language}</span>
        </div>

        <div className="space-y-2.5 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Starts {startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{faculty.length} instructor(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Live + Tests + Support</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-green-600">FREE</span>
            ) : (
              <div>
                <span className="text-2xl font-bold text-gray-900">₹{price}</span>
                <p className="text-xs text-gray-500">One-time access</p>
              </div>
            )}
          </div>
          <div className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1 font-medium">
            Start <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
          </div>
        </div>
      </div>
    </Link>
  )
}
