import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Helper function to safely get token from localStorage
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

// Initial state
const initialState = {
  user: null,
  token: getTokenFromStorage(),
  isAuthenticated: !!getTokenFromStorage(),
  loading: false,
  error: null,
};

// Async thunks
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
      const response = await api.auth.login(loginData);
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

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.auth.register(userData);
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

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const refreshToken = localStorage.getItem('refresh_token');
      
      // Call logout API with refresh token if available
      if (auth.isAuthenticated && refreshToken) {
        try {
          await api.auth.logout({ refresh: refreshToken });
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

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.auth.getUser();
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

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      console.log('Clearing error, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        console.log('Login pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('Login fulfilled, current state:', state);
        console.log('Login fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Login successful! Welcome back.');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
          error: null
        };
      })
      .addCase(login.rejected, (state, action) => {
        console.log('Login rejected, current state:', state);
        console.log('Login rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Register
      .addCase(register.pending, (state) => {
        console.log('Register pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('Register fulfilled, current state:', state);
        console.log('Register fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Registration successful! Welcome to ZAUKHO.');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
          error: null
        };
      })
      .addCase(register.rejected, (state, action) => {
        console.log('Register rejected, current state:', state);
        console.log('Register rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        console.log('Logout pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true
        };
      })
      .addCase(logout.fulfilled, (state) => {
        console.log('Logout fulfilled, current state:', state);
        
        // Show success toast
        toast.success('You have been logged out successfully.');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          token: null,
          user: null,
          error: null
        };
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('Logout rejected, current state:', state);
        console.log('Logout rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          token: null,
          user: null,
          error: action.payload
        };
      })
      
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        console.log('GetCurrentUser pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        console.log('GetCurrentUser fulfilled, current state:', state);
        console.log('GetCurrentUser fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          error: null
        };
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        console.log('GetCurrentUser rejected, current state:', state);
        console.log('GetCurrentUser rejected, action payload:', action.payload);
        
        if (action.payload === 'Not authenticated') {
          // Silent failure for auth check
          return {
            ...state,
            loading: false,
            isAuthenticated: false,
            token: null,
            user: null,
            error: null
          };
        } else if (action.payload === 'Request throttled') {
          // Silent failure for throttled requests
          // Keep existing state intact
          console.log('User request throttled, keeping existing state');
          return state;
        } else {
          // Show error toast
          toast.error(action.payload);
          
          // Create a completely new state object to ensure Redux updates properly
          return {
            ...state,
            loading: false,
            error: action.payload
          };
        }
      });
  },
});

// Export actions
export const { clearError } = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated;
export const selectAuthLoading = (state) => state.auth?.loading;
export const selectAuthError = (state) => state.auth?.error;

// Export reducer
export default authSlice.reducer; 