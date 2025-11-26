# PadhoPlus System Architecture

---

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                           │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────────┐
│              Next.js Frontend (Port 5000)                    │
│  - React Components (Pages, Auth, Doubt Portal)             │
│  - Tailwind CSS Styling                                     │
│  - Bootstrap Icons                                          │
│  - API Client (utils/api.ts)                               │
└─────────────────────┬───────────────────────────────────────┘
                      │ REST API (JSON)
┌─────────────────────▼───────────────────────────────────────┐
│          Django Backend (Port 8000)                          │
│  - REST Framework Endpoints                                │
│  - Authentication & Authorization                          │
│  - Business Logic & Validations                            │
└─────────────────────┬───────────────────────────────────────┘
                      │ SQL Queries
┌─────────────────────▼───────────────────────────────────────┐
│        PostgreSQL Database                                  │
│  - Users, Batches, Doubts                                 │
│  - Enrollments, Payments                                  │
│  - Faculty, Content                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Technology Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Django | 5.2.8 |
| API | Django REST Framework | 3.16.1 |
| Database ORM | Django ORM | Built-in |
| Database Driver | psycopg2-binary | 2.9.11 |
| Web Server | Gunicorn | 23.0.0 |
| Authentication | Django Auth + JWT | Built-in |
| CORS | django-cors-headers | Latest |

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js | 16.0.4 |
| UI Library | React | 19.2.0 |
| Styling | Tailwind CSS | 4.1.17 |
| Icons | Bootstrap Icons | Latest |
| HTTP Client | Native Fetch API | Built-in |
| Type Safety | TypeScript | Latest |

### Database
| Component | Type |
|-----------|------|
| Database | PostgreSQL 12+ |
| ORM | Django ORM |

---

## 📊 Data Flow Architecture

### Authentication Flow
```
1. User inputs email/password on /login
2. Frontend sends POST /api/auth/login
3. Backend validates credentials
4. Backend returns JWT token + user data
5. Frontend stores in session/cookie
6. Subsequent requests include auth token
7. Backend validates token on each request
```

### Doubt Portal Flow
```
1. Student navigates to /doubt
2. Frontend fetches /api/doubts/ (all doubts)
3. Student clicks "Ask Doubt" → /doubt/ask
4. Form captures: subject, topic, difficulty, description, images
5. Frontend POST to /api/doubts/
6. Backend creates Doubt record + saves images
7. Faculty sees in Django admin
8. Faculty adds answer via admin
9. Student sees updated doubt with answer on /doubt/answer/[id]
```

### Batch Enrollment Flow
```
1. Student browses /batches (filtered by exam category)
2. Clicks batch → /batch/[slug]
3. Sees batch details + "Enroll" button
4. Clicks Enroll → POST /api/batches/[slug]/enroll/
5. Backend creates Enrollment record
6. Student sees in dashboard /dashboard
7. Can track progress, watch videos, ask doubts
```

---

## 🗄️ Database Schema Overview

### Core Tables

```sql
-- Users (Django built-in extended)
users
├── id (PK)
├── email (unique)
├── password (hashed)
├── is_student / is_faculty / is_admin
├── profile_pic
└── metadata

-- Batches (Courses)
batches
├── id (PK)
├── slug (unique)
├── name
├── exam_type (NEET, JEE, etc.)
├── class_level (11, 12, Dropper)
├── price
├── is_active
├── is_free
├── language
├── faculty (FK)
└── description

-- Enrollments (Student-Batch relation)
enrollments
├── id (PK)
├── user (FK)
├── batch (FK)
├── enrolled_at
└── progress_percentage

-- Doubt Portal
doubts
├── id (PK)
├── user (FK) - who asked
├── subject (Physics, Chemistry, etc.)
├── topic
├── difficulty (easy, medium, hard)
├── title
├── description
├── status (pending, in_progress, answered)
├── created_at
└── updated_at

doubt_answers
├── id (PK)
├── doubt (FK)
├── faculty (FK) - who answered
├── answer_text
├── answer_images
├── created_at
└── updated_at

-- Payments
payments
├── id (PK)
├── user (FK)
├── batch (FK)
├── amount
├── status (pending, completed, failed)
├── gateway (stripe, phonepe)
├── transaction_id
└── created_at

-- Faculty
faculty
├── id (PK)
├── user (FK)
├── specialization
├── experience
├── qualifications
├── bio
└── verified (boolean)
```

---

## 🔐 Authentication & Authorization

### JWT Token Flow
```
1. POST /api/auth/login → Get JWT token
2. Store token in localStorage/cookie
3. Include in Authorization header: "Bearer <token>"
4. Backend validates token signature
5. Extract user_id from token
6. Check permissions for the action
```

### Permission Levels
- **Anonymous** - Can browse batches, view faculty
- **Student** - Can enroll, ask doubts, track progress
- **Faculty** - Can answer doubts, view assigned batches
- **Admin** - Full access via Django admin

