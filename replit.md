# PadhoPlus - Online Education Platform

## Overview
PadhoPlus is a comprehensive online education platform designed for JEE/NEET exam preparation. The backend is built with Django and Django REST Framework, using PostgreSQL as the database.

## Project Status
- **Backend**: Complete Django REST API with all core features
- **Frontend**: Planned for Next.js (future development)
- **Database**: PostgreSQL with all models implemented

## Project Structure
```
padhoplus/
├── settings.py          # Django settings
├── urls.py              # API routing
├── users/               # User management & authentication
├── batches/             # Batch, Subject, Topic management
├── content/             # Lectures, Notes, Resources
├── assessments/         # Tests, Questions, Practice sessions
├── doubts/              # Doubt resolution system
└── analytics/           # Progress tracking & dashboards
```

## User Roles
1. **Student** - Main users who access courses, take tests, ask doubts
2. **Teacher** - Faculty who create content, answer doubts, manage lectures
3. **Parent** - View child's progress and performance
4. **Admin** - Platform management, user management, content moderation

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Get current user

### Batches & Courses
- `GET /api/batches/` - List all batches
- `GET /api/batches/{slug}/` - Batch details
- `POST /api/batches/{slug}/enroll/` - Enroll in batch
- `GET /api/subjects/` - List subjects
- `GET /api/topics/` - List topics

### Content
- `GET /api/lectures/` - List lectures
- `GET /api/lectures/{id}/` - Lecture details
- `POST /api/lectures/{id}/update_progress/` - Update watch progress
- `GET /api/notes/` - List notes/resources

### Assessments
- `GET /api/tests/` - List tests
- `POST /api/tests/{id}/start/` - Start test
- `POST /api/test-attempts/{id}/submit/` - Submit test
- `GET /api/questions/random/` - Get random practice questions
- `POST /api/practice-sessions/start/` - Start practice session

### Doubts
- `GET /api/doubts/` - List doubts
- `POST /api/doubts/` - Create doubt
- `POST /api/doubts/{id}/resolve/` - Mark as resolved
- `POST /api/doubt-responses/` - Answer a doubt

### Dashboard & Analytics
- `GET /api/dashboard/student/` - Student dashboard
- `GET /api/dashboard/teacher/` - Teacher dashboard
- `GET /api/dashboard/admin/` - Admin dashboard
- `GET /api/progress/summary/` - Progress summary

## Admin Panel
Access at `/admin/` with credentials:
- Username: `admin`
- Password: `admin123`

## Database Models

### Users App
- User (custom with roles)
- Faculty (teacher profiles)
- Testimonial
- Result

### Batches App
- Subject
- Topic
- Batch
- Schedule
- Enrollment
- Announcement
- BatchReview
- BatchFAQ

### Content App
- Lecture
- Note
- Resource
- WatchHistory
- Bookmark

### Assessments App
- Question
- Test
- TestAttempt
- TestResponse
- PracticeSession

### Doubts App
- Doubt
- DoubtResponse
- DoubtUpvote

### Analytics App
- UserProgress
- DailyActivity
- Streak
- Achievement
- UserAchievement
- Leaderboard

## Running the Server
```bash
python main.py
```
Server runs on port 5000 with Gunicorn.

## Recent Changes
- 2025-11-25: Initial backend implementation complete
  - Created all Django apps (users, batches, content, assessments, doubts, analytics)
  - Implemented all database models
  - Set up REST API with serializers and viewsets
  - Configured authentication and role-based access
  - Created admin interface
  - Applied database migrations

## Next Steps
1. Frontend development with Next.js
2. Payment integration for course purchases
3. Video streaming integration
4. Email notifications
5. Parent portal implementation
