# PadhoPlus - Online Education Platform

## Overview
PadhoPlus is a comprehensive online education platform for JEE/NEET exam preparation. Built with Django REST Framework backend and Next.js frontend, using PostgreSQL database.

## Project Status
- **Backend**: Complete Django REST API (Port 8000) with payment system
- **Frontend**: Minimalistic Next.js application (Port 5000) with advanced animations
- **Database**: PostgreSQL with all models implemented
- **Status**: Production-ready with advanced features

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
└── payments/            # Payment & enrollment system (NEW)
```

### Frontend (Next.js/TypeScript)
```
frontend/
├── app/
│   ├── page.tsx              # Home/landing page
│   ├── layout.tsx            # Root layout with progress bar
│   ├── globals.css           # Global styles + 15+ animations
│   ├── dashboard/            # Student dashboard (NEW)
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
│   ├── PageProgressBar.tsx   # YouTube-style progress bar (NEW)
│   ├── VideoPlayer.tsx       # HLS/MP4 player (NEW)
│   ├── SearchBar.tsx         # Advanced search (NEW)
│   └── AnimatedEducationCard.tsx  # Animated wrapper
├── lib/
│   └── api.ts                # API client
└── tailwind.config.ts        # Tailwind CSS config
```

## Advanced Features Implemented

### 1. Beautiful Loader & Progress Tracking
- **Page Progress Bar**: YouTube-style progress indicator on page navigation
- **Smart animation**: Starts on route change, ends smoothly on page load
- **Zero lag**: Responsive and non-blocking

### 2. Animation System
- **15+ education-themed animations**:
  - `bookFlip`: Rotating book effect
  - `starPulse`: Pulsing stars with rotation
  - `bubbleFloat`: Floating bubbles animation
  - `lightbulbGlow`: Glowing lightbulb effect
  - `progressBar`: Smooth progress bar animation
  - `gradientShift`: Dynamic gradient shift
  - `shineEffect`: Shine/shimmer effect
  - `spinReverse`: Reverse spinning animation
  - Plus stagger, bounce, and fade effects

### 3. Student Dashboard
- Personalized welcome with gradient text
- Quick stats cards (batches, watch time, streak, achievements)
- Enrolled courses with progress bars
- Achievements/badges system
- Learning streak tracking

### 4. Video Player Component
- Full-featured HLS/MP4 player
- Playback controls (play/pause, mute, volume)
- Adjustable playback speed (0.5x to 2x)
- Full-screen support
- Real-time progress tracking
- Video duration display

### 5. Advanced Search & Filtering
- Real-time search with suggestions
- Trending searches display
- Auto-complete functionality
- Filter by exam type, price, language
- Instant result filtering

### 6. Payment Integration (Stripe Setup Ready)
- `BatchPricing` model for flexible pricing
- `Enrollment` model for student-batch relationships
- `Payment` model for transaction tracking
- `StudentProgress` for gamification data
- `Achievement` & `StudentAchievement` for badges

### 7. Admin Dashboard Fully Configured
- Payment management
- Enrollment tracking
- Achievement administration
- Progress monitoring
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
- **Core Endpoints**:
  - `/api/auth/` - Login, register, logout
  - `/api/batches/` - Course batches with pricing
  - `/api/lectures/` - Video content
  - `/api/tests/` - Assessments
  - `/api/doubts/` - Q&A system
  - `/api/dashboard/` - Analytics
  - `/api/payments/` - Payment processing
  - `/api/enrollments/` - Course enrollment

### Frontend (Port 5000)
- **Responsive Design**: Mobile-first approach
- **Advanced Animations**: 15+ smooth education animations
- **Page Progress Bar**: YouTube-like loading indicator
- **Video Player**: Full-featured HLS/MP4 player
- **Search**: Real-time with suggestions
- **Dashboard**: Personalized student portal
- **Gamification**: Achievements & streaks

## Technology Stack

### Backend
- Python 3.10+
- Django 4.2+
- Django REST Framework
- PostgreSQL
- Gunicorn
- Stripe (for payments)

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
- **Dashboard**: http://localhost:5000/dashboard

## Database Models

### Payments App (NEW)
- `BatchPricing` - Pricing variations for batches
- `Enrollment` - Student enrollment tracking
- `Payment` - Payment transactions
- `StudentProgress` - Learning statistics
- `Achievement` - Badge definitions
- `StudentAchievement` - Student badge tracking

### Existing Models
- **Users**: User, Faculty, Testimonial, Result
- **Batches**: Batch, Subject, Topic, Schedule
- **Content**: Lecture, Note, Resource, WatchHistory
- **Assessments**: Question, Test, TestAttempt, TestResponse
- **Doubts**: Doubt, DoubtResponse, DoubtUpvote
- **Analytics**: UserProgress, DailyActivity, Streak

## Environment Variables
```
DATABASE_URL=postgresql://user:password@host/db
PGHOST=host
PGPORT=5432
PGUSER=user
PGPASSWORD=password
PGDATABASE=db
SESSION_SECRET=random_secret_key
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Design System (Frontend)

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Success: Green (#10B981)
- Warning: Amber (#F59E0B)
- Danger: Red (#EF4444)

### Components
- **Card**: Minimalistic with animations
- **Button**: Primary, secondary, outline styles
- **Navbar**: Sticky responsive navigation
- **VideoPlayer**: Full-featured media player
- **SearchBar**: Advanced with suggestions
- **Dashboard**: Personalized student portal

## Future Enhancements

### Phase 3 (Advanced Features)
- [ ] Live class integration
- [ ] Email notifications system
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-based recommendations
- [ ] Leaderboards
- [ ] Real-time doubt chat
- [ ] Parent portal
- [ ] Teacher portal

## Recent Changes
- **2025-11-27**:
  - Enhanced Doubt Portal with complete backend integration
  - Created Toast notification component for better UX feedback
  - Implemented upvote functionality for doubts and responses
  - Added advanced filtering (by subject, status) and sorting options
  - Built answer submission form with real-time updates
  - Added related questions sidebar on answer page
  - Configured Next.js proxy for seamless API communication
  - Fixed all API endpoint mappings (doubt-responses, my_doubts)

- **2025-11-26**:
  - Added beautiful YouTube-style page progress bar
  - Implemented 15+ education-themed animations with stagger effects
  - Created student dashboard with enrollment tracking & achievements
  - Built full-featured video player with speed control & fullscreen
  - Added advanced search with real-time suggestions & trending
  - Set up Stripe payment integration backend models
  - Created payments admin interface
  - Added AnimatedEducationCard wrapper component

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
- **Stripe Setup**: Connected to Replit connection system
