import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the watchlist slice
 */
const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch user's watchlist
 */
export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.watchlist.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch watchlist.'
      );
    }
  }
);

/**
 * Async thunk to add content to watchlist
 */
export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await api.watchlist.add(contentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to add to watchlist.'
      );
    }
  }
);

/**
 * Async thunk to remove content from watchlist
 */
export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async (contentId, { rejectWithValue }) => {
    try {
      await api.watchlist.remove(contentId);
      return contentId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to remove from watchlist.'
      );
    }
  }
);

/**
 * Watchlist slice with reducers and extra reducers for async actions
 */
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearWatchlist: (state) => {
      console.log('Clearing watchlist, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        watchlist: []
      };
    },
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
      // Fetch watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        console.log('Fetch watchlist pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        console.log('Fetch watchlist fulfilled, current state:', state);
        console.log('Fetch watchlist fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          watchlist: action.payload
        };
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        console.log('Fetch watchlist rejected, current state:', state);
        console.log('Fetch watchlist rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Add to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        console.log('Add to watchlist pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        console.log('Add to watchlist fulfilled, current state:', state);
        console.log('Add to watchlist fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Added to watchlist');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          watchlist: [...state.watchlist, action.payload]
        };
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        console.log('Add to watchlist rejected, current state:', state);
        console.log('Add to watchlist rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Remove from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        console.log('Remove from watchlist pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        console.log('Remove from watchlist fulfilled, current state:', state);
        console.log('Remove from watchlist fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Removed from watchlist');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          watchlist: state.watchlist.filter(item => item.id !== action.payload)
        };
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        console.log('Remove from watchlist rejected, current state:', state);
        console.log('Remove from watchlist rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      });
  },
});

// Export actions
export const { clearWatchlist, clearError } = watchlistSlice.actions;

// Export selectors
export const selectWatchlist = (state) => state.watchlist.watchlist;
export const selectWatchlistLoading = (state) => state.watchlist.loading;
export const selectWatchlistError = (state) => state.watchlist.error;

// Export reducer
export default watchlistSlice.reducer; 