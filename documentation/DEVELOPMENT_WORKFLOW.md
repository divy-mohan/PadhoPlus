# Development Workflow Guide

---

## 🔄 How to Add a New Feature

### Step 1: Plan Your Feature
- Write feature specs in GitHub issue
- Discuss with team
- Identify backend/frontend changes needed
- Estimate time required

### Step 2: Backend Development

**Create Django App (if needed):**
```bash
cd /path/to/PadhoPlus
python manage.py startapp feature_name
```

**Create Models:**
```python
# padhoplus/feature_name/models.py
from django.db import models
from padhoplus.users.models import User

class FeatureModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
```

**Create Serializers:**
```python
# padhoplus/feature_name/serializers.py
from rest_framework import serializers
from .models import FeatureModel

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureModel
        fields = ['id', 'user', 'title', 'description', 'created_at']
```

**Create ViewSets:**
```python
# padhoplus/feature_name/views.py
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import FeatureModel
from .serializers import FeatureSerializer

class FeatureViewSet(ModelViewSet):
    queryset = FeatureModel.objects.all()
    serializer_class = FeatureSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return FeatureModel.objects.filter(user=self.request.user)
```

**Register Routes:**
```python
# padhoplus/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from padhoplus.feature_name.views import FeatureViewSet

router = DefaultRouter()
router.register('features', FeatureViewSet)

urlpatterns = [
    # ... existing patterns
    path('api/', include(router.urls)),
]
```

**Run Migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Test in Shell:**
```bash
python manage.py shell
from padhoplus.feature_name.models import FeatureModel
from padhoplus.users.models import User

user = User.objects.first()
feature = FeatureModel.objects.create(
    user=user,
    title="Test",
    description="Test feature"
)
print(feature)
```

### Step 3: Frontend Development

**Create Page/Component:**
```typescript
// frontend/app/feature/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function FeaturePage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('/api/features/')
      if (response.ok) {
        const data = await response.json()
        setData(data.results || data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Feature</h1>
        {/* Feature content */}
      </main>
      <Footer />
    </div>
  )
}
```

**Create Component:**
```typescript
// frontend/components/FeatureCard.tsx
export function FeatureCard({ item }: { item: any }) {
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  )
}
```

**Update API Utils:**
```typescript
// frontend/utils/api.ts
export const apiEndpoints = {
  // ... existing
  features: () => `${API_BASE}/features/`,
}
```

### Step 4: Connect Frontend to Backend

```typescript
const fetchData = async () => {
  try {
    const response = await fetch(apiEndpoints.features(), {
      credentials: 'include'
    })
    const data = await response.json()
    setData(data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Step 5: Test Locally

**Backend Testing:**
```bash
# Test endpoint manually
curl http://localhost:8000/api/features/

# Or use Postman/Thunder Client
GET http://localhost:8000/api/features/
Header: Authorization: Bearer <token>
```

**Frontend Testing:**
```bash
cd frontend
npm run dev
# Visit http://localhost:5000/feature
```

### Step 6: Write Unit Tests

**Backend Test:**
```python
# padhoplus/feature_name/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from padhoplus.users.models import User

class FeatureTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='test123'
        )
    
    def test_create_feature(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/features/', {
            'title': 'Test',
            'description': 'Test feature'
        })
        self.assertEqual(response.status_code, 201)
```

**Frontend Test:**
```typescript
// tests/frontend/__tests__/FeatureCard.test.tsx
import { render, screen } from '@testing-library/react'
import { FeatureCard } from '@/components/FeatureCard'

describe('FeatureCard', () => {
  it('renders feature title', () => {
    render(<FeatureCard item={{ title: 'Test', description: 'Test desc' }} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

### Step 7: Update Documentation

1. Add to [FEATURES.md](./FEATURES.md)
2. Add API endpoint to [API_REFERENCE.md](./API_REFERENCE.md)
3. Update [DATABASE.md](./DATABASE.md) if schema changed
4. Add screenshots/examples

### Step 8: Code Review & Merge

```bash
git add -A
git commit -m "Add feature: [name]

- Created backend endpoint
- Added frontend page
- Includes tests
"

git push origin feature-branch
# Create pull request
# Request code review
# Address feedback
# Merge to main
```

---

## 🐛 Debugging Guide

### Backend Debugging

**View Logs:**
```bash
# Terminal where Django is running
# Check output for error messages
```

**Django Shell Debugging:**
```bash
python manage.py shell

from padhoplus.batches.models import Batch
batch = Batch.objects.first()
print(batch.__dict__)  # See all fields
```

**Database Queries:**
```bash
python manage.py dbshell
\dt  # List tables
SELECT * FROM batches_batch LIMIT 5;  # Query data
```

**API Testing with cURL:**
```bash
# Get token
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"pass123"}'

# Use token
curl http://localhost:8000/api/doubts/ \
  -H "Authorization: Bearer <token>"
```

### Frontend Debugging

**Browser DevTools:**
- F12 → Console tab for JS errors
- Network tab to see API calls
- Application tab to see localStorage/cookies

**Next.js Debugging:**
```bash
# Add debug logs
console.log('Debug:', variable)

# Check terminal output
# Look for [Fast Refresh] errors
```

**React DevTools:**
- Install React DevTools extension
- Inspect component hierarchy
- Check props and state

---

## 📝 Code Style Guidelines

### Backend (Python/Django)

```python
# Good
def get_user_doubts(user_id):
    """Get all doubts asked by a specific user."""
    return Doubt.objects.filter(user_id=user_id)

# Bad
def getDoubts(uid):  # Wrong naming convention
    return Doubt.objects.filter(user=uid)
```

**Rules:**
- Use snake_case for functions/variables
- Use CamelCase for classes
- Use docstrings for functions
- Max line length: 79 characters
- Add type hints where possible

### Frontend (TypeScript/React)

```typescript
// Good
interface DoubtProps {
  id: number
  title: string
  onView: (id: number) => void
}

function DoubtCard({ id, title, onView }: DoubtProps) {
  return <div onClick={() => onView(id)}>{title}</div>
}

// Bad
function DoubtCard(props) {  // No types
  const { id, title, onView } = props
  return <div onClick={() => onView(id)}>{title}</div>
}
```

**Rules:**
- Use TypeScript for type safety
- Use PascalCase for components
- Use camelCase for functions/variables
- Keep components focused and small
- Use functional components

---

## 🚀 Deployment Workflow

### To Replit
```bash
# Code is auto-deployed on push
git push origin main
# Replit auto-rebuilds frontend and restarts workflows
```

### To Production
```bash
# 1. Tag a release
git tag v1.1.0

# 2. Deploy backend
gunicorn padhoplus.wsgi:application --bind 0.0.0.0:8000

# 3. Deploy frontend
npm run build
npm start
```

---

## 📋 Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style
- `refactor` - Code refactoring
- `test` - Test changes
- `chore` - Build/tooling

**Examples:**
```
feat(doubt): Add doubt portal functionality

- Created ask, browse, answer pages
- Integrated Bootstrap icons
- Added filtering and search

Closes #42
```

---

## ⚙️ Environment Variables

### Backend (.env)
```bash
DEBUG=True
SECRET_KEY=your-key
DATABASE_URL=postgresql://user:pass@localhost:5432/padhoplus
SESSION_SECRET=session-key
STRIPE_SECRET_KEY=sk_test_xxx
PHONEPE_CLIENT_ID=xxx
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_DOMAIN=http://localhost:5000
```

---

**Next**: Read [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) if you run into issues
