# PadhoPlus - Complete Developer Documentation

**Last Updated**: November 26, 2025  
**Version**: 1.0  
**Platform**: Django + Next.js + PostgreSQL

---

## 📚 Documentation Guide

Welcome! This comprehensive documentation will help you understand, maintain, and extend the PadhoPlus platform.

### For Quick Setup
→ Start with **RUN.md** in the project root

### For Understanding Architecture
1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design, data flow, and technology stack
2. **[FEATURES.md](./FEATURES.md)** - Complete feature list with specifications
3. **[DATABASE.md](./DATABASE.md)** - Database schema and relationships

### For Development
1. **[BACKEND_GUIDE.md](./BACKEND_GUIDE.md)** - Django backend structure and API development
2. **[FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)** - Next.js frontend structure and components
3. **[API_REFERENCE.md](./API_REFERENCE.md)** - Complete API endpoints and usage

### For Maintenance
1. **[DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)** - How to add features and maintain code
2. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment on Replit and production

---

## 🎯 Project Overview

**PadhoPlus** is a comprehensive online learning platform for JEE/NEET exam preparation.

### Core Features
- **📚 Batch Management** - Create and manage exam preparation batches
- **💬 Doubt Portal** - Ask doubts, get instant expert answers
- **👤 User Profiles** - Student dashboards with progress tracking
- **💳 Payment Gateway** - Integrated Stripe/PhonePe payment processing
- **🎓 Faculty System** - Expert faculty profiles and credentials

### Technology Stack
- **Backend**: Django 5.2.8 + Django REST Framework
- **Frontend**: Next.js 16.0.4 + React 19.2.0 + Tailwind CSS
- **Database**: PostgreSQL 12+
- **Icons**: Bootstrap Icons
- **Deployment**: Replit / Cloud Platforms

---

## 🗂️ Directory Structure

```
PadhoPlus/
├── documentation/           # All documentation files (YOU ARE HERE)
├── tests/                  # Organized test files
│   ├── backend/           # Django tests
│   ├── frontend/          # Next.js component tests
│   └── e2e/               # End-to-end tests
├── padhoplus/             # Django backend
│   ├── users/             # User management
│   ├── batches/           # Batch system
│   ├── doubts/            # Doubt Portal
│   ├── payments/          # Payment gateway
│   ├── content/           # Course content
│   └── analytics/         # User analytics
├── frontend/              # Next.js application
│   ├── app/               # Pages and routes
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context
│   └── utils/             # Utility functions
├── RUN.md                 # Setup guide
├── replit.md              # Project metadata
└── requirements.txt       # Python dependencies
```

---

## 📖 Quick Navigation

| Role | Read | Time |
|------|------|------|
| **New Developer** | ARCHITECTURE → BACKEND_GUIDE → FRONTEND_GUIDE | 30 min |
| **Backend Dev** | BACKEND_GUIDE → API_REFERENCE → DATABASE | 20 min |
| **Frontend Dev** | FRONTEND_GUIDE → Components section | 15 min |
| **DevOps/Deployment** | DEPLOYMENT → TROUBLESHOOTING | 15 min |
| **QA/Testing** | API_REFERENCE → DEVELOPMENT_WORKFLOW | 20 min |

---

## 🚀 Key Concepts

### Exam Categories Hierarchy
```
NEET / JEE / Foundation / Boards (Exam Type)
  ↓
Class 11 / Class 12 / Dropper (Class Level)
  ↓
Batches (Specific course)
```

### User Types
1. **Student** - Enrolls in batches, asks doubts, views progress
2. **Faculty** - Expert instructors with credentials
3. **Admin** - Manages content, users, payments (Django admin)

### Doubt Portal System
- Students ask doubts with subject/topic/difficulty tags
- Faculty responds with expert solutions
- Comments and follow-ups enable discussions
- Search and filter for discovering solutions

---

## 🔧 Environment Setup

**For Local Development:**
```bash
# Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

**For Replit:**
- Automatic workflow setup
- Use HTTPS URLs instead of HTTP
- Database auto-configured via Replit secrets

---

## 📋 Admin Credentials

**For Development:**
- Username: `admin`
- Password: `admin123`

Access at: `http://localhost:8000/admin`

---

## 🆘 Getting Help

1. **API Issues** → See [API_REFERENCE.md](./API_REFERENCE.md)
2. **Frontend Problems** → See [FRONTEND_GUIDE.md](./FRONTEND_GUIDE.md)
3. **Database Questions** → See [DATABASE.md](./DATABASE.md)
4. **Stuck?** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📝 Contributing

When adding new features:
1. Follow [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
2. Write tests in `/tests` folder
3. Update relevant documentation
4. Commit with clear messages

---

## 🔄 Version History

| Date | Version | Changes |
|------|---------|---------|
| Nov 26, 2025 | 1.0 | Initial release with Doubt Portal |

---

**Next Steps**: Start with [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system!
