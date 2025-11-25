import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: string
}

export default function FeatureCard({ icon: Icon, title, description, delay = '' }: FeatureCardProps) {
  return (
    <div className={`card hover-lift group ${delay}`}>
      <div className="flex justify-center mb-4 p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg group-hover:from-blue-200 group-hover:to-blue-100 transition-smooth w-fit">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-smooth">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
