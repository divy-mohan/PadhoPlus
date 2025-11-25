import Link from 'next/link'
import { Users, Clock, BookOpen, ArrowRight } from 'lucide-react'

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
      <div className="card cursor-pointer hover:border-blue-300">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{exam}</p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {language}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Starts {startDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{faculty.length} instructor(s)</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span>Live + Recorded + Doubt Support</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-green-600">FREE</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">₹{price}</span>
            )}
          </div>
          <div className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}
