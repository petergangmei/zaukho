import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { login, register, logout, getCurrentUser } from '../thunks/authThunks';

/**
 * Helper function to safely get token from localStorage
 */
const getTokenFromStorage = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

/**
 * Initial state for the auth slice
 */
const initialState = {
  user: null,
  token: getTokenFromStorage(),
  isAuthenticated: !!getTokenFromStorage(),
  loading: false,
  error: null,
};

/**
 * Auth slice with reducers and extra reducers for async actions
 */
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
    resetLoading: (state) => {
      console.log('Resetting loading state, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        loading: false
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
export const { clearError, resetLoading } = authSlice.actions;

// Export selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth?.user;
export const selectIsAuthenticated = (state) => state.auth?.isAuthenticated;
export const selectAuthLoading = (state) => state.auth?.loading;
export const selectAuthError = (state) => state.auth?.error;

// Export thunks for backward compatibility
export { login, register, logout, getCurrentUser };

// Export reducer
export default authSlice.reducer; 