const API_BASE = 'http://localhost:8000/api';

export const apiEndpoints = {
  batches: () => `${API_BASE}/batches/?is_active=true`,
  batch: (slug: string) => `${API_BASE}/batches/${slug}/`,
  batchEnroll: (slug: string) => `${API_BASE}/batches/${slug}/enroll/`,
  batchDemo: (slug: string) => `${API_BASE}/batches/${slug}/demo_lectures/`,
  faculty: () => `${API_BASE}/users/faculty/`,
  notes: () => `${API_BASE}/notes/?is_active=true`,
  doubts: () => `${API_BASE}/doubts/`,
}
