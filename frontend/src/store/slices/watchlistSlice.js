import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

// Async thunks
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

// Create slice
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearWatchlist: (state) => {
      state.watchlist = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch watchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Add to watchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist.push(action.payload);
        toast.success('Added to watchlist');
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Remove from watchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = state.watchlist.filter(
          (item) => item.id !== action.payload
        );
        toast.success('Removed from watchlist');
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
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