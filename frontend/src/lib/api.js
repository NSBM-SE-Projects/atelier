import axios from 'axios';

/**
 * Axios API instance
 * Base URL: Uses VITE_API_URL environment variable
**/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors and redirects
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Log errors for debugging (only in development)
    if (import.meta.env.DEV) {
      console.error('API ERROR:', error.response?.status, error.message);
    }

    return Promise.reject(error);
  }
);

export default api;