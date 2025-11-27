'use client'

import { useState, useEffect } from 'react'
import { Layers, UserPlus, BookOpen, Lightbulb, TrendingUp } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function HowItWorksAnimated() {
  const [activeStep, setActiveStep] = useState(0)
  const [animatingArrow, setAnimatingArrow] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps = [
    { step: 1, title: 'Sign Up', desc: 'Create your free account', Icon: UserPlus, color: 'from-blue-600 to-blue-700' },
    { step: 2, title: 'Choose Batch', desc: 'Pick your exam & batch', Icon: BookOpen, color: 'from-purple-600 to-purple-700' },
    { step: 3, title: 'Start Learning', desc: 'Access all resources', Icon: Lightbulb, color: 'from-pink-600 to-pink-700' },
    { step: 4, title: 'Track Progress', desc: 'Get real-time insights', Icon: TrendingUp, color: 'from-green-600 to-green-700' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const newStep = (prev + 1) % steps.length
        if (newStep === 0) {
          // Reset completed steps when cycling back
          setCompletedSteps([])
        } else {
          // Mark previous steps as completed
          setCompletedSteps(Array.from({ length: prev }, (_, i) => i))
        }
        return newStep
      })
      setAnimatingArrow((prev) => (prev + 1) % (steps.length - 1))
    }, 2200)
    return () => clearInterval(interval)
  }, [])

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
                const StepIcon = item.Icon
                const isCompleted = completedSteps.includes(idx)
                const isActive = activeStep === idx
                
                return (
                  <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                    <div className="relative">
                      {/* Animated connector line with arrow above */}
                      {idx < steps.length - 1 && (
                        <div className={`absolute top-16 left-full w-12 h-2 rounded-full overflow-hidden transition-all duration-300 ${
                          isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                        }`}>
                          {/* Moving arrow animation */}
                          <div
                            className={`absolute h-full transition-all duration-1200 ease-in-out font-bold text-white flex items-center justify-center text-lg ${
                              isCompleted ? 'bg-blue-600' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'
                            }`}
                            style={{
                              width: '100%',
                              left: animatingArrow === idx ? '0%' : '-100%',
                              opacity: animatingArrow === idx ? 1 : 0.2,
                            }}
                          >
                            ➜
                          </div>
                        </div>
                      )}

                      {/* Step card */}
                      <div
                        className={`relative group transition-all duration-500 ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                      >
                        {/* Glow effect when active */}
                        {isActive && (
                          <div className="absolute -inset-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                        )}

                        {/* Card */}
                        <div
                          className={`relative bg-white rounded-xl p-4 shadow-lg transition-all duration-500 border-2 overflow-hidden ${
                            isActive
                              ? 'border-blue-500 shadow-2xl'
                              : isCompleted
                              ? 'border-blue-400 shadow-md'
                              : 'border-gray-100 group-hover:border-blue-300'
                          }`}
                        >
                          {/* Shine effect */}
                          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'group-hover:opacity-100'
                          }`}></div>

                          {/* Step number with animation */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3 shadow-lg transition-all duration-500 relative overflow-hidden bg-gradient-to-br ${
                              item.color
                            } ${
                              isActive ? 'scale-125 shadow-2xl' : isCompleted ? 'scale-110' : 'group-hover:scale-125 group-hover:shadow-2xl'
                            }`}
                          >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className={`relative z-10 transition-transform duration-500 ${
                              isActive ? 'scale-110' : 'group-hover:scale-110'
                            }`}>
                              {item.step}
                            </span>
                          </div>

                          {/* Icon display */}
                          <div className="flex justify-center mb-2">
                            <StepIcon className={`w-6 h-6 transition-all duration-500 ${
                              isActive || isCompleted ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>

                          {/* Step content */}
                          <div className="text-center relative z-10">
                            <h3 className={`font-bold mb-1 text-base transition-colors duration-500 ${
                              isActive
                                ? 'text-blue-600'
                                : isCompleted
                                ? 'text-blue-600'
                                : 'text-gray-900 group-hover:text-blue-600'
                            }`}>
                              {item.title}
                            </h3>
                            <p className={`text-xs transition-colors duration-500 ${
                              isActive
                                ? 'text-gray-700 font-medium'
                                : isCompleted
                                ? 'text-gray-600'
                                : 'text-gray-600 group-hover:text-gray-700'
                            }`}>
                              {item.desc}
                            </p>
                          </div>

                          {/* Animated bottom accent */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
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
            const StepIcon = item.Icon
            const isCompleted = completedSteps.includes(idx)
            const isActive = activeStep === idx
            
            return (
              <ScrollAnimation key={idx} type="fade-up" delay={idx * 100}>
                <div className={`relative transition-all duration-500 ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}>
                  {isActive && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                  )}

                  <div
                    className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 border-2 ${
                      isActive
                        ? 'border-blue-500 shadow-2xl'
                        : isCompleted
                        ? 'border-blue-400'
                        : 'border-gray-100'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg transition-all duration-500 bg-gradient-to-br ${
                      item.color
                    } ${isActive ? 'scale-110' : ''}`}>
                      {item.step}
                    </div>

                    {/* Icon display */}
                    <div className="flex justify-center mb-3">
                      <StepIcon className={`w-6 h-6 transition-all duration-500 ${
                        isActive || isCompleted ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>

                    <h3 className={`font-bold mb-2 text-lg transition-colors duration-500 ${
                      isActive
                        ? 'text-blue-600'
                        : isCompleted
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-500 ${
                      isActive
                        ? 'text-gray-700 font-medium'
                        : isCompleted
                        ? 'text-gray-600'
                        : 'text-gray-600'
                    }`}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Vertical connector for mobile */}
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <div className={`w-1 h-8 rounded-full animate-pulse transition-all duration-300 ${
                        isCompleted ? 'bg-blue-600' : 'bg-gradient-to-b from-blue-500 to-purple-500'
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
              className={`h-2 rounded-full transition-all duration-500 ${
                activeStep === idx
                  ? 'w-8 bg-blue-600'
                  : completedSteps.includes(idx)
                  ? 'w-6 bg-blue-400'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
