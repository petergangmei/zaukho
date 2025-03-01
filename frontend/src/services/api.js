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

// Track last user request time to prevent excessive polling
let lastUserRequestTime = 0;
const USER_REQUEST_THROTTLE_MS = 10000; // 10 seconds minimum between requests

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
    // Handle network errors or server unavailable
    if (!error.response) {
      console.error('Network error or server unavailable:', error.message);
      return Promise.reject({
        response: {
          status: 0,
          data: { detail: 'Network error. Please check your connection and try again.' }
        }
      });
    }
    
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
    
    // Handle 400 Bad Request for logout specifically
    if (error.response && error.response.status === 400 && 
        originalRequest.url && originalRequest.url.includes('/auth/logout/')) {
      // If logout fails with 400, it might be due to an already blacklisted token
      // We'll still consider this a "successful" logout from the user's perspective
      console.warn('Logout API returned 400, token might be already blacklisted');
      return { data: { detail: 'Logged out successfully' } };
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => {
      console.log('API login called with:', { ...credentials, password: '***' });
      
      try {
        return apiClient.post('/auth/login/', credentials)
          .then(response => {
            console.log('API login raw response:', response);
            
            // Validate response format
            if (!response.data || !response.data.token) {
              console.error('Invalid login response format from server:', response);
              throw new Error('Invalid response format from server');
            }
            
            return response;
          })
          .catch(error => {
            console.error('API login error caught:', error);
            
            if (error.response && error.response.status === 401) {
              // Transform the error to have a more user-friendly message
              const customError = new Error('Invalid credentials. Please check your email and password.');
              customError.response = {
                status: 401,
                data: { detail: 'Invalid credentials. Please check your email and password.' }
              };
              throw customError;
            }
            
            // For network errors or other issues
            if (!error.response) {
              const networkError = new Error('Network error. Please check your connection and try again.');
              networkError.response = {
                status: 0,
                data: { detail: 'Network error. Please check your connection and try again.' }
              };
              throw networkError;
            }
            
            throw error;
          });
      } catch (error) {
        console.error('API login outer error:', error);
        throw error;
      }
    },
    register: (userData) => {
      try {
        return apiClient.post('/auth/register/', userData);
      } catch (error) {
        console.error('API register error:', error);
        throw error;
      }
    },
    logout: (data) => {
      try {
        return apiClient.post('/auth/logout/', data);
      } catch (error) {
        console.error('API logout error:', error);
        throw error;
      }
    },
    getUser: () => {
      const now = Date.now();
      // Throttle requests to prevent excessive polling
      if (now - lastUserRequestTime < USER_REQUEST_THROTTLE_MS) {
        console.warn('User request throttled to prevent excessive API calls');
        return Promise.reject({
          response: {
            status: 429,
            data: { detail: 'Too many requests. Please try again later.' }
          }
        });
      }
      
      lastUserRequestTime = now;
      try {
        return apiClient.get('/auth/user/');
      } catch (error) {
        console.error('API getUser error:', error);
        throw error;
      }
    },
    refreshToken: (refreshToken) => {
      try {
        return apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
      } catch (error) {
        console.error('API refreshToken error:', error);
        throw error;
      }
    },
    verifyToken: (token) => {
      try {
        return apiClient.post('/auth/token/verify/', { token });
      } catch (error) {
        console.error('API verifyToken error:', error);
        throw error;
      }
    },
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