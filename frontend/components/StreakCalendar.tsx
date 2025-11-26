'use client'

import { Zap } from 'lucide-react'

interface StreakCalendarProps {
  days: number
}

export default function StreakCalendar({ days }: StreakCalendarProps) {
  const weeks = Math.ceil(days / 7)
  const calendarDays = Array.from({ length: weeks * 7 }, (_, i) => i + 1 <= days)

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Current Streak</p>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-slate-900">{days}</span>
            <span className="text-sm text-slate-600">days</span>
          </div>
        </div>
        <Zap className="w-10 h-10 text-amber-600" />
      </div>

      <div className="grid gap-1">
        {Array.from({ length: weeks }).map((_, week) => (
          <div key={week} className="flex gap-1">
            {Array.from({ length: 7 }).map((_, day) => {
              const index = week * 7 + day
              const isActive = calendarDays[index]
              return (
                <div
                  key={day}
                  className={`flex-1 aspect-square rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm'
                      : 'bg-slate-200'
                  }`}
                ></div>
              )
            })}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-4">Keep going!</p>
    </div>
  )
}
