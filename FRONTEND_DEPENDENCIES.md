# PadhoPlus Frontend - Dependencies Guide

Complete list of all Next.js frontend dependencies and their versions.

## Installation
```bash
cd frontend
npm install
```

---

## Production Dependencies

### Next.js & React Core
- **next** (^16.0.4) - React framework for production
- **react** (^19.2.0) - React library
- **react-dom** (^19.2.0) - React DOM rendering

### Styling & UI
- **tailwindcss** (^4.1.17) - Utility-first CSS framework
- **lucide-react** (^0.554.0) - Beautiful icon library
- **autoprefixer** (^10.4.22) - PostCSS plugin for vendor prefixes
- **postcss** (^8.5.6) - CSS transformations
- **@tailwindcss/postcss** (^4.1.17) - Tailwind CSS PostCSS plugin

### API & HTTP
- **axios** (^1.13.2) - HTTP client for API calls

---

## Development Dependencies

### Type Safety
- **typescript** (^5.9.3) - TypeScript compiler
- **@types/react** (^19.2.7) - React type definitions
- **@types/node** (^24.10.1) - Node.js type definitions

### Linting & Quality (Optional)
```bash
npm install --save-dev eslint
npm install --save-dev prettier
npm install --save-dev @types/react-dom
```

---

## Complete Package.json

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 5000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "axios": "^1.13.2",
    "lucide-react": "^0.554.0",
    "next": "^16.0.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.7",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.17",
    "typescript": "^5.9.3"
  }
}
```

---

## Updating Dependencies

### Check for Outdated Packages
```bash
npm outdated
```

### Update All Packages
```bash
npm update
```

### Update Specific Package
```bash
npm install package-name@latest
```

### Clean Install (Fix Issues)
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Dependency Descriptions

| Package | Purpose | Version |
|---------|---------|---------|
| next | React framework with SSR/SSG | ^16.0.4 |
| react | UI library | ^19.2.0 |
| react-dom | React DOM binding | ^19.2.0 |
| axios | HTTP client | ^1.13.2 |
| lucide-react | Icon library | ^0.554.0 |
| tailwindcss | CSS framework | ^4.1.17 |
| typescript | Type checking | ^5.9.3 |
| postcss | CSS processor | ^8.5.6 |
| autoprefixer | Vendor prefix plugin | ^10.4.22 |
| @tailwindcss/postcss | Tailwind PostCSS | ^4.1.17 |

---

## Troubleshooting

### Dependency Conflicts
```bash
npm install --legacy-peer-deps
```

### Cache Issues
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --verbose
```

---

**Last Updated**: November 26, 2025
**Next.js Version**: 16.0.4
**React Version**: 19.2.0
