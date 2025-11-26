'use client'

import { Trophy } from 'lucide-react'

interface Achievement {
  id?: string | number
  name: string
  icon: string
  earnedAt: string
}

interface AchievementCardProps {
  achievements: Achievement[]
}

export default function AchievementCard({ achievements }: AchievementCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-emerald-600" />
        <h3 className="text-lg font-semibold text-slate-900">Achievements</h3>
      </div>

      {achievements && achievements.length > 0 ? (
        <div className="space-y-3">
          {achievements.slice(0, 5).map((ach, idx) => (
            <div key={ach.id || idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-slate-200 transition-all">
              <span className="text-2xl">{ach.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{ach.name}</p>
                <p className="text-xs text-slate-500">{ach.earnedAt}</p>
              </div>
            </div>
          ))}
          {achievements.length > 5 && (
            <p className="text-xs text-slate-500 text-center pt-2">+{achievements.length - 5} more</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">No achievements yet. Start learning!</p>
      )}
    </div>
  )
}
