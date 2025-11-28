const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiEndpoints = {
  batches: () => `${API_BASE}/batches/?is_active=true`,
  batch: (slug: string) => `${API_BASE}/batches/${slug}/`,
  batchEnroll: (slug: string) => `${API_BASE}/batches/${slug}/enroll/`,
  batchDemo: (slug: string) => `${API_BASE}/batches/${slug}/demo_lectures/`,
  faculty: () => `${API_BASE}/users/faculty/`,
  notes: () => `${API_BASE}/notes/?is_active=true`,
  doubts: () => `${API_BASE}/doubts/`,
}

// Helper function for API calls with error handling
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};