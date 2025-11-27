'use client'

import { useState, useEffect } from 'react'
import { Layers } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

export default function HowItWorksAnimated() {
  const [activeStep, setActiveStep] = useState(0)
  const [animatingArrow, setAnimatingArrow] = useState(0)

  const steps = [
    { step: 1, title: 'Sign Up', desc: 'Create your free account', icon: '✍️', color: 'from-blue-600 to-blue-700' },
    { step: 2, title: 'Choose Batch', desc: 'Pick your exam & batch', icon: '📚', color: 'from-purple-600 to-purple-700' },
    { step: 3, title: 'Start Learning', desc: 'Access all resources', icon: '🎓', color: 'from-pink-600 to-pink-700' },
    { step: 4, title: 'Track Progress', desc: 'Get real-time insights', icon: '📊', color: 'from-green-600 to-green-700' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
      setAnimatingArrow((prev) => (prev + 1) % (steps.length - 1))
    }, 3000)
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
            <div className="grid grid-cols-4 gap-8 px-8">
              {steps.map((item, idx) => (
                <ScrollAnimation key={idx} type="zoom-in" delay={idx * 150}>
                  <div className="relative">
                    {/* Animated connector line above */}
                    {idx < steps.length - 1 && (
                      <div className="absolute top-20 left-full w-8 h-1 bg-gray-300 overflow-hidden">
                        {/* Moving arrow animation */}
                        <div
                          className={`absolute h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-1000 ease-in-out`}
                          style={{
                            width: '100%',
                            left: animatingArrow === idx ? '0%' : '-100%',
                            opacity: animatingArrow === idx ? 1 : 0.3,
                          }}
                        />
                      </div>
                    )}

                    {/* Step card */}
                    <div
                      className={`relative group transition-all duration-500 ${
                        activeStep === idx ? 'scale-105' : 'scale-100'
                      }`}
                    >
                      {/* Glow effect when active */}
                      {activeStep === idx && (
                        <div className="absolute -inset-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                      )}

                      {/* Card */}
                      <div
                        className={`relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-500 border-2 overflow-hidden ${
                          activeStep === idx
                            ? 'border-blue-500 shadow-2xl'
                            : 'border-gray-100 group-hover:border-blue-300'
                        }`}
                      >
                        {/* Shine effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 ${
                          activeStep === idx ? 'opacity-100' : 'group-hover:opacity-100'
                        }`}></div>

                        {/* Step number with animation */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg transition-all duration-500 relative overflow-hidden ${
                            activeStep === idx
                              ? `bg-gradient-to-br ${item.color} scale-125 shadow-2xl`
                              : `bg-gradient-to-br ${item.color} group-hover:scale-125 group-hover:shadow-2xl`
                          }`}
                        >
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className={`relative z-10 transition-transform duration-500 ${
                            activeStep === idx ? 'scale-110' : 'group-hover:scale-110'
                          }`}>
                            {item.step}
                          </span>
                        </div>

                        {/* Step content */}
                        <div className="text-center relative z-10">
                          <h3 className={`font-bold mb-2 text-lg transition-colors duration-500 ${
                            activeStep === idx
                              ? 'text-blue-600'
                              : 'text-gray-900 group-hover:text-blue-600'
                          }`}>
                            {item.title}
                          </h3>
                          <p className={`text-sm transition-colors duration-500 ${
                            activeStep === idx
                              ? 'text-gray-700 font-medium'
                              : 'text-gray-600 group-hover:text-gray-700'
                          }`}>
                            {item.desc}
                          </p>
                        </div>

                        {/* Animated bottom accent */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 ${
                          activeStep === idx ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-6">
          {steps.map((item, idx) => (
            <ScrollAnimation key={idx} type="fade-up" delay={idx * 100}>
              <div className={`relative transition-all duration-500 ${
                activeStep === idx ? 'scale-105' : 'scale-100'
              }`}>
                {activeStep === idx && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl opacity-100 blur-lg animate-pulse"></div>
                )}

                <div
                  className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 border-2 ${
                    activeStep === idx
                      ? 'border-blue-500 shadow-2xl'
                      : 'border-gray-100'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg transition-all duration-500 bg-gradient-to-br ${
                    activeStep === idx ? item.color + ' scale-110' : item.color
                  }`}>
                    {item.step}
                  </div>

                  <h3 className={`font-bold mb-2 text-lg transition-colors duration-500 ${
                    activeStep === idx ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm transition-colors duration-500 ${
                    activeStep === idx ? 'text-gray-700 font-medium' : 'text-gray-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                {/* Vertical connector for mobile */}
                {idx < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-3 mt-12">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeStep === idx
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
