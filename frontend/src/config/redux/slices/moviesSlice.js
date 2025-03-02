import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the movies slice
 */
const initialState = {
  movies: [],
  featuredMovies: [],
  currentMovie: null,
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all movies
 */
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.movies.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch movies.'
      );
    }
  }
);

/**
 * Async thunk to fetch featured movies
 */
export const fetchFeaturedMovies = createAsyncThunk(
  'movies/fetchFeaturedMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.movies.getFeatured();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch featured movies.'
      );
    }
  }
);

/**
 * Async thunk to fetch a movie by ID
 */
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.movies.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch movie details.'
      );
    }
  }
);

/**
 * Async thunk to fetch movies by category
 */
export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchMoviesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.movies.getByCategory(categoryId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch movies by category.'
      );
    }
  }
);

/**
 * Movies slice with reducers and extra reducers for async actions
 */
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        currentMovie: null
      };
    },
    clearMoviesError: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all movies
      .addCase(fetchMovies.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          movies: action.payload.results || action.payload
        };
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch featured movies
      .addCase(fetchFeaturedMovies.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          featuredMovies: action.payload.results || action.payload
        };
      })
      .addCase(fetchFeaturedMovies.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          currentMovie: action.payload
        };
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch movies by category
      .addCase(fetchMoviesByCategory.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          movies: action.payload.results || action.payload
        };
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
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
export const { clearCurrentMovie, clearMoviesError } = moviesSlice.actions;

// Export selectors
export const selectMovies = (state) => state.movies.movies;
export const selectFeaturedMovies = (state) => state.movies.featuredMovies;
export const selectCurrentMovie = (state) => state.movies.currentMovie;
export const selectMoviesLoading = (state) => state.movies.loading;
export const selectMoviesError = (state) => state.movies.error;

// Export reducer
export default moviesSlice.reducer; 