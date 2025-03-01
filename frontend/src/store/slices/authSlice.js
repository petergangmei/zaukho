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
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.auth.login(credentials);
      const { token, user, refresh } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }
      
      return { token, user, refresh };
    } catch (error) {
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
        await api.auth.logout({ refresh: refreshToken });
      }
      
      // Remove tokens from localStorage
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
      if (error.response && error.response.status === 401) {
        // Clear token if it's invalid
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        
        // Dispatch logout to clean up state
        dispatch(logout());
        
        return rejectWithValue('Not authenticated');
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
      // Check if state exists before setting error to null
      if (state) {
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        if (state) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (state) {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          toast.success('Login successful! Welcome back.');
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state) {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      })
      
      // Register
      .addCase(register.pending, (state) => {
        if (state) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        if (state) {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          toast.success('Registration successful! Welcome to ZAUKHO.');
        }
      })
      .addCase(register.rejected, (state, action) => {
        if (state) {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        if (state) {
          state.loading = true;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        if (state) {
          state.loading = false;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
          toast.success('You have been logged out successfully.');
        }
      })
      .addCase(logout.rejected, (state, action) => {
        if (state) {
          state.loading = false;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
          state.error = action.payload;
          toast.error(action.payload);
        }
      })
      
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        if (state) {
          state.loading = true;
          state.error = null;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (state) {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        if (state) {
          state.loading = false;
          if (action.payload === 'Not authenticated') {
            // Silent failure for auth check
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
          } else {
            state.error = action.payload;
            toast.error(action.payload);
          }
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