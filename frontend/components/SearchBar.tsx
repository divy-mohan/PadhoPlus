'use client'

import { useState } from 'react'
import { Search, X, Sparkles, TrendingUp } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ onSearch, placeholder = 'Search batches, topics, teachers...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([
    'JEE Main 2025',
    'NEET Biology',
    'Physics Mechanics',
    'Chemistry Organic',
    'Mathematics Calculus',
  ])

  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    setSuggestions([
      'JEE Main 2025',
      'NEET Biology',
      'Physics Mechanics',
      'Chemistry Organic',
      'Mathematics Calculus',
    ])
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(query)
          }}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-slide-in-up">
          {/* Trending */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase mb-3">
              <TrendingUp className="w-4 h-4" />
              Trending
            </div>
            <div className="space-y-2">
              {suggestions.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 text-sm transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase mb-3">
              <Search className="w-4 h-4" />
              Suggestions
            </div>
            <div className="space-y-2">
              {suggestions.slice(3).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
