import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

// Initial state
const initialState = {
  featuredContent: [],
  trendingContent: [],
  recommendedContent: [],
  newReleases: [],
  contentDetails: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchFeaturedContent = createAsyncThunk(
  'content/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.content.getFeatured();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch featured content.'
      );
    }
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.content.getTrending();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch trending content.'
      );
    }
  }
);

export const fetchRecommendedContent = createAsyncThunk(
  'content/fetchRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.content.getRecommended();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch recommended content.'
      );
    }
  }
);

export const fetchNewReleases = createAsyncThunk(
  'content/fetchNewReleases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.content.getNewReleases();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch new releases.'
      );
    }
  }
);

export const fetchContentById = createAsyncThunk(
  'content/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.content.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch content details.'
      );
    }
  }
);

// Create slice
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearContentDetails: (state) => {
      state.contentDetails = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Featured content
      .addCase(fetchFeaturedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredContent = action.payload;
      })
      .addCase(fetchFeaturedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Trending content
      .addCase(fetchTrendingContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingContent = action.payload;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Recommended content
      .addCase(fetchRecommendedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendedContent = action.payload;
      })
      .addCase(fetchRecommendedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // New releases
      .addCase(fetchNewReleases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewReleases.fulfilled, (state, action) => {
        state.loading = false;
        state.newReleases = action.payload;
      })
      .addCase(fetchNewReleases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      
      // Content details
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.contentDetails = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export actions
export const { clearContentDetails, clearError } = contentSlice.actions;

// Export selectors
export const selectFeaturedContent = (state) => state.content.featuredContent;
export const selectTrendingContent = (state) => state.content.trendingContent;
export const selectRecommendedContent = (state) => state.content.recommendedContent;
export const selectNewReleases = (state) => state.content.newReleases;
export const selectContentDetails = (state) => state.content.contentDetails;
export const selectContentLoading = (state) => state.content.loading;
export const selectContentError = (state) => state.content.error;

// Export reducer
export default contentSlice.reducer; 