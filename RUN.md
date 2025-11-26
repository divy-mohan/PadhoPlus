# PadhoPlus - Setup & Running Guide

Complete guide to setup and run both Backend (Django API) and Frontend (Next.js) servers locally.

---

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Initial Setup](#initial-setup)
3. [Backend Setup (Django)](#backend-setup-django)
4. [Frontend Setup (Next.js)](#frontend-setup-nextjs)
5. [Running Both Servers](#running-both-servers)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required Software
- **Python**: 3.10 or higher
- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Git**: Latest version
- **PostgreSQL**: 12 or higher (for production database)

### Recommended Tools
- **VS Code** or any modern code editor
- **Postman** or **Thunder Client** for API testing
- **Git Bash** (Windows) or Terminal (Mac/Linux)

---

## Initial Setup

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd PadhoPlus
```

### 2. Create Environment File
Copy the template and add your credentials:
```bash
cp .env.example .env
```

Edit `.env` with your test/development credentials:
```
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/padhoplus
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
```

---

## Backend Setup (Django)

### Step 1: Navigate to Backend
```bash
# The backend is in the root directory (padhoplus)
cd /path/to/PadhoPlus
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Database Setup
```bash
# Run migrations
python manage.py migrate

# Create superuser for admin panel
python manage.py createsuperuser
# Follow prompts to create admin account

# (Optional) Load demo data
python manage.py loaddata fixtures/demo_data.json
```

### Step 5: Collect Static Files
```bash
python manage.py collectstatic --noinput
```

### Step 6: Run Backend Server
```bash
# Development server on Port 8000
python manage.py runserver 0.0.0.0:8000
```

**Backend API will be available at**: `http://localhost:8000`
**Admin Panel**: `http://localhost:8000/admin`

---

## Frontend Setup (Next.js)

### Step 1: Navigate to Frontend
```bash
cd frontend
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Create Frontend Environment File
Create `.env.local` in the frontend directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_DOMAIN=http://localhost:5000
```

### Step 4: Run Frontend Development Server
```bash
# Development server on Port 5000
npm run dev
```

**Frontend will be available at**: `http://localhost:5000`

---

## Running Both Servers

### Option 1: Two Terminal Windows (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd /path/to/PadhoPlus
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver 0.0.0.0:8000
```

**Terminal 2 - Frontend:**
```bash
cd /path/to/PadhoPlus/frontend
npm run dev
```

### Option 2: Single Terminal (Using Process Manager)

Install PM2 (optional):
```bash
npm install -g pm2
```

Create `ecosystem.config.js` in root:
```javascript
module.exports = {
  apps: [
    {
      name: 'padhoplus-backend',
      script: 'python manage.py runserver 0.0.0.0:8000',
      cwd: './',
      env: { DEBUG: 'True' }
    },
    {
      name: 'padhoplus-frontend',
      script: 'npm run dev',
      cwd: './frontend',
    }
  ]
};
```

Run both:
```bash
pm2 start ecosystem.config.js
pm2 logs
```

---

## Environment Variables

### Backend (.env)
```bash
# Django
DEBUG=True
SECRET_KEY=your-development-secret-key
ENVIRONMENT=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/padhoplus
PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=your-password
PGDATABASE=padhoplus

# Stripe (Test Keys)
STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Session
SESSION_SECRET=your-session-secret-key

# CORS & Allowed Hosts
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5000,http://localhost:3000
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_DOMAIN=http://localhost:5000
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/login           - User login
POST   /api/auth/register        - User registration
POST   /api/auth/logout          - User logout
GET    /api/auth/me              - Current user info
```

### Batches
```
GET    /api/batches/             - List all batches
GET    /api/batches/<id>/        - Get batch details
POST   /api/batches/             - Create batch (admin only)
PUT    /api/batches/<id>/        - Update batch
DELETE /api/batches/<id>/        - Delete batch
```

### Testimonials
```
GET    /api/testimonials/        - List approved testimonials
POST   /api/testimonials/        - Submit new testimonial
GET    /api/testimonials/<id>/   - Get testimonial details
```

### Users
```
GET    /api/users/               - List users (admin only)
GET    /api/users/me/            - Current user profile
PUT    /api/users/me/            - Update user profile
```

### Admin Panel
```
Admin Dashboard: http://localhost:8000/admin
- Login with superuser credentials
- Manage batches, testimonials, payments, users
- Verify/approve pending testimonials
```

---

## Troubleshooting

### Backend Issues

**Port 8000 Already in Use**
```bash
# Find process using port 8000
lsof -i :8000  # Mac/Linux

# Kill the process
kill -9 <PID>

# Or use different port
python manage.py runserver 0.0.0.0:8001
```

**Database Connection Error**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Run: `python manage.py migrate`

**Static Files Not Loading**
```bash
python manage.py collectstatic --noinput
```

**Module Not Found Error**
```bash
# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend Issues

**Port 5000 Already in Use**
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or use different port
PORT=3000 npm run dev
```

**node_modules Issues**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**API Connection Error**
- Verify NEXT_PUBLIC_API_URL in .env.local
- Ensure backend server is running on port 8000
- Check CORS settings in backend

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

---

## Development Workflow

### Adding New Dependencies

**Backend:**
```bash
pip install package-name
pip freeze > requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

### Creating Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Running Tests

**Backend:**
```bash
python manage.py test
```

**Frontend:**
```bash
cd frontend
npm run test
```

### Building for Production

**Backend:**
```bash
python manage.py collectstatic --noinput
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

---

## Useful Commands

```bash
# Backend
python manage.py shell              # Django shell
python manage.py dbshell            # Database shell
python manage.py createsuperuser    # Create admin user
python manage.py flush              # Clear database

# Frontend
npm run lint                        # Run ESLint
npm run format                      # Format code with Prettier
npm run build                       # Build for production
npm start                           # Start production server
```

---

## Quick Start (Copy & Paste)

### Backend (Terminal 1):
```bash
cd PadhoPlus
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend (Terminal 2):
```bash
cd PadhoPlus/frontend
npm install
npm run dev
```

**Then open**: `http://localhost:5000` in your browser

---

## Need Help?

- **Django Docs**: https://docs.djangoproject.com/
- **Next.js Docs**: https://nextjs.org/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Stripe API**: https://stripe.com/docs/api

---

**Last Updated**: November 26, 2025
**Version**: 1.0
