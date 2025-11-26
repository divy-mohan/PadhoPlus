# PadhoPlus Django Admin Complete Guide

## Access Django Admin
**URL:** `http://localhost:8000/admin/`  
**Username:** `admin`  
**Password:** `admin123`

---

## ✅ Fully Manageable via Django Admin

### 1. **BATCHES & COURSES** 
#### BatchAdmin
- **Create/Edit/Delete Batches**
- **Upload Batch Thumbnail Images** (1280×720px recommended)
- **Manage Fields:**
  - Name, Slug, Description, Short Description
  - Target Exam, Class, Year, Language
  - Start/End Dates, Status (Upcoming/Ongoing/Completed)
  - Price, Discounted Price, Free/Paid Toggle
  - EMI Options, Max Students, Featured Status
  - Promo Video URL, Features, Includes
  - Subjects & Faculty (multi-select)
- **Inline Editing:**
  - Add/Edit Schedules directly
  - Add/Edit FAQs directly
- **Filters:** By Exam, Status, Free/Paid, Featured, Active
- **Search:** By Name, Description

#### SubjectAdmin
- Create/Edit/Delete Subjects
- Set Order, Icon, Color
- Manage Status (Active/Inactive)
- Auto-generated slugs

#### TopicAdmin
- Manage Topics within Subjects
- Set Chapter Numbers, Order
- Status Management

#### ScheduleAdmin
- Manage Class Schedules
- Set Days, Times, Subject
- Toggle Live Status

#### EnrollmentAdmin
- View/Manage Student Enrollments
- Track Progress Percentage
- Change Enrollment Status
- Filter by Status, Exam, Date

#### AnnouncementAdmin
- Post Announcements to Batches
- Set Priority (Low/Medium/High/Urgent)
- Pin Important Announcements
- Assign to Teachers/Admins
- Manage Publication Status

#### BatchReviewAdmin
- Moderate Student Reviews
- Verify Reviews
- Manage Ratings (1-5 stars)
- Filter by Rating, Verified Status

---

### 2. **USERS & AUTHENTICATION**
#### UserAdmin (Custom Extended)
- **Create/Edit/Delete Users**
- **Manage User Fields:**
  - Username, Email, First Name, Last Name
  - Role (Student/Teacher/Parent/Admin)
  - Phone, Profile Image Upload
  - Bio, Active Status
  - Staff & Superuser Status
- **Student Profile Fields:**
  - Target Exam, Target Year, Current Class
  - School/College Name
  - Language Preference
- **Teacher Profile Fields:**
  - Qualifications, Experience Years
  - Specialization
- **Other Fields:**
  - Referral Code, Referred By
  - Date Joined, Last Login
- **Filters:** By Role, Status, Date Joined
- **Search:** Username, Email, Phone, Name

#### FacultyAdmin
- Link Teachers to Faculty Profiles
- Set Designation, Order
- Mark as Featured
- Search by Name, Username

#### TestimonialAdmin
- Add Success Stories
- Manage Student Results (Name, Exam, Rank, Year)
- Upload Images for Testimonials
- Set Featured & Active Status
- Order by Priority

#### ResultAdmin
- Showcase Student Results
- Manage Exam Results Database
- Track Rank, Percentile
- Mark as Featured for Homepage

---

### 3. **CONTENT MANAGEMENT**
#### LectureAdmin
- **Upload/Manage Video Lectures**
- **Fields:**
  - Title, Description, Video URL
  - Thumbnail Image, Duration
  - Batch, Subject, Topic, Teacher
  - Live Status, Live DateTime
  - Demo/Free Toggle
  - View Count Tracking
  - Order Management
- **Inline Resource Management:** Add PDFs, Notes, Links directly
- **Filters:** By Batch, Subject, Demo, Live, Free, Active
- **Search:** Title, Description, Batch Name

#### NoteAdmin
- Upload Study Notes/PDFs
- Manage File Types (PDF, DOC, PPT, etc.)
- Free/Paid Toggle
- Track Downloads
- Set Subject & Topic

