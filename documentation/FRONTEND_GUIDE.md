# Frontend Developer Guide

Complete guide for working with Next.js frontend.

---

## 📁 Project Structure

```
frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── doubt/               # Doubt Portal
│   │   ├── page.tsx         # Hub
│   │   ├── ask/page.tsx
│   │   ├── browse/page.tsx
│   │   └── answer/[id]/page.tsx
│   ├── batches/page.tsx     # Batch listing
│   ├── batch/[slug]/page.tsx # Batch details
│   ├── dashboard/page.tsx   # Student dashboard
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── profile/page.tsx
│   └── api/                 # API routes (if needed)
├── components/              # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Breadcrumb.tsx
│   ├── LoadingSpinner.tsx
│   ├── BootstrapIcon.tsx
│   ├── BatchCard.tsx
│   └── ...
├── context/                 # React Context
│   └── SkeletonContext.tsx
├── hooks/                   # Custom React Hooks
│   └── useSkeleton.ts
├── utils/                   # Utility functions
│   ├── api.ts              # API endpoints
│   └── constants.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🎨 Component Guidelines

### Component Structure
```typescript
'use client'  // Mark as client component if needed

import { useState, useEffect } from 'react'
import { BootstrapIcon } from '@/components/BootstrapIcon'

interface ComponentProps {
  title: string
  onAction: () => void
}

export default function MyComponent({ title, onAction }: ComponentProps) {
  const [state, setState] = useState('')

  useEffect(() => {
    // Side effects
  }, [])

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold">{title}</h1>
      <BootstrapIcon name="check" className="text-lg" />
      <button onClick={onAction}>Click me</button>
    </div>
  )
}
```

### Naming Conventions
- **Components**: PascalCase (`UserCard.tsx`)
- **Pages**: lowercase (`page.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Constants**: UPPER_SNAKE_CASE

### Props Pattern
```typescript
// ✅ Good - Props interface
interface Props {
  title: string
  count?: number
  onSubmit: (data: string) => void
}

// ❌ Bad - Any type
function Component(props: any) { }
```

---

## 🔌 API Integration

### Using API Endpoints
```typescript
import { apiEndpoints } from '@/utils/api'

const fetchDoubts = async () => {
  const response = await fetch(apiEndpoints.doubts(), {
    credentials: 'include'
  })
  const data = await response.json()
  return data
}
```

### API Utils File
```typescript
// frontend/utils/api.ts
const API_BASE = 'https://your-domain:8000/api'

export const apiEndpoints = {
  batches: () => `${API_BASE}/batches/`,
  batch: (slug: string) => `${API_BASE}/batches/${slug}/`,
  doubts: () => `${API_BASE}/doubts/`,
  // ... more endpoints
}
```

---

## 🎯 Bootstrap Icons Usage

### Icon Component
```typescript
// frontend/components/BootstrapIcon.tsx
export function BootstrapIcon({ name, className = '' }: Props) {
  return <i className={`bi bi-${name} ${className}`}></i>
}
```

### Using Icons
```typescript
<BootstrapIcon name="search" className="text-lg text-blue-600" />
<BootstrapIcon name="heart-fill" className="text-red-500" />
<BootstrapIcon name="check-circle" className="w-6 h-6" />
```

### Common Icons
- `search` - Search
- `plus` - Add
- `trash` - Delete
- `pencil` - Edit
- `check-circle` - Success
- `alert-circle` - Warning
- `clock` - Time
- `user` - Profile
- `chat-dots` - Messages

---

## 🎨 Styling Guide

### Tailwind Classes
```typescript
// Layout
className="flex items-center justify-between"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Colors
className="bg-blue-600 text-white hover:bg-blue-700"
className="border border-gray-300 rounded-lg"

// Spacing
className="p-6 mb-4 gap-2"

// Typography
className="text-lg font-semibold text-gray-900"
```

### Theme Colors
- **Primary**: Blue (`bg-blue-600`)
- **Secondary**: Purple (`bg-purple-600`)
- **Success**: Green (`bg-green-600`)
- **Danger**: Red (`bg-red-600`)
- **Warning**: Yellow (`bg-yellow-600`)
- **Background**: Gray (`bg-gray-50`, `bg-white`)

---

## 🔐 Authentication Pattern

```typescript
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  // Check if user is logged in
  fetch('/api/auth/check/', { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      if (data.authenticated) {
        setUser(data.user)
      }
      setLoading(false)
    })
}, [])

if (loading) return <LoadingSpinner />
if (!user) return <Navigate to="/login" />
```

---

## 📝 Page Templates

### Standard Page Structure
```typescript
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export default function FeaturePage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint/')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Breadcrumb items={[{ label: 'Feature', href: '/feature' }]} />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Feature Title</h1>
        {/* Content */}
      </main>
      
      <Footer />
    </div>
  )
}
```

---

## 🧪 Testing Components

### Jest Test Example
```typescript
// frontend/components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders title', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('calls onClick when button clicked', () => {
    const handleClick = jest.fn()
    render(<MyComponent onClick={handleClick} />)
    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

---

## 🚀 Performance Tips

1. **Use `useMemo` for expensive computations**
2. **Use `useCallback` for stable functions**
3. **Lazy load images with `next/image`**
4. **Code split with dynamic imports**
5. **Minimize re-renders with proper dependencies**

---

## 🐛 Debugging

### Browser DevTools
- F12 → Console for logs
- Network tab for API calls
- React DevTools extension

### Common Issues
| Issue | Solution |
|-------|----------|
| API 404 | Check NEXT_PUBLIC_API_URL |
| Styles not loading | Verify Tailwind config |
| Icons not showing | Check BootstrapIcon component |
| Page blank | Check error in console |

---

**Next**: Read BACKEND_GUIDE.md for backend details
