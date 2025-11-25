# PadhoPlus - Online Education Platform

## Overview
PadhoPlus is a comprehensive online education platform for JEE/NEET exam preparation. Built with Django REST Framework backend and Next.js frontend, using PostgreSQL database.

## Project Status
- **Backend**: Complete Django REST API (Port 8000)
- **Frontend**: Minimalistic Next.js application (Port 5000)
- **Database**: PostgreSQL with all models implemented
- **Status**: Fully functional development environment

## Project Structure

### Backend (Python/Django)
```
padhoplus/
├── settings.py          # Django configuration
├── permissions.py       # Role-based access control
├── urls.py              # API routing
├── users/               # User management & authentication
├── batches/             # Batch & course management
├── content/             # Lectures, notes, resources
├── assessments/         # Tests, questions, practice
├── doubts/              # Doubt resolution system
└── analytics/           # Progress tracking & dashboards
```

### Frontend (Next.js/TypeScript)
```
frontend/
├── app/
│   ├── page.tsx              # Home/landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── batches/              # Batches listing
│   ├── batch/[slug]/         # Batch detail
│   ├── login/                # Authentication
│   ├── register/             # Registration
│   ├── dashboard/            # Student dashboard
│   └── about/                # About page
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   ├── HeroSection.tsx       # Hero banner
│   ├── BatchCard.tsx         # Batch component
│   ├── Breadcrumb.tsx        # Navigation breadcrumbs
│   ├── Banner.tsx            # Alerts/notifications
│   └── LoadingSpinner.tsx    # Loading indicator
├── lib/
│   └── api.ts                # API client
└── tailwind.config.ts        # Tailwind CSS config
```

## User Roles & Permissions
1. **Student** - Access courses, practice, tests, doubts
2. **Teacher** - Create content, answer doubts, manage batches
3. **Parent** - Track child's progress (future)
4. **Admin** - Platform management, content moderation

## Key Features

### Backend API (Port 8000)
- **Authentication**: Session & JWT-based
- **Role-based Access**: Student, Teacher, Parent, Admin
- **Core Endpoints**:
  - `/api/auth/` - Login, register, logout
  - `/api/batches/` - Course batches
  - `/api/lectures/` - Video content
  - `/api/tests/` - Assessments
  - `/api/doubts/` - Q&A system
  - `/api/dashboard/` - Analytics

### Frontend (Port 5000)
- **Minimalistic Design**: Clean, distraction-free UI
- **Responsive**: Mobile-first approach
- **Education Icons**: Lucide React icons
- **Pages Implemented**:
  - Home/Landing page
  - Batches listing with filters
  - Batch detail with tabs
  - Student dashboard
  - Authentication (login/register)
  - About page

## Technology Stack

### Backend
- Python 3.10+
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Gunicorn

### Frontend
- Next.js 16
- TypeScript
- Tailwind CSS
- Lucide React icons
- Axios

## Running the Application

### Start Backend API (Port 8000)
```bash
python main.py
```

### Start Frontend (Port 5000)
```bash
cd frontend
npm run dev
```

### Access Points
- **Frontend**: http://localhost:5000
- **API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/

## Database

### Models Implemented
- **Users**: User, Faculty, Testimonial, Result
- **Batches**: Batch, Subject, Topic, Schedule, Enrollment, Announcement
- **Content**: Lecture, Note, Resource, WatchHistory, Bookmark
- **Assessments**: Question, Test, TestAttempt, TestResponse, PracticeSession
- **Doubts**: Doubt, DoubtResponse, DoubtUpvote
- **Analytics**: UserProgress, DailyActivity, Streak, Achievement

### Environment Variables
```
DATABASE_URL=postgresql://user:password@host/db
PGHOST=host
PGPORT=5432
PGUSER=user
PGPASSWORD=password
PGDATABASE=db
SESSION_SECRET=random_secret_key
```

## API Authentication

### Login
```bash
POST /api/auth/login/
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```bash
POST /api/auth/register/
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "User Name",
  "role": "student"
}
```

## Design System (Frontend)

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)

### Components
- **Card**: Minimalistic card with shadow
- **Button**: Primary, secondary, outline styles
- **Navbar**: Sticky responsive navigation
- **Breadcrumb**: Navigation trail
- **Hero Section**: Eye-catching banner

## Future Enhancements

### Phase 2 (Frontend)
- [ ] Full student portal with video player
- [ ] Practice questions interface
- [ ] Test series with analysis
- [ ] Doubt resolution chat
- [ ] Progress analytics charts
- [ ] Parent portal
- [ ] Teacher portal

### Phase 3 (Features)
- [ ] Payment integration (Stripe/Razorpay)
- [ ] Video streaming (HLS)
- [ ] Live class integration
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-based recommendations

## Admin Credentials
- **Username**: admin
- **Password**: admin123
- **URL**: http://localhost:8000/admin/

## Recent Changes
- **2025-11-25**: 
  - Created minimalistic Next.js frontend with Tailwind CSS
  - Implemented responsive design with mobile-first approach
  - Created reusable components (Navbar, Footer, Cards, etc.)
  - Set up education-focused color scheme and icons
  - Configured API integration with axios
  - Set up dual-port architecture (API:8000, Frontend:5000)
  - Implemented 7 main pages with proper routing

## Deployment Notes

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
npm start
```

### Backend Deployment (Gunicorn)
Already configured in `main.py`. Can be deployed to Heroku, Railway, Render, etc.

## Support & Documentation

- **API Docs**: Available at `/api/`
- **Admin Panel**: http://localhost:8000/admin/
- **Frontend README**: `frontend/README.md`

