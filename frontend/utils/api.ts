const API_BASE = 'http://306c74e6-6a15-4903-90bc-458370a2f624-00-27zy41y8ejs1o.picard.replit.dev:8000/api'

export const apiEndpoints = {
  batches: () => `${API_BASE}/batches/?is_active=true`,
  batch: (slug: string) => `${API_BASE}/batches/${slug}/`,
  batchEnroll: (slug: string) => `${API_BASE}/batches/${slug}/enroll/`,
  batchDemo: (slug: string) => `${API_BASE}/batches/${slug}/demo_lectures/`,
  faculty: () => `${API_BASE}/users/faculty/`,
  notes: () => `${API_BASE}/notes/?is_active=true`,
}
