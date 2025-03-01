import axios from 'axios';

/**
 * API service for making requests to the backend
 * Handles both development and production environments
 */

// Base URLs for different environments
const API_URLS = {
  development: 'http://localhost:8000/api',
  production: 'https://api.zaukho.com/api', // Replace with your production API URL
};

// Get the current environment
const environment = process.env.NODE_ENV || 'development';

// Create axios instance with base URL for current environment
const apiClient = axios.create({
  baseURL: API_URLS[environment],
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiClient.post('/auth/login/', credentials),
    register: (userData) => apiClient.post('/auth/register/', userData),
    logout: () => apiClient.post('/auth/logout/'),
    getUser: () => apiClient.get('/auth/user/'),
    refreshToken: () => apiClient.post('/auth/token/refresh/'),
    resetPassword: (email) => apiClient.post('/auth/password-reset/', { email }),
    confirmResetPassword: (data) => apiClient.post('/auth/password-reset/confirm/', data),
  },
  
  // User profile endpoints
  profile: {
    get: () => apiClient.get('/users/profile/'),
    update: (data) => apiClient.patch('/users/profile/', data),
    updatePassword: (data) => apiClient.post('/users/profile/change-password/', data),
  },
  
  // Content endpoints
  content: {
    getAll: (params) => apiClient.get('/content/', { params }),
    getById: (id) => apiClient.get(`/content/${id}/`),
    getFeatured: () => apiClient.get('/content/featured/'),
    getTrending: () => apiClient.get('/content/trending/'),
    getRecommended: () => apiClient.get('/content/recommended/'),
    getNewReleases: () => apiClient.get('/content/new-releases/'),
  },
  
  // Categories endpoints
  categories: {
    getAll: () => apiClient.get('/categories/'),
    getById: (id) => apiClient.get(`/categories/${id}/`),
    getContent: (id, params) => apiClient.get(`/categories/${id}/content/`, { params }),
  },
  
  // Search endpoint
  search: {
    content: (query) => apiClient.get('/search/', { params: { q: query } }),
  },
  
  // Watchlist endpoints
  watchlist: {
    getAll: () => apiClient.get('/watchlist/'),
    add: (contentId) => apiClient.post('/watchlist/add/', { content_id: contentId }),
    remove: (contentId) => apiClient.delete(`/watchlist/remove/${contentId}/`),
  },
  
  // Library endpoints
  library: {
    get: () => apiClient.get('/library/'),
  },
  
  // Purchases endpoints
  purchases: {
    create: (data) => apiClient.post('/purchases/', data),
  },
  
  // Rentals endpoints
  rentals: {
    create: (data) => apiClient.post('/rentals/', data),
  },
  
  // Ratings endpoints
  ratings: {
    create: (data) => apiClient.post('/ratings/', data),
    update: (id, data) => apiClient.put(`/ratings/${id}/`, data),
    delete: (id) => apiClient.delete(`/ratings/${id}/`),
  },
  
  // Comments endpoints
  comments: {
    getByContent: (contentId) => apiClient.get(`/content/${contentId}/comments/`),
    create: (data) => apiClient.post('/comments/', data),
    update: (id, data) => apiClient.put(`/comments/${id}/`, data),
    delete: (id) => apiClient.delete(`/comments/${id}/`),
  },
};

export default api; 