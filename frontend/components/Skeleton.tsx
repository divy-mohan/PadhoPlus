export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-100 rounded-lg p-6 animate-pulse ${className}`} />
}

export function SkeletonButton({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-300 rounded-lg h-11 animate-pulse ${className}`} />
}
