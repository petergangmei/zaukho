import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the content slice
 */
const initialState = {
  featuredContent: [],
  trendingContent: [],
  recommendedContent: [],
  newReleases: [],
  contentDetails: null,
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch featured content
 */
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

/**
 * Async thunk to fetch trending content
 */
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

/**
 * Async thunk to fetch recommended content
 */
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

/**
 * Async thunk to fetch new releases
 */
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

/**
 * Async thunk to fetch content by ID
 */
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

/**
 * Content slice with reducers and extra reducers for async actions
 */
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearContentDetails: (state) => {
      console.log('Clearing content details, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        contentDetails: null
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
      // Featured content
      .addCase(fetchFeaturedContent.pending, (state) => {
        console.log('Fetch featured content pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchFeaturedContent.fulfilled, (state, action) => {
        console.log('Fetch featured content fulfilled, current state:', state);
        console.log('Fetch featured content fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          featuredContent: action.payload
        };
      })
      .addCase(fetchFeaturedContent.rejected, (state, action) => {
        console.log('Fetch featured content rejected, current state:', state);
        console.log('Fetch featured content rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Trending content
      .addCase(fetchTrendingContent.pending, (state) => {
        console.log('Fetch trending content pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        console.log('Fetch trending content fulfilled, current state:', state);
        console.log('Fetch trending content fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          trendingContent: action.payload
        };
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        console.log('Fetch trending content rejected, current state:', state);
        console.log('Fetch trending content rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Recommended content
      .addCase(fetchRecommendedContent.pending, (state) => {
        console.log('Fetch recommended content pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchRecommendedContent.fulfilled, (state, action) => {
        console.log('Fetch recommended content fulfilled, current state:', state);
        console.log('Fetch recommended content fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          recommendedContent: action.payload
        };
      })
      .addCase(fetchRecommendedContent.rejected, (state, action) => {
        console.log('Fetch recommended content rejected, current state:', state);
        console.log('Fetch recommended content rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // New releases
      .addCase(fetchNewReleases.pending, (state) => {
        console.log('Fetch new releases pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchNewReleases.fulfilled, (state, action) => {
        console.log('Fetch new releases fulfilled, current state:', state);
        console.log('Fetch new releases fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          newReleases: action.payload
        };
      })
      .addCase(fetchNewReleases.rejected, (state, action) => {
        console.log('Fetch new releases rejected, current state:', state);
        console.log('Fetch new releases rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Content details
      .addCase(fetchContentById.pending, (state) => {
        console.log('Fetch content by ID pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        console.log('Fetch content by ID fulfilled, current state:', state);
        console.log('Fetch content by ID fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          contentDetails: action.payload
        };
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        console.log('Fetch content by ID rejected, current state:', state);
        console.log('Fetch content by ID rejected, action payload:', action.payload);
        
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