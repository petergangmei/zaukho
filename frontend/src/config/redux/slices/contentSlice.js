import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { 
  fetchFeaturedContent, 
  fetchTrendingContent, 
  fetchRecommendedContent, 
  fetchNewReleases, 
  fetchContentById 
} from '../thunks/contentThunks';

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
 * Content slice with reducers and extra reducers for async actions
 */
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearContentError: (state) => {
      return {
        ...state,
        error: null
      };
    },
    resetContentLoading: (state) => {
      return {
        ...state,
        loading: false
      };
    },
    clearContentDetails: (state) => {
      return {
        ...state,
        contentDetails: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Featured content
      .addCase(fetchFeaturedContent.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchFeaturedContent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          featuredContent: action.payload,
          error: null
        };
      })
      .addCase(fetchFeaturedContent.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Trending content
      .addCase(fetchTrendingContent.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          trendingContent: action.payload,
          error: null
        };
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Recommended content
      .addCase(fetchRecommendedContent.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchRecommendedContent.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          recommendedContent: action.payload,
          error: null
        };
      })
      .addCase(fetchRecommendedContent.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // New releases
      .addCase(fetchNewReleases.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchNewReleases.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          newReleases: action.payload,
          error: null
        };
      })
      .addCase(fetchNewReleases.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Content by ID
      .addCase(fetchContentById.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          contentDetails: action.payload,
          error: null
        };
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      });
  },
});

// Export actions
export const { clearContentError, resetContentLoading, clearContentDetails } = contentSlice.actions;

// Export selectors
export const selectFeaturedContent = (state) => state.content.featuredContent;
export const selectTrendingContent = (state) => state.content.trendingContent;
export const selectRecommendedContent = (state) => state.content.recommendedContent;
export const selectNewReleases = (state) => state.content.newReleases;
export const selectContentDetails = (state) => state.content.contentDetails;
export const selectContentLoading = (state) => state.content.loading;
export const selectContentError = (state) => state.content.error;

// Export thunks for backward compatibility
export { 
  fetchFeaturedContent, 
  fetchTrendingContent, 
  fetchRecommendedContent, 
  fetchNewReleases, 
  fetchContentById 
};

// Export reducer
export default contentSlice.reducer; 