---

## 📡 API Architecture

### Request/Response Pattern
```json
// Request
{
  "method": "POST",
  "endpoint": "/api/doubts/",
  "headers": {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },
  "body": {
    "subject": "physics",
    "title": "...",
    "description": "..."
  }
}

// Response (Success)
{
  "id": 123,
  "status": "pending",
  "created_at": "2025-11-26T...",
  "success": true
}

// Response (Error)
{
  "error": "Invalid subject",
  "detail": "...",
  "status_code": 400
}
```

### Endpoint Categories
- **Auth** - `/api/auth/*`
- **Batches** - `/api/batches/*`
- **Doubts** - `/api/doubts/*`
- **Users** - `/api/users/*`
- **Faculty** - `/api/users/faculty/`
- **Payments** - `/api/payments/*`

---

## 🎨 Frontend Architecture

### Page Structure
```
frontend/
├── app/
│   ├── page.tsx              # Homepage with exam categories
│   ├── login/page.tsx        # Authentication
│   ├── register/page.tsx
│   ├── dashboard/page.tsx    # Student dashboard
│   ├── batches/page.tsx      # Browse all batches
│   ├── batch/[slug]/page.tsx # Individual batch details
│   ├── doubt/                # Doubt Portal
│   │   ├── page.tsx          # Hub with search
│   │   ├── ask/page.tsx      # Ask new doubt
│   │   ├── browse/page.tsx   # Browse doubts
│   │   └── answer/[id]/page.tsx  # View answer
│   ├── profile/page.tsx      # User profile
│   └── api/                  # API routes
├── components/               # Reusable React components
├── hooks/                    # Custom React hooks
├── context/                  # Global state (React Context)
└── utils/
    └── api.ts               # Centralized API endpoints
```

### Component Hierarchy
```
App
├── Navbar (persistent)
├── Breadcrumb
├── Main Content (page-specific)
│   ├── Hero / Header
│   ├── Cards / Lists
│   └── Forms / Interactions
└── Footer (persistent)
```

---

## 🔄 State Management

### Frontend State Levels
1. **Component State** - `useState()` for local UI
2. **Context State** - `SkeletonContext` for loading states
3. **Session Storage** - Auth tokens, user data
4. **Server State** - Fetched data (doubts, batches, etc.)

### Loading Pattern
```
const { isLoading } = useSkeleton()  // Global loading context
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetchData() // Fetch from API
  setIsLoading(false)
}, [])

if (loading) return <LoadingSpinner />
```

---

## 🚀 Deployment Architecture

### Replit Deployment
```
Replit Project
├── Workflow 1: Django Backend
│   └── python manage.py runserver 0.0.0.0:8000
├── Workflow 2: Next.js Frontend
│   └── npm run dev (port 5000)
└── PostgreSQL Database
    └── Auto-configured via secrets
```

### Production Deployment (Standard)
```
Frontend → CDN (Vercel/Netlify)
Backend → Gunicorn + Reverse Proxy (Nginx)
Database → Managed PostgreSQL (AWS RDS/GCP)
```

---

## 🔒 Security Architecture

### HTTPS & CORS
```
Frontend (HTTPS) → Backend (HTTPS)
Cross-Origin Request Headers:
- Authorization: Bearer <JWT>
- Content-Type: application/json
- CORS headers configured in Django
```

### Password Security
- Hashed using Django's `make_password()`
- Never logged or exposed
- Reset via email token

### Data Protection
- JWT tokens for API auth
- CSRF protection on Django forms
- SQL injection prevented by ORM
- XSS prevention via React escaping

---

## 📈 Scalability Considerations

### Current Architecture Supports
- 10K+ concurrent users
- 100K+ doubts
- Real-time search with filters
- Image uploads with processing

### Future Scaling
- Database replication
- Caching layer (Redis)
- CDN for static assets
- Message queue (Celery) for async tasks
- Microservices for payments

---

## 🔧 Key Design Patterns

| Pattern | Usage | Location |
|---------|-------|----------|
| MVC | Django structure | `padhoplus/` apps |
| REST API | API design | All endpoints |
| Component Pattern | UI reusability | `frontend/components/` |
| Context API | Global state | `frontend/context/` |
| Custom Hooks | Logic reuse | `frontend/hooks/` |
| Factory Pattern | ORM models | Django models |

---

## 📋 API Contract Example

**Create Doubt**
```
POST /api/doubts/

Request:
{
  "subject": "physics",
  "topic": "Mechanics",
  "difficulty": "hard",
  "title": "How to solve...",
  "description": "I don't understand...",
  "images": [file1, file2]
}

Response (201):
{
  "id": 123,
  "user": 45,
  "subject": "physics",
  "status": "pending",
  "created_at": "2025-11-26T18:30:00Z"
}
```

---

**Next**: Read [FEATURES.md](./FEATURES.md) for detailed feature descriptions
