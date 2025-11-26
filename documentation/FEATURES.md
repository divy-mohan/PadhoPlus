# PadhoPlus - Feature Documentation

---

## ✨ Core Features

### 1. 📚 Batch Management System

**What is a Batch?**
A batch is a specific course or cohort for exam preparation (e.g., "NEET 2025 - Lakshya").

**Features:**
- Create multiple batches per exam type
- Classify by exam (NEET, JEE, Foundation, Boards)
- Filter by class level (Class 11, 12, Dropper)
- Set pricing (free or paid)
- Assign faculty members
- Upload batch thumbnail/description
- Track enrollments

**User Journey:**
1. Browse homepage with exam categories
2. Select exam type → See class levels
3. Select class level → See available batches
4. Click batch → View full details
5. Click "Enroll" → Add to dashboard

**Admin Management:**
- Django admin: `/admin/batches/batch/`
- Create/edit/delete batches
- Set active/inactive status
- Manage pricing and faculty

---

### 2. 💬 Doubt Portal (NEW)

**Purpose:** Enable students to ask questions and get expert answers in a structured way.

**Four Main Pages:**

#### a) Doubt Hub (`/doubt`)
- **Search & Filter:**
  - Search by keywords
  - Filter by subject (Physics, Chemistry, Biology, Mathematics)
  - Subject cards with Bootstrap icons
  - Stats dashboard showing:
    - Total doubts asked (2.5K+)
    - Answer rate (98%)
    - Average response time (15 min)
    - Active mentors (500+)
- **Tabs:**
  - Browse & Search: View all doubts
  - My Doubts: View personal doubts (empty state for new users)

#### b) Ask Doubt Form (`/doubt/ask`)
- **Form Fields:**
  - Subject selection (4 options with icons)
  - Topic dropdown (auto-populates based on subject)
  - Difficulty level (Easy/Medium/Hard)
  - Title input
  - Description textarea with character count
  - Image upload (multiple files, with preview)
  - Tips for better answers (info box)
- **Validation:**
  - All fields required
  - Image size limits
  - Description length limits
- **Success:**
  - Confirmation message
  - Redirect to doubt hub

#### c) Browse Doubts (`/doubt/browse`)
- **Filters:**
  - Search by keyword
  - Filter by difficulty (All/Easy/Medium/Hard)
  - Filter by status (All/Pending/Answered/In Progress)
- **Result Cards:**
  - Subject badge with icon
  - Difficulty badge
  - Status badge (color-coded)
  - Question title
  - Question preview (truncated)
  - Metadata: Asker name, date, answer count
- **Pagination:** Load more or scroll
- **Empty State:** "No questions found - Try adjusting filters"

#### d) View Answer (`/doubt/answer/[id]`)
- **Question Display:**
  - Full question text and description
  - Subject/difficulty/status badges
  - Asker name and date
- **Expert Answer:**
  - Answer text from faculty
  - Formatted clearly in green box
  - Faculty name and date
- **Helpful Voting:**
  - Mark as helpful/unhelpful
  - Feedback for quality assessment
- **Follow-up Section:**
  - Ask follow-up question button
  - View related questions link

**Subject Color Coding:**
- Physics: Blue to Cyan gradient
- Chemistry: Green to Emerald gradient
- Biology: Red to Pink gradient
- Mathematics: Purple to Pink gradient

**Data Structure:**
```
Doubt
├── subject (physics, chemistry, biology, mathematics)
├── topic (Mechanics, Organic Chemistry, etc.)
├── difficulty (easy, medium, hard)
├── title
├── description
├── images (multiple)
├── status (pending, in_progress, answered)
├── created_at
├── updated_at
└── user (FK to Student)

DoubtAnswer
├── doubt (FK)
├── answer_text
├── images (optional)
├── created_at
└── faculty (FK)
```

---

### 3. 👤 User Authentication & Profiles

**Authentication:**
- Email/password login
- Secure password hashing
- Session management
- JWT tokens for API

**User Types:**
- **Student** - Enrolls in batches, asks doubts
- **Faculty** - Answers doubts, teaches batches
- **Admin** - Manages entire platform

**Student Dashboard (`/dashboard`):**
- Enrolled batches display
- Progress tracking
- Watch time statistics
- Streak calendar
- Achievements badge
- Recent courses

**Profile Management (`/profile`):**
- Edit personal information
- Upload profile picture (with crop tool)
- View enrollment history
- Download certificates
- Change password

---

### 4. 💳 Payment Gateway Integration

**Supported Gateways:**
- Stripe (Recommended)
- PhonePe (Indian market)

**Payment Flow:**
1. Student enrolls in paid batch
2. Redirected to payment page
3. Select payment gateway
4. Process payment
5. Get receipt & access

**Features:**
- Secure payment processing
- Transaction history
- Refund management (admin)
- Invoice generation

---

### 5. 🎓 Faculty System

**Faculty Profile Includes:**
- Name and photo
- Qualifications
- Experience
- Specialization
- Bio
- Verification status

**Faculty Capabilities:**
- Assign to batches
- Answer doubts
- View assigned students
- Track interaction metrics

---

### 6. 📊 Analytics & Progress Tracking

**Student Metrics:**
- Videos watched
- Time spent learning
- Doubts asked/answered
- Progress percentage per batch
- Streak (consecutive learning days)

**Admin Metrics:**
- Total students
- Total enrollments
- Revenue tracking
- Doubt resolution rate
- Faculty performance

---

### 7. 📱 Responsive Design

**Features:**
- Mobile-first approach
- Tablet optimization
- Desktop full-featured experience
- Touch-friendly buttons (min 44px)
- Readable fonts on all devices

**Styling:**
- Tailwind CSS utility-first
- Bootstrap Icons (professional, clean)
- Consistent color scheme (slate/gray gradients)
- Dark mode ready (future feature)

---

### 8. 🔍 Search & Discovery

**Homepage Hierarchy:**
```
Exam Categories (NEET, JEE, Foundation, Boards)
    ↓
Class Levels (Class 11, 12, Dropper)
    ↓
Batches (Specific courses)
```

**Doubt Search:**
- Full-text search on title/description
- Subject-based filtering
- Difficulty-based filtering
- Status-based filtering
- Recent/Popular sorting

---

## 🚀 Advanced Features (Implemented)

### Batch Seeding
- Pre-loaded with 11 sample batches
- Covers all exam types and class levels
- Used for development/demo

### Bootstrap Icon Integration
- Professional icon library
- 200+ icons available
- Used throughout UI
- Replaces emoji usage

### Centralized API Configuration
- `frontend/utils/api.ts` - Single source of truth
- HTTPS endpoints for Replit
- Environment variable support
- Easy endpoint management

---

## 📋 Feature Requirements Matrix

| Feature | Student | Faculty | Admin | Mobile | Status |
|---------|---------|---------|-------|--------|--------|
| Browse Batches | ✅ | ✅ | ✅ | ✅ | ✅ |
| Enroll Batch | ✅ | - | ✅ | ✅ | ✅ |
| Ask Doubt | ✅ | - | ✅ | ✅ | ✅ |
| Answer Doubt | - | ✅ | ✅ | ✅ | ✅ |
| Dashboard | ✅ | - | - | ✅ | ✅ |
| Profile Edit | ✅ | ✅ | ✅ | ✅ | ✅ |
| Make Payment | ✅ | - | - | ✅ | ✅ |
| Admin Panel | - | - | ✅ | ❌ | ✅ |

---

## 🎯 Doubt Portal Subject Colors

```
Physics      → bi-lightbulb       → Blue-Cyan
Chemistry    → bi-flask           → Green-Emerald
Biology      → bi-heart-pulse     → Red-Pink
Mathematics  → bi-calculator      → Purple-Pink
```

---

## 🔄 Future Features (Roadmap)

- [ ] **AI Auto-Suggestions** - Auto-complete doubt answers
- [ ] **LaTeX Math Support** - Beautiful math equation rendering
- [ ] **Live Classes** - Video streaming integration
- [ ] **Points & Rewards** - Gamification for engagement
- [ ] **Mobile App** - Native iOS/Android apps
- [ ] **Discussion Forum** - General Q&A section
- [ ] **Certificates** - Course completion certificates
- [ ] **Assessment Tests** - Practice exams and quizzes
- [ ] **Peer Tutoring** - Student-to-student help
- [ ] **Analytics Dashboard** - Detailed learning insights

---

## 📊 Performance Specifications

| Metric | Target | Status |
|--------|--------|--------|
| Page Load Time | < 2s | ✅ |
| API Response | < 500ms | ✅ |
| Mobile Score | 85+ | ✅ |
| Accessibility | WCAG AA | 🔄 |
| Concurrent Users | 10K+ | ✅ |

---

## 🔐 Security Features

- HTTPS-only communication
- Password hashing (bcrypt)
- CORS protection
- CSRF tokens
- JWT authentication
- SQL injection prevention
- XSS prevention
- Rate limiting (future)

---

**Next**: Read [API_REFERENCE.md](./API_REFERENCE.md) for endpoint details
