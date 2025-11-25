# PadhoPlus Frontend

A minimalistic, responsive Next.js frontend for the PadhoPlus online education platform. Built with TypeScript, Tailwind CSS, and Lucide React icons for education-focused design.

## Tech Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS
- **Lucide React**: Education-focused icons
- **Axios**: API client

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx                 # Home/Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── batches/                 # Batches listing page
│   ├── batch/[slug]/            # Batch detail page (dynamic)
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── dashboard/               # Student dashboard
│   └── about/                   # About page
├── components/
│   ├── Navbar.tsx               # Navigation bar
│   ├── Footer.tsx               # Footer
│   ├── HeroSection.tsx          # Hero banner
│   ├── BatchCard.tsx            # Batch card component
│   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   └── Banner.tsx               # Alert/notification banner
├── lib/
│   └── api.ts                   # Axios API client
├── .env.local                   # Environment variables
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
└── next.config.ts               # Next.js config
```

## Features

### Design Principles
- **Minimalistic**: Clean, distraction-free UI
- **Responsive**: Mobile-first approach
- **Figma-style**: Professional, modern design system
- **Education-focused**: Icons and colors aligned with learning

### Pages Implemented

1. **Home** - Landing page with featured batches and CTAs
2. **Batches Listing** - Searchable batch directory with filters
3. **Batch Detail** - Comprehensive batch information with tabs
4. **Login** - User authentication
5. **Register** - New user signup
6. **Dashboard** - Student learning hub with stats
7. **About** - Company information

### Key Components

- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Links and contact information
- **HeroSection**: Eye-catching banner with CTAs
- **BatchCard**: Reusable batch display component
- **Breadcrumb**: Navigation trail
- **Banner**: Alert/notification system

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Design System

### Colors

- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Purple)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Danger: `#EF4444` (Red)

### Button Styles

```tsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-outline">Outline</button>
```

### Card Style

```tsx
<div className="card">
  Content here
</div>
```

## API Integration

The frontend connects to the Django backend via the `lib/api.ts` client:

```typescript
import api from '@/lib/api'

// Fetch batches
const response = await api.get('/batches/')

// Post data
await api.post('/auth/login/', { email, password })
```

## Future Enhancements

- [ ] Student portal with full dashboard
- [ ] Lecture player with video integration
- [ ] Practice questions interface
- [ ] Test series implementation
- [ ] Doubt resolution system
- [ ] Progress analytics with charts
- [ ] Parent portal
- [ ] Teacher portal
- [ ] Payment integration
- [ ] Multi-language support

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components use Tailwind's responsive classes (sm:, md:, lg:, etc.)

## Contributing

Development guidelines:
- Keep components small and reusable
- Follow TypeScript strict mode
- Use semantic HTML
- Maintain minimalistic design principles
- Test responsive design on all breakpoints
