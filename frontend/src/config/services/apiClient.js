import axios from 'axios';

/**
 * Base API client configuration
 * Sets up axios instance with interceptors for authentication and error handling
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

export default apiClient; 