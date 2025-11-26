'use client'

import { Clock } from 'lucide-react'

interface WatchMeterProps {
  minutes: number
}

export default function WatchMeter({ minutes }: WatchMeterProps) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  const percentage = Math.min((minutes / 1000) * 100, 100)

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Watch Time</p>
          <div className="mt-3 flex items-baseline gap-1">
            {hours > 0 && (
              <>
                <span className="text-3xl font-semibold text-slate-900">{hours}</span>
                <span className="text-sm text-slate-600">h</span>
              </>
            )}
            <span className="text-3xl font-semibold text-slate-900">{mins}</span>
            <span className="text-sm text-slate-600">m</span>
          </div>
        </div>
        <Clock className="w-10 h-10 text-purple-600" />
      </div>

      <div className="space-y-2">
        <div className="w-full bg-slate-300 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-500 text-right">{minutes} minutes</p>
      </div>
    </div>
  )
}
