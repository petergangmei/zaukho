import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Initial state
const initialState = {
  movies: [],
  featuredMovies: [],
  currentMovie: null,
  loading: false,
  error: null,
};

// Async thunks
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

// Create slice
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
    clearMoviesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results || action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch featured movies
      .addCase(fetchFeaturedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredMovies = action.payload.results || action.payload;
      })
      .addCase(fetchFeaturedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch movies by category
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results || action.payload;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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