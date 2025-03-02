import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the search slice
 */
const initialState = {
  searchResults: [],
  searchQuery: '',
  loading: false,
  error: null,
};

/**
 * Async thunk to search content
 */
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

/**
 * Search slice with reducers and extra reducers for async actions
 */
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      console.log('Clearing search, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        searchResults: [],
        searchQuery: ''
      };
    },
    setSearchQuery: (state, action) => {
      console.log('Setting search query, current state:', state);
      console.log('Setting search query, action payload:', action.payload);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        searchQuery: action.payload
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
      .addCase(searchContent.pending, (state) => {
        console.log('Search content pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        console.log('Search content fulfilled, current state:', state);
        console.log('Search content fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          searchResults: action.payload.results,
          searchQuery: action.payload.query
        };
      })
      .addCase(searchContent.rejected, (state, action) => {
        console.log('Search content rejected, current state:', state);
        console.log('Search content rejected, action payload:', action.payload);
        
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
export const { clearSearch, setSearchQuery, clearError } = searchSlice.actions;

// Export selectors
export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchQuery = (state) => state.search.searchQuery;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

// Export reducer
export default searchSlice.reducer; 