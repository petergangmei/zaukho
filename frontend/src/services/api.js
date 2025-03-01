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

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of failed requests to retry after token refresh
let failedQueue = [];

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

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

// Response interceptor for handling errors and token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add this request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }
      
      originalRequest._retry = true;
      isRefreshing = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        // No refresh token, clear auth and redirect to login
        localStorage.removeItem('token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
      
      try {
        // Try to refresh the token
        const response = await axios.post(`${API_URLS[environment]}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { token } = response.data;
        
        // Update token in localStorage
        localStorage.setItem('token', token);
        
        // Update Authorization header for the original request
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        
        // Process the queue with the new token
        processQueue(null, token);
        
        isRefreshing = false;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid, clear auth and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        
        // Process the queue with an error
        processQueue(refreshError, null);
        
        isRefreshing = false;
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
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
    logout: (data) => apiClient.post('/auth/logout/', data),
    getUser: () => apiClient.get('/auth/user/'),
    refreshToken: (refreshToken) => apiClient.post('/auth/token/refresh/', { refresh: refreshToken }),
    verifyToken: (token) => apiClient.post('/auth/token/verify/', { token }),
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