import apiClient from './apiClient';

/**
 * Authentication service
 * Handles user authentication, registration, and token management
 */

// Track last user request time to prevent excessive polling
let lastUserRequestTime = 0;
const USER_REQUEST_THROTTLE_MS = 3000; // 3 seconds minimum between requests

// Cache for user data to reduce API calls
let userDataCache = null;
let userDataCacheTime = 0;
const USER_CACHE_TTL_MS = 60000; // 1 minute cache TTL

/**
 * Authentication service with methods for login, registration, and token management
 */
const authService = {
  /**
   * Log in a user with credentials
   * @param {Object} credentials - User credentials (email/password)
   * @returns {Promise} - API response with token
   */
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

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - API response
   */
  register: (userData) => {
    try {
      return apiClient.post('/auth/register/', userData);
    } catch (error) {
      console.error('API register error:', error);
      throw error;
    }
  },

  /**
   * Log out the current user
   * @param {Object} data - Logout data (refresh token)
   * @returns {Promise} - API response
   */
  logout: (data) => {
    try {
      return apiClient.post('/auth/logout/', data);
    } catch (error) {
      console.error('API logout error:', error);
      throw error;
    }
  },

  /**
   * Get current user data with caching and throttling
   * @returns {Promise} - API response with user data
   */
  getUser: () => {
    const now = Date.now();
    
    // Return cached user data if available and not expired
    if (userDataCache && (now - userDataCacheTime < USER_CACHE_TTL_MS)) {
      console.log('Returning cached user data');
      return Promise.resolve({ data: userDataCache });
    }
    
    // Throttle requests to prevent excessive polling
    if (now - lastUserRequestTime < USER_REQUEST_THROTTLE_MS) {
      console.warn('User request throttled to prevent excessive API calls');
      
      // If we have cached data, return it even if throttled
      if (userDataCache) {
        console.log('Returning cached user data during throttling');
        return Promise.resolve({ data: userDataCache });
      }
      
      return Promise.reject({
        response: {
          status: 429,
          data: { detail: 'Too many requests. Please try again later.' }
        }
      });
    }
    
    lastUserRequestTime = now;
    try {
      return apiClient.get('/auth/user/')
        .then(response => {
          // Cache the user data
          userDataCache = response.data;
          userDataCacheTime = now;
          return response;
        });
    } catch (error) {
      console.error('API getUser error:', error);
      throw error;
    }
  },

  /**
   * Refresh the authentication token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise} - API response with new token
   */
  refreshToken: (refreshToken) => {
    try {
      return apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
    } catch (error) {
      console.error('API refreshToken error:', error);
      throw error;
    }
  },

  /**
   * Verify a token is valid
   * @param {string} token - The token to verify
   * @returns {Promise} - API response
   */
  verifyToken: (token) => {
    try {
      return apiClient.post('/auth/token/verify/', { token });
    } catch (error) {
      console.error('API verifyToken error:', error);
      throw error;
    }
  },

  /**
   * Request a password reset
   * @param {string} email - User email
   * @returns {Promise} - API response
   */
  resetPassword: (email) => apiClient.post('/auth/password-reset/', { email }),

  /**
   * Confirm password reset with token and new password
   * @param {Object} data - Password reset data
   * @returns {Promise} - API response
   */
  confirmResetPassword: (data) => apiClient.post('/auth/password-reset/confirm/', data),
};

export default authService; 