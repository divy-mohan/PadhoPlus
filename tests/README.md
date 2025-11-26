# PadhoPlus Test Suite

This directory contains all test files for the PadhoPlus project.

## Structure

```
tests/
├── backend/          # Django/Python unit tests
│   ├── test_auth.py
│   ├── test_batches.py
│   ├── test_doubts.py
│   └── test_payments.py
├── frontend/         # Next.js/React component tests
│   ├── __tests__/
│   │   ├── DoubtCard.test.tsx
│   │   └── BatchCard.test.tsx
│   └── unit/
├── e2e/              # End-to-end tests
│   ├── auth.e2e.ts
│   ├── doubt_portal.e2e.ts
│   └── enrollment.e2e.ts
└── README.md         # This file
```

## Running Tests

### Backend Tests
```bash
# Run all tests
python manage.py test

# Run specific app
python manage.py test padhoplus.doubts

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests
```bash
# Run Jest tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### E2E Tests
```bash
# Run Cypress tests
npm run cypress:open
npm run cypress:run
```

## Test File Naming
- Backend: `test_<feature>.py`
- Frontend: `<Component>.test.tsx`
- E2E: `<feature>.e2e.ts`

## Writing Tests

See DEVELOPMENT_WORKFLOW.md for detailed testing guide.
