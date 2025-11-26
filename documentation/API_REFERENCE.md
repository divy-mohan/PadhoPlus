# PadhoPlus API Reference

Complete API endpoint documentation for the PadhoPlus backend.

---

## Base URL
```
http://localhost:8000/api/
```

## Authentication
All endpoints (except login/register) require authentication token:
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 🔐 Authentication Endpoints

### POST /auth/login
Login and get authentication token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_student": true
  }
}
```

### POST /auth/register
Register a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe",
  "is_student": true
}
```

**Response (201):**
```json
{
  "id": 2,
  "email": "newuser@example.com",
  "message": "User created successfully"
}
```

### GET /auth/me
Get current user info.

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "is_student": true,
  "profile_pic": null
}
```

### GET /auth/check/
Check authentication status.

**Response (200):**
```json
{
  "authenticated": true,
  "user_id": 1
}
```

### POST /auth/logout
Logout user (invalidate token).

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

## 📚 Batches Endpoints

### GET /batches/
List all active batches (with filters).

**Query Parameters:**
- `is_active=true` - Only active batches
- `exam=neet` - Filter by exam
- `class_level=11` - Filter by class
- `search=keyword` - Search by name

**Response (200):**
```json
{
  "count": 11,
  "results": [
    {
      "id": 1,
      "name": "NEET 2025 - Lakshya",
      "slug": "neet-2025-lakshya",
      "exam": "neet",
      "class_level": "12",
      "price": "4999",
      "is_free": false,
      "language": "Hindi",
      "is_active": true,
      "faculty": [{ "id": 1, "name": "Dr. Sharma" }],
      "description": "..."
    }
  ]
}
```

### GET /batches/{slug}/
Get single batch details.

**Response (200):**
```json
{
  "id": 1,
  "name": "NEET 2025 - Lakshya",
  "slug": "neet-2025-lakshya",
  "description": "Full syllabus coverage...",
  "price": "4999",
  "is_free": false,
  "faculty": [{ "id": 1, "name": "Dr. Sharma", "bio": "..." }],
  "enrollments": 150,
  "lectures": 45
}
```

### POST /batches/{slug}/enroll/
Enroll current user in a batch.

**Response (201):**
```json
{
  "enrollment_id": 25,
  "message": "Successfully enrolled"
}
```

### GET /batches/{slug}/demo_lectures/
Get demo lectures for batch.

**Response (200):**
```json
{
  "demo_lectures": [
    {
      "id": 1,
      "title": "Introduction to NEET",
      "video_url": "https://..."
    }
  ]
}
```

---

## 💬 Doubt Portal Endpoints

### GET /doubts/
List all doubts (with filters).

**Query Parameters:**
- `subject=physics` - Filter by subject
- `difficulty=hard` - Filter by difficulty
- `status=pending` - Filter by status
- `search=keyword` - Search doubts

**Response (200):**
```json
{
  "count": 2500,
  "results": [
    {
      "id": 123,
      "user": 1,
      "asker_name": "John Doe",
      "subject": "physics",
      "topic": "Mechanics",
      "difficulty": "hard",
      "title": "How to solve kinematics...",
      "description": "I don't understand...",
      "status": "answered",
      "created_at": "2025-11-26T10:30:00Z",
      "answers_count": 1
    }
  ]
}
```

### POST /doubts/
Create a new doubt.

**Request:**
```json
{
  "subject": "physics",
  "topic": "Mechanics",
  "difficulty": "hard",
  "title": "How to solve...",
  "description": "I struggle with..."
}
```

**Response (201):**
```json
{
  "id": 124,
  "user": 1,
  "subject": "physics",
  "status": "pending",
  "created_at": "2025-11-26T11:00:00Z"
}
```

### GET /doubts/{id}/
Get single doubt with answers.

**Response (200):**
```json
{
  "id": 123,
  "user": 1,
  "asker_name": "John Doe",
  "subject": "physics",
  "difficulty": "hard",
  "title": "How to solve kinematics...",
  "description": "...",
  "status": "answered",
  "created_at": "2025-11-26T10:30:00Z",
  "answers": [
    {
      "id": 45,
      "faculty": { "id": 2, "name": "Dr. Sharma" },
      "answer": "Here's the solution...",
      "created_at": "2025-11-26T11:00:00Z"
    }
  ]
}
```

### DELETE /doubts/{id}/
Delete a doubt (only by creator or admin).

**Response (204):** No content

---

## 👤 User Endpoints

### GET /users/me/
Get current user profile.

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "John",
  "profile_pic": "https://...",
  "stats": {
    "enrolled_batches": 3,
    "watch_time": 420,
    "streak": 7,
    "doubts_asked": 5
  }
}
```

### PUT /users/me/
Update current user profile.

**Request:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "profile_pic": "base64_encoded_image..."
}
```

**Response (200):**
```json
{
  "id": 1,
  "first_name": "John",
  "profile_pic": "https://..."
}
```

### GET /users/faculty/
List all faculty members.

**Response (200):**
```json
{
  "count": 50,
  "results": [
    {
      "id": 2,
      "name": "Dr. Sharma",
      "specialization": "Physics",
      "experience": "15 years",
      "verified": true,
      "bio": "..."
    }
  ]
}
```

---

## 💳 Payment Endpoints

### GET /payments/
List user's payment history.

**Response (200):**
```json
[
  {
    "id": 1,
    "batch": "NEET 2025",
    "amount": 4999,
    "status": "completed",
    "gateway": "stripe",
    "created_at": "2025-11-20T10:00:00Z"
  }
]
```

### POST /payments/create/
Initiate payment.

**Request:**
```json
{
  "batch_id": 1,
  "gateway": "stripe"
}
```

**Response (201):**
```json
{
  "payment_id": 100,
  "client_secret": "pi_xxx",
  "amount": 4999
}
```

### POST /payments/verify/
Verify and complete payment.

**Request:**
```json
{
  "payment_id": 100,
  "transaction_id": "stripe_xxx"
}
```

**Response (200):**
```json
{
  "status": "completed",
  "enrollment_id": 25
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "detail": "Subject must be one of: physics, chemistry, biology, mathematics"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required",
  "detail": "Please login first"
}
```

### 403 Forbidden
```json
{
  "error": "Permission denied",
  "detail": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "detail": "Doubt with id 999 does not exist"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "detail": "An unexpected error occurred"
}
```

---

## Rate Limiting
- 1000 requests per hour per user
- Header: `X-RateLimit-Remaining`

---

## Pagination
```json
{
  "count": 100,
  "next": "/api/doubts/?page=2",
  "previous": null,
  "results": [...]
}
```