#### ResourceAdmin
- Attach Resources to Lectures
- Link External URLs, PDFs, Documents
- Resource Type Management

#### WatchHistoryAdmin (View Only)
- Track Student Lecture Viewing History
- Monitor Watch Duration
- See Completion Status
- Date Hierarchy for Analysis

#### BookmarkAdmin
- View Student Bookmarked Content
- Track Saved Lectures/Notes
- See Bookmark Timestamps

---

### 4. **ASSESSMENTS & TESTS**
#### QuestionAdmin
- **Create Test Questions**
- **Features:**
  - Question Text & Image Upload
  - Multiple Choice (A/B/C/D options)
  - Solution Text & Solution Image
  - Difficulty Level (Easy/Medium/Hard)
  - Question Type (MCQ, Descriptive, Fill-Blank, etc.)
  - Marks & Negative Marks
  - Subject & Topic Association
- **Filters:** By Subject, Type, Difficulty, Active
- **Search:** Question Text, Subject

#### TestAdmin
- **Create Full Test Series**
- **Manage:**
  - Test Title, Description, Instructions
  - Questions (Multi-select)
  - Total Marks, Passing Marks
  - Duration in Minutes
  - Test Type (Mock, Practice, Final)
  - Start/End DateTime
  - Proctoring Settings
  - Answer Reveal Settings
  - Status (Draft, Published, Ongoing, Completed)
- **Schedule Tests for Batches**
- **View Results**

#### TestAttemptAdmin
- View Student Test Attempts
- Track Scores, Correct Answers
- See Rankings & Percentiles
- Monitor Time Started/Ended

#### TestResponseAdmin
- View Individual Question Responses
- Track Correctness, Marks
- See Marked for Review Questions

#### PracticeSessionAdmin
- Monitor Student Practice Sessions
- Track Questions Attempted
- View Completion Status
- Filter by Mode (Timed, Untimed, Adaptive)

---

### 5. **DOUBT RESOLUTION**
#### DoubtAdmin
- **Manage Student Queries**
- **Fields:**
  - Title, Description, Image Upload
  - Student, Subject, Topic, Lecture
  - Status (Open/In Progress/Closed)
  - Priority (Low/Medium/High)
  - Resolution Status
  - Assign to Teacher
  - Mark as Public/Private
  - Upvote Tracking
- **Inline Responses:** Add Teacher Responses directly
- **Filters:** By Status, Priority, Subject, Date
- **Search:** Title, Student Name, Description

#### DoubtResponseAdmin
- Track Teacher Responses to Doubts
- Mark Accepted Solutions
- Monitor Upvotes & Engagement

#### DoubtUpvoteAdmin
- View Engagement Metrics
- Track Helpful Solutions

---

### 6. **ANALYTICS & PROGRESS TRACKING**
#### UserProgressAdmin
- **Track Student Learning:**
  - Lectures Watched Count
  - Questions Attempted
  - Topics Covered
  - Strength Level (Weak/Average/Strong)
  - Subject-wise Progress

#### DailyActivityAdmin
- **Monitor Daily Engagement:**
  - Time Spent in Minutes
  - Lectures Watched
  - Questions Practiced
  - Tests Taken
  - Activity Date
- **Date Hierarchy Filter**
- **Search by Student**

#### StreakAdmin
- Track Study Streaks
- Current & Longest Streaks
- Points System
- Last Activity Date

#### AchievementAdmin
- **Define Achievement Badges**
- Type (Badge, Certificate, Badge)
- Points System
- Description & Icon
- Active/Inactive Toggle

#### UserAchievementAdmin
- View Student-Earned Achievements
- Earned Date Tracking
- Filter by Achievement Type

#### LeaderboardAdmin
- **Create Rankings:**
  - Batch-wise Leaderboards
  - Different Types (Points, Score, Rank)
  - Period (Weekly, Monthly, Overall)
  - View Ranks & Scores

---

## 📋 Image Management Checklist

### Where to Upload Images (All via Django Admin):

1. **Batch Thumbnail** - BatchAdmin
   - Field: `thumbnail`
   - Size: 1280×720px (16:9 ratio)
   - Fallback: None - shows placeholder

2. **Lecture Thumbnail** - LectureAdmin
   - Field: `thumbnail`
   - Size: Recommended 1280×720px

3. **Lecture Resources** - LectureAdmin (Inline)
   - Attach files, PDFs, notes

4. **Question Image** - QuestionAdmin
   - Field: `question_image`
   - Upload question diagrams, graphs

5. **Solution Image** - QuestionAdmin
   - Field: `solution_image`
   - Upload solution diagrams

6. **User Profile Image** - UserAdmin
   - Field: `profile_image`
   - Size: 400×400px (Square)

7. **Doubt Image** - DoubtAdmin
   - Field: `image`
   - Students upload screenshots of issues

---

## 🔧 Advanced Features in Admin

### Multi-Select Features:
- **Subjects in Batch:** Multiple subjects per batch
- **Faculty in Batch:** Multiple teachers assigned
- **Questions in Test:** Bulk question addition
- **Features/Includes in Batch:** JSON array fields

### Inline Editing:
- **BatchFAQInline:** Add FAQs while creating batch
- **ScheduleInline:** Add class schedules while creating batch
- **ResourceInline:** Add lecture resources while creating lecture
- **DoubtResponseInline:** View responses while reviewing doubt

### Autocomplete Fields:
- User selections in many admin pages
- Fast search for large datasets
- Reduces page load time

### Date Hierarchy:
- Navigate by date for time-series data
- Quick filtering by period
- Applied to: Enrollment, Announcement, WatchHistory, DailyActivity

### Filters:
- Multi-level filtering
- Combine multiple criteria
- Smart filtering across relationships

---

## 🔐 Admin Permissions & Security

All operations require **admin login** (`admin/admin123`)

**Currently Accessible:**
- ✅ All Create/Read/Update/Delete operations
- ✅ Bulk editing in some sections
- ✅ Image uploads (Django handles validation)
- ✅ Status management
- ✅ User role assignment

---

## 🎯 Quick Start Checklist

- [ ] Login to Admin: http://localhost:8000/admin/
- [ ] Create at least 1 Batch with:
  - [ ] Upload thumbnail image (1280×720px)
  - [ ] Select subjects
  - [ ] Assign faculty
  - [ ] Set pricing
- [ ] Add 2-3 Subjects
- [ ] Create Sample Batch Schedule
- [ ] Upload 1-2 Lectures with videos
- [ ] Create Practice Test with questions
- [ ] Create 1-2 Testimonials

---

## 📝 Notes

- All models fully registered in admin
- Media files stored in `/media/` folder
- Images auto-resized for responsive display
- Slug fields auto-generated from names
- Timestamps auto-managed (created_at, updated_at)
- Read-only statistics fields (views_count, upvotes, etc.)

---

## Troubleshooting

**Q: Image not showing on frontend?**
- Ensure Django is running (port 8000)
- Check image is actually uploaded in admin
- Verify image file is in `/media/batches/thumbnails/`

**Q: Can't upload large images?**
- Django max upload: 2.5GB (configurable)
- Recommended: Keep under 5MB for best performance
- Supported formats: JPG, PNG, GIF, WebP

**Q: How to assign multiple teachers to one batch?**
- In BatchAdmin, use "Faculty" multi-select field
- Hold Ctrl/Cmd and click to select multiple

**Q: How to create test series with multiple tests?**
- Create individual tests in TestAdmin
- Link questions to each test
- Schedule tests for specific dates

---

## Support

All data is automatically validated by Django.
- Email field: Must be valid email
- Date fields: Use date picker
- Numeric fields: Only numbers allowed
- Required fields: Cannot be empty

Everything is fully functional and production-ready! ✅
