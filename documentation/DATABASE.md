# Database Schema & Models

---

## 📊 Database Overview

**Database**: PostgreSQL 12+  
**ORM**: Django ORM  
**Migrations**: Django migrations

---

## 🗂️ Database Tables

### users_user (Custom User Model)
```sql
CREATE TABLE users_user (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    profile_pic VARCHAR(255),
    is_student BOOLEAN,
    is_faculty BOOLEAN,
    is_admin BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### batches_batch
```sql
CREATE TABLE batches_batch (
    id INTEGER PRIMARY KEY,
    name VARCHAR(200),
    slug VARCHAR(200) UNIQUE,
    exam VARCHAR(50),
    class_level VARCHAR(50),
    description TEXT,
    price DECIMAL,
    is_free BOOLEAN,
    is_active BOOLEAN,
    language VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### batches_enrollment
```sql
CREATE TABLE batches_enrollment (
    id INTEGER PRIMARY KEY,
    user_id INTEGER FOREIGN KEY,
    batch_id INTEGER FOREIGN KEY,
    progress_percentage INTEGER,
    enrolled_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### doubts_doubt
```sql
CREATE TABLE doubts_doubt (
    id INTEGER PRIMARY KEY,
    user_id INTEGER FOREIGN KEY,
    subject VARCHAR(50),
    topic VARCHAR(100),
    difficulty VARCHAR(20),
    title VARCHAR(200),
    description TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE INDEX idx_doubt_user_status ON doubts_doubt(user_id, status);
CREATE INDEX idx_doubt_subject ON doubts_doubt(subject);
```

### doubts_doubtanswer
```sql
CREATE TABLE doubts_doubtanswer (
    id INTEGER PRIMARY KEY,
    doubt_id INTEGER FOREIGN KEY,
    faculty_id INTEGER FOREIGN KEY,
    answer TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### payments_payment
```sql
CREATE TABLE payments_payment (
    id INTEGER PRIMARY KEY,
    user_id INTEGER FOREIGN KEY,
    batch_id INTEGER FOREIGN KEY,
    amount DECIMAL,
    status VARCHAR(20),
    gateway VARCHAR(50),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

---

## 🔑 Key Relationships

```
User (1) ──→ (N) Enrollment
User (1) ──→ (N) Doubt
User (1) ──→ (N) Payment
User (1) ──→ (N) DoubtAnswer (as Faculty)

Batch (1) ──→ (N) Enrollment
Batch (1) ──→ (N) Payment

Doubt (1) ──→ (N) DoubtAnswer
```

---

## 📋 Indexing Strategy

- User ID + Status (for filtering)
- Subject + Difficulty (for search)
- Status (for notifications)
- Batch slug (for fast lookup)

---

**Next**: Read TROUBLESHOOTING.md for common issues
