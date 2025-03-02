import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../../config/services';
import { toast } from 'react-toastify';

/**
 * Async thunk for user login
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue, getState }) => {
    try {
      console.log('Login attempt with credentials:', { ...credentials, password: '***' });
      console.log('Current auth state before login:', getState().auth);
      
      // Create a copy of the credentials with just email and password
      const loginData = {
        email: credentials.email,
        password: credentials.password
      };
      
      console.log('Sending login request with data:', { ...loginData, password: '***' });
      const response = await authService.login(loginData);
      console.log('Login response received:', response);
      
      // Check if we have the expected data
      if (!response.data || !response.data.token) {
        console.error('Invalid login response format:', response);
        return rejectWithValue('Invalid response from server. Please try again.');
      }
      
      const { token, user, refresh } = response.data;
      console.log('Login successful, extracted data:', { token: '***', user, refresh: '***' });
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }
      
      console.log('Tokens stored in localStorage');
      console.log('Login successful, returning data to reducer');
      return { token, user, refresh };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response?.data?.detail || 'Login failed. Please check your credentials.'
      );
    }
  }
);

/**
 * Async thunk for user registration
 */
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      const { token, user, refresh } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }
      
      return { token, user, refresh };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Registration failed. Please try again.'
      );
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const refreshToken = localStorage.getItem('refresh_token');
      
      // Call logout API with refresh token if available
      if (auth.isAuthenticated && refreshToken) {
        try {
          await authService.logout({ refresh: refreshToken });
        } catch (error) {
          // If token is blacklisted or any other error, just continue with local logout
          console.warn('Logout API call failed:', error.message);
          // We'll still proceed with local logout
        }
      }
      
      // Remove tokens from localStorage regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      
      return null;
    } catch (error) {
      // Even if API call fails, we still want to remove token and log out user
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      
      return rejectWithValue(
        error.response?.data?.detail || 'Logout failed. Please try again.'
      );
    }
  }
);

/**
 * Async thunk to get current user data
 */
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authService.getUser();
      return response.data;
    } catch (error) {
      // Don't show error toast for 401 errors when checking current user
      if (error.response) {
        if (error.response.status === 401) {
          // Clear token if it's invalid
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          
          // Dispatch logout to clean up state
          dispatch(logout());
          
          return rejectWithValue('Not authenticated');
        } else if (error.response.status === 429) {
          // Request was throttled, silently fail
          console.warn('User request throttled:', error.response.data.detail);
          return rejectWithValue('Request throttled');
        }
      }
      
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch user data.'
      );
    }
  }
); 