# Deployment Guide

---

## 🚀 Replit Deployment (Current Setup)

### Automatic Deployment
PadhoPlus is currently configured for Replit with automatic workflows:

**Workflows:**
1. **Django Backend** - `python manage.py runserver 0.0.0.0:8000`
2. **Next.js Frontend** - `cd frontend && npm run dev` (port 5000)

**Database:**
- PostgreSQL via Replit Postgres
- Auto-configured via secrets

**To Deploy on Replit:**
```bash
# 1. Create Replit project from GitHub
# 2. Set environment secrets:
#    - DATABASE_URL
#    - SESSION_SECRET
#    - STRIPE_SECRET_KEY
#    - PHONEPE_CLIENT_ID
# 3. Push to GitHub
# 4. Replit auto-runs workflows
```

### Accessing Your Replit App
```
Frontend: https://[project-name].[username].replit.dev:5000
Backend: https://[project-name].[username].replit.dev:8000
Admin: https://[project-name].[username].replit.dev:8000/admin
```

---

## 🔐 Environment Secrets on Replit

**Go to Secrets tab and add:**

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/padhoplus` |
| `SESSION_SECRET` | Random string for Django | `your-super-secret-key` |
| `STRIPE_SECRET_KEY` | Stripe test/live key | `sk_test_xxx` |
| `PHONEPE_CLIENT_ID` | PhonePe app ID | `your-phonepe-id` |
| `PHONEPE_CLIENT_SECRET` | PhonePe app secret | `your-phonepe-secret` |

---

## 💾 Production Deployment

### Architecture
```
Domain/SSL (CloudFlare)
    ↓
Frontend (Vercel/Netlify) + Backend (Railway/Render)
    ↓
PostgreSQL (AWS RDS / GCP Cloud SQL)
```

### Option 1: Railway (Recommended for simplicity)

**Deploy Backend:**
```bash
# 1. Push to GitHub
# 2. Connect GitHub repo to Railway
# 3. Railway auto-detects Django
# 4. Set environment variables
# 5. Deploy automatically
```

**Deploy Frontend:**
```bash
# 1. Push to GitHub
# 2. Connect to Vercel/Netlify
# 3. Set build command: npm run build
# 4. Set start command: npm start
# 5. Deploy
```

### Option 2: Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "padhoplus.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
RUN npm install --only=production
CMD ["npm", "start"]
```

**Docker Compose (local):**
```yaml
version: '3'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: padhoplus
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
  
  backend:
    build: .
    command: >
      sh -c "python manage.py migrate &&
             python manage.py runserver 0.0.0.0:8000"
    environment:
      DEBUG: "True"
      DATABASE_URL: postgres://postgres:password@db:5432/padhoplus
    ports:
      - "8000:8000"
    depends_on:
      - db
  
  frontend:
    build: ./frontend
    ports:
      - "5000:3000"
```

**Run with Docker:**
```bash
docker-compose up
```

---

## 📊 Production Checklist

### Security
- [ ] Set `DEBUG=False` in production
- [ ] Update `SECRET_KEY` to random value
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookies
- [ ] Configure ALLOWED_HOSTS
- [ ] Set CORS properly

### Performance
- [ ] Enable database connection pooling
- [ ] Setup Redis cache layer
- [ ] Configure CDN for static files
- [ ] Enable gzip compression
- [ ] Setup monitoring/logging

### Database
- [ ] Run migrations
- [ ] Create superuser
- [ ] Backup strategy
- [ ] Monitor disk space

### Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Setup analytics (Google Analytics)
- [ ] Setup logging (ELK stack)
- [ ] Monitor uptime

---

## 🔧 Production Configuration

### Django Settings for Production
```python
# padhoplus/settings_prod.py (new file)
from .settings import *

DEBUG = False

ALLOWED_HOSTS = [
    'yourdomain.com',
    'www.yourdomain.com',
    'api.yourdomain.com'
]

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = {
    'default-src': ("'self'",),
}

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
        'CONN_MAX_AGE': 600,
    }
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD')
```

### Next.js Production Config
```typescript
// frontend/next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  image: {
    domains: ['yourdomain.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
```

---

## 🚀 Scaling Strategy

### Phase 1: Launch (Current)
- Single server setup
- Basic monitoring
- Manual backups

### Phase 2: Growth
- Load balancer
- Multi-server backend
- Redis caching
- CDN for static files

### Phase 3: Scale
- Microservices architecture
- Message queue (Celery)
- Elasticsearch for search
- Kubernetes orchestration

---

## 📝 Deployment Workflow

### Pre-Deployment
```bash
# 1. Test locally
npm run build (frontend)
python manage.py test (backend)

# 2. Run migrations
python manage.py migrate --database=production

# 3. Collect static files
python manage.py collectstatic --noinput

# 4. Tag release
git tag v1.0.0
git push origin v1.0.0

# 5. Create release notes
```

### Deployment
```bash
# 1. Deploy backend
#    (Platform specific - Railway/Docker/etc)

# 2. Deploy frontend
#    (Vercel/Netlify/etc)

# 3. Verify
#    - Check homepage loads
#    - Test API endpoints
#    - Verify database connection
```

### Post-Deployment
```bash
# 1. Monitor logs
# 2. Check error tracking
# 3. Monitor performance
# 4. Notify team
```

---

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Production
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          railway deploy
```

---

## 📊 Monitoring

### Key Metrics to Track
- Page load time (< 2s target)
- API response time (< 500ms target)
- Database query time
- Error rate
- User engagement

### Tools
- Sentry (error tracking)
- DataDog (monitoring)
- LogRocket (frontend monitoring)
- New Relic (APM)

---

## 🆘 Troubleshooting Deployment

### Common Issues

**1. Database Connection Error**
```
Solution:
- Verify DATABASE_URL in environment
- Check PostgreSQL is running
- Verify credentials
```

**2. Static Files Not Loading**
```bash
python manage.py collectstatic --noinput
```

**3. Frontend API 404**
```
Solution:
- Verify NEXT_PUBLIC_API_URL
- Check backend is running
- Verify CORS settings
```

**4. CORS Errors**
```python
# Update settings.py
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

---

**Next**: Contact team or consult DevOps guidelines for your platform
