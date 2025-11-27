'use client'

import { useState, useEffect } from 'react'
import { Layers, UserPlus, BookOpen, Zap, TrendingUp } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function HowItWorksAnimated() {
  const [phase, setPhase] = useState(0)

  const steps = [
    { 
      step: 1, 
      title: 'Sign Up', 
      desc: 'Create your free account', 
      icon: UserPlus,
      color: 'from-blue-600 to-blue-700',
      bgGlow: 'from-blue-200 to-blue-100'
    },
    { 
      step: 2, 
      title: 'Choose Batch', 
      desc: 'Pick your exam & batch', 
      icon: BookOpen,
      color: 'from-purple-600 to-purple-700',
      bgGlow: 'from-purple-200 to-purple-100'
    },
    { 
      step: 3, 
      title: 'Start Learning', 
      desc: 'Access all resources', 
      icon: Zap,
      color: 'from-pink-600 to-pink-700',
      bgGlow: 'from-pink-200 to-pink-100'
    },
    { 
      step: 4, 
      title: 'Track Progress', 
      desc: 'Get real-time insights', 
      icon: TrendingUp,
      color: 'from-green-600 to-green-700',
      bgGlow: 'from-green-200 to-green-100'
    }
  ]

  // Animation phases:
  // Phase 0: Card 0 active
  // Phase 1: Arrow 0 + Card 1 active (line glows, card 2 becomes active)
  // Phase 2: Card 1 active
  // Phase 3: Arrow 1 + Card 2 active
  // Phase 4: Card 2 active
  // Phase 5: Arrow 2 + Card 3 active
  // Phase 6: Card 3 active
  // Total cycle: 7 phases × 314ms = ~2200ms

  const PHASE_DURATION = 314 // ms per phase
  const TOTAL_PHASES = 7

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % TOTAL_PHASES)
    }, PHASE_DURATION)
    return () => clearInterval(interval)
  }, [])

  // Determine which card and arrow are active based on phase
  const getActiveCard = (idx) => {
    if (phase === 0) return idx === 0
    if (phase === 1) return idx === 1
    if (phase === 2) return idx === 1
    if (phase === 3) return idx === 2
    if (phase === 4) return idx === 2
    if (phase === 5) return idx === 3
    if (phase === 6) return idx === 3
    return false
  }

  const getActiveArrow = (idx) => {
    if (phase === 1) return idx === 0 // Arrow 0 (after card 0)
    if (phase === 3) return idx === 1 // Arrow 1 (after card 1)
    if (phase === 5) return idx === 2 // Arrow 2 (after card 2)
    return false
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation type="fade-up">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Layers className="w-8 h-8 text-purple-600" />
              <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
              <Layers className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-gray-600 text-lg">Your journey to success in 4 simple steps</p>
          </div>
        </ScrollAnimation>

        {/* Desktop view */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Container for steps with proper spacing */}
            <div className="grid grid-cols-4 gap-12 px-4">
              {steps.map((item, idx) => {
                const IconComponent = item.icon
                const isCardActive = getActiveCard(idx)
                const isArrowActive = getActiveArrow(idx)

                return (
                  <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                    <div className="relative">
                      {/* Animated connector line with arrow */}
                      {idx < steps.length - 1 && (
                        <div className="absolute top-16 left-full w-12 h-2 bg-gray-300 rounded-full overflow-hidden">
                          {/* Arrow that glows when active */}
                          <div
                            className={`absolute h-full w-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                              isArrowActive
                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white opacity-100 shadow-lg'
                                : 'bg-gray-300 text-gray-400 opacity-40'
                            }`}
                          >
                            ➜
                          </div>
                        </div>
                      )}

                      {/* Step card */}
                      <div
                        className={`relative group transition-all duration-300 ${
                          isCardActive ? 'scale-110' : 'scale-100'
                        }`}
                      >
                        {/* Glow effect when active */}
                        {isCardActive && (
                          <div className="absolute -inset-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                        )}

                        {/* Card */}
                        <div
                          className={`relative bg-white rounded-xl p-4 shadow-lg transition-all duration-300 border-2 overflow-hidden ${
                            isCardActive
                              ? 'border-blue-500 shadow-2xl'
                              : 'border-gray-100 group-hover:border-blue-300'
                          }`}
                        >
                          {/* Shine effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 ${
                            isCardActive ? 'opacity-100' : 'group-hover:opacity-100'
                          }`}></div>

                          {/* Icon container with attractive styling */}
                          <div className={`mb-3 flex justify-center transition-all duration-300`}>
                            <div
                              className={`relative p-3 rounded-full transition-all duration-300 ${
                                isCardActive
                                  ? `bg-gradient-to-br ${item.color} scale-125 shadow-lg`
                                  : `bg-gradient-to-br ${item.bgGlow} group-hover:scale-125 group-hover:shadow-lg`
                              }`}
                            >
                              {/* Icon background glow for active state */}
                              {isCardActive && (
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-100 animate-pulse"></div>
                              )}
                              
                              {/* Icon */}
                              <IconComponent
                                className={`w-8 h-8 transition-all duration-300 relative z-10 ${
                                  isCardActive
                                    ? 'text-white scale-110'
                                    : 'text-gray-700 group-hover:text-white'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Step number with animation */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg transition-all duration-300 relative overflow-hidden ${
                              isCardActive
                                ? `bg-gradient-to-br ${item.color} scale-125 shadow-2xl`
                                : `bg-gradient-to-br ${item.color} group-hover:scale-125 group-hover:shadow-2xl`
                            }`}
                          >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className={`relative z-10 transition-transform duration-300 ${
                              isCardActive ? 'scale-110' : 'group-hover:scale-110'
                            }`}>
                              {item.step}
                            </span>
                          </div>

                          {/* Step content */}
                          <div className="text-center relative z-10">
                            <h3 className={`font-bold mb-1 text-base transition-colors duration-300 ${
                              isCardActive
                                ? 'text-blue-600'
                                : 'text-gray-900 group-hover:text-blue-600'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-xs transition-colors duration-300 ${
                              isCardActive
                                ? 'text-gray-700 font-medium'
                                : 'text-gray-600 group-hover:text-gray-700'
                            }`}>
                              {item.desc}
                            </p>
                          </div>

                          {/* Animated bottom accent */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-300 ${
                            isCardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-6">
          {steps.map((item, idx) => {
            const IconComponent = item.icon
            const isCardActive = getActiveCard(idx)

            return (
              <ScrollAnimation key={idx} type="fade-up" delay={idx * 100}>
                <div className={`relative transition-all duration-300 ${
                  isCardActive ? 'scale-105' : 'scale-100'
                }`}>
                  {isCardActive && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                  )}

                  <div
                    className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 border-2 ${
                      isCardActive
                        ? 'border-blue-500 shadow-2xl'
                        : 'border-gray-100'
                    }`}
                  >
                    {/* Icon for mobile */}
                    <div className={`mb-4 flex justify-center`}>
                      <div
                        className={`p-3 rounded-full transition-all duration-300 ${
                          isCardActive
                            ? `bg-gradient-to-br ${item.color} scale-110 shadow-lg`
                            : `bg-gradient-to-br ${item.bgGlow}`
                        }`}
                      >
                        <IconComponent
                          className={`w-6 h-6 transition-all duration-300 ${
                            isCardActive ? 'text-white' : 'text-gray-700'
                          }`}
                        />
                      </div>
                    </div>

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg transition-all duration-300 bg-gradient-to-br ${
                      isCardActive ? item.color + ' scale-110' : item.color
                    }`}>
                      {item.step}
                    </div>

                    <h3 className={`font-bold mb-2 text-lg transition-colors duration-300 ${
                      isCardActive ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isCardActive ? 'text-gray-700 font-medium' : 'text-gray-600'
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Vertical connector for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div className={`w-1 h-8 rounded-full transition-all duration-300 ${
                        getActiveArrow(idx)
                          ? 'bg-gradient-to-b from-blue-600 to-purple-600 shadow-lg'
                          : 'bg-gray-300'
                      }`}></div>
                    </div>
                  )}
                </div>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-3 mt-12">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                getActiveCard(idx)
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
