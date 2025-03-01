import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null,
};

// Async thunks
export const searchContent = createAsyncThunk(
  'search/searchContent',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.search.content(query);
      return { results: response.data, query };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Search failed. Please try again.'
      );
    }
  }
);

// Create slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.searchQuery = action.payload.query;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export actions
export const { clearSearch, setSearchQuery, clearError } = searchSlice.actions;

// Export selectors
export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

// Export reducer
export default searchSlice.reducer; 