# PadhoPlus - Online Education Platform

## Overview
PadhoPlus is a comprehensive online education platform for JEE/NEET exam preparation. Built with Django REST Framework backend and Next.js frontend, using PostgreSQL database.

## Project Status
- **Backend**: ✅ Complete Django REST API (Port 8000) with payment system - FULLY OPERATIONAL
- **Frontend**: ✅ Minimalistic Next.js application (Port 5000) with advanced animations - FULLY OPERATIONAL
- **Database**: ✅ PostgreSQL with all models implemented
- **Status**: ✅ Production-ready with advanced features

## Access Points
- **Frontend**: https://2129eb58-67fd-4fe1-b316-34da8aa0df29-00-34f4qhkyg0lfb.picard.replit.dev
- **Admin Panel**: https://2129eb58-67fd-4fe1-b316-34da8aa0df29-00-34f4qhkyg0lfb.picard.replit.dev/admin/
- **API**: https://2129eb58-67fd-4fe1-b316-34da8aa0df29-00-34f4qhkyg0lfb.picard.replit.dev/api/
- **Admin Credentials**: username=admin, password=Admin@123

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
├── analytics/           # Progress tracking & dashboards
└── payments/            # Payment & enrollment system
```

### Frontend (Next.js/TypeScript)
```
frontend/
├── app/
│   ├── page.tsx              # Home/landing page
│   ├── layout.tsx            # Root layout with progress bar
│   ├── globals.css           # Global styles + 15+ animations
│   ├── dashboard/            # Student dashboard
│   ├── batches/              # Batches listing with search
│   ├── batch/[slug]/         # Batch detail
│   ├── login/                # Authentication
│   ├── register/             # Registration
│   └── about/                # About page
├── components/
│   ├── Navbar.tsx            # Navigation
│   ├── Footer.tsx            # Footer
│   ├── HeroSection.tsx       # Hero banner
│   ├── BatchCard.tsx         # Batch component
│   ├── Breadcrumb.tsx        # Navigation breadcrumbs
│   ├── Banner.tsx            # Alerts/notifications
│   ├── LoadingSpinner.tsx    # Loading indicator
│   ├── PageProgressBar.tsx   # YouTube-style progress bar
│   ├── VideoPlayer.tsx       # HLS/MP4 player
│   ├── SearchBar.tsx         # Advanced search
│   └── AnimatedEducationCard.tsx  # Animated wrapper
├── lib/
│   └── api.ts                # API client
└── tailwind.config.ts        # Tailwind CSS config
```

## Advanced Features Implemented

### 1. Content Management & is_active Filtering
- **FAQs**: Only active FAQs display in batch detail pages
- **Announcements**: Only active announcements visible to students/teachers
- **Reviews/Ratings**: Only active reviews counted for ratings & display
- **Lectures/Notes/Resources**: All filtered by is_active status
- **Admin Control**: Toggle is_active in Django admin to hide/show content instantly

### 2. Beautiful Loader & Progress Tracking
- **Page Progress Bar**: YouTube-style progress indicator on page navigation
- **Smart animation**: Starts on route change, ends smoothly on page load
- **Zero lag**: Responsive and non-blocking

### 3. Animation System
- **15+ education-themed animations**:
  - `bookFlip`: Rotating book effect
  - `starPulse`: Pulsing stars with rotation
  - `bubbleFloat`: Floating bubbles animation
  - `lightbulbGlow`: Glowing lightbulb effect
  - `progressBar`: Smooth progress bar animation
  - `gradientShift`: Dynamic gradient shift
  - `shineEffect`: Shine/shimmer effect
  - `spinReverse`: Reverse spinning animation

### 4. Student Dashboard
- Personalized welcome with gradient text
- Quick stats cards (batches, watch time, streak, achievements)
- Enrolled courses with progress bars
- Achievements/badges system
- Learning streak tracking

### 5. Video Player Component
- Full-featured HLS/MP4 player
- Playback controls (play/pause, mute, volume)
- Adjustable playback speed (0.5x to 2x)
- Full-screen support
- Real-time progress tracking

### 6. Advanced Search & Filtering
- Real-time search with suggestions
- Trending searches display
- Auto-complete functionality
- Filter by exam type, price, language

### 7. Payment Integration (Stripe Ready)
- `BatchPricing` model for flexible pricing
- `Enrollment` model for student-batch relationships
- `Payment` model for transaction tracking
- `StudentProgress` for gamification
- `Achievement` & `StudentAchievement` for badges

### 8. Complete Admin Dashboard
- Payment management
- Enrollment tracking
- Achievement administration
- Progress monitoring
- Content activation/deactivation
- All accessible at `/admin/`

## User Roles & Permissions
1. **Student** - Access courses, practice, tests, doubts, dashboard
2. **Teacher** - Create content, answer doubts, manage batches
3. **Parent** - Track child's progress
4. **Admin** - Platform management, content moderation, payments

## Key Features

### Backend API (Port 8000)
- **Authentication**: Session & JWT-based
- **Role-based Access**: Student, Teacher, Parent, Admin
- **Payment Processing**: Stripe integration ready
- **Content Filtering**: All content filtered by is_active status
- **Core Endpoints**:
  - `/api/auth/` - Login, register, logout, auth check
  - `/api/batches/` - Course batches with pricing
  - `/api/lectures/` - Video content
  - `/api/tests/` - Assessments
  - `/api/doubts/` - Q&A system
  - `/api/dashboard/` - Analytics
  - `/api/payments/` - Payment processing
  - `/api/enrollments/` - Course enrollment
  - `/api/announcements/` - Active announcements only

### Frontend (Port 5000)
- **Responsive Design**: Mobile-first approach
- **Advanced Animations**: 15+ smooth education animations
- **Page Progress Bar**: YouTube-like loading indicator
- **Video Player**: Full-featured HLS/MP4 player
- **Search**: Real-time with suggestions
- **Dashboard**: Personalized student portal
- **Gamification**: Achievements & streaks
- **Content Display**: Only shows active FAQs, announcements, reviews

## Technology Stack

### Backend
- Python 3.11
- Django 5.2.8
- Django REST Framework 3.14+
- PostgreSQL (External: 69.62.78.57)
- Gunicorn
- Stripe (for payments)

### Frontend
- Next.js 16
- TypeScript
- Tailwind CSS
- Lucide React icons
- Axios

## Database Configuration

### External Database (Currently Active)
```
Host: 69.62.78.57
Port: 5432
Database: padhoplus_test
User: padhoplus_user
Password: [configured in environment]
```

### Database Models
- **Users**: User, Faculty, Testimonial, Result
- **Batches**: Batch, Subject, Topic, Schedule, BatchFAQ, Announcement, BatchReview
- **Content**: Lecture, Note, Resource, WatchHistory, Bookmark
- **Assessments**: Question, Test, TestAttempt, TestResponse, PracticeSession
- **Doubts**: Doubt, DoubtResponse, DoubtUpvote
- **Analytics**: UserProgress, DailyActivity, Streak
- **Payments**: BatchPricing, Enrollment, Payment, StudentProgress, Achievement, StudentAchievement

## Recent Changes

### 2025-11-28 - CRITICAL FIXES & CONTENT MANAGEMENT
✅ **Fixed UserSerializer Fields Mismatch**
- Removed non-existent fields (phone_number, profile_picture, date_of_birth)
- Aligned serializer with actual User model fields
- Backend now returns clean JSON responses ✓

✅ **Implemented is_active Content Filtering**
- BatchFAQ now filters: only displays active FAQs in batch detail
- Announcement now filters: students only see active announcements
- BatchReview now filters: ratings calculated from active reviews only
- Added is_active field to all batch-related models with default=True
- Admin can toggle visibility without deleting content ✓

✅ **Backend Error Resolution**
- Fixed 500 errors on API calls
- Frontend now successfully fetches batches, announcements, reviews ✓

✅ **All Workflows Operational**
- Django Backend running cleanly (Port 8000) ✓
- Next.js Frontend running smoothly (Port 5000) ✓
- No console errors - platform fully functional ✓

### 2025-11-27
- Enhanced Doubt Portal with complete backend integration
- Created Toast notification component
- Implemented upvote functionality for doubts and responses
- Added advanced filtering and sorting options
- Built answer submission form with real-time updates

### 2025-11-26
- Added YouTube-style page progress bar
- Implemented 15+ education-themed animations
- Created student dashboard with enrollment tracking
- Built full-featured video player with speed control
- Added advanced search with real-time suggestions
- Set up Stripe payment integration

## Running the Application

### Start Backend API (Port 8000)
```bash
python main.py
```

### Start Frontend (Port 5000)
```bash
cd frontend && npm run dev
```

## Admin Panel Usage

### Login
- **URL**: /admin/
- **Username**: admin
- **Password**: Admin@123

### Managing Content
1. **Batches**: Add/edit batches with pricing, target exams, classes
2. **FAQs**: Toggle `is_active` to show/hide FAQs instantly
3. **Announcements**: Create announcements (auto-active=True)
4. **Reviews**: Moderate reviews by toggling `is_active`
5. **Lectures**: Upload lectures with is_active toggle
6. **Payments**: Manage enrollments and payments

## Deployment Notes

### Frontend Deployment (Vercel)
```bash
cd frontend
npm run build
npm start
```

### Backend Deployment (Gunicorn)
```bash
gunicorn --bind=0.0.0.0:8000 --workers=4 padhoplus.wsgi
```

## Support & Documentation
- **API Docs**: Available at `/api/`
- **Admin Panel**: Access content management at `/admin/`
- **Frontend**: Next.js with Tailwind CSS styling
- **Database**: PostgreSQL with 27+ models fully implemented
