// Use relative URLs for browser to work correctly with Next.js rewrites
export const apiEndpoints = {
  batches: () => `/api/batches/?is_active=true`,
  batch: (slug: string) => `/api/batches/${slug}/`,
  batchEnroll: (slug: string) => `/api/batches/${slug}/enroll/`,
  batchDemo: (slug: string) => `/api/batches/${slug}/demo_lectures/`,
  faculty: () => `http://localhost:8000/api/users/faculty/`,
  notes: () => `http://localhost:8000/api/notes/?is_active=true`,
  doubts: () => `/api/doubts/`,
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