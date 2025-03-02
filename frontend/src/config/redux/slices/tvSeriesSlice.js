import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the TV series slice
 */
const initialState = {
  tvSeries: [],
  featuredTvSeries: [],
  currentTvSeries: null,
  currentSeason: null,
  currentEpisode: null,
  seasons: [],
  episodes: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all TV series
 */
export const fetchTvSeries = createAsyncThunk(
  'tvSeries/fetchTvSeries',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.tvSeries.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch TV series.'
      );
    }
  }
);

/**
 * Async thunk to fetch featured TV series
 */
export const fetchFeaturedTvSeries = createAsyncThunk(
  'tvSeries/fetchFeaturedTvSeries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.tvSeries.getFeatured();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch featured TV series.'
      );
    }
  }
);

/**
 * Async thunk to fetch a TV series by ID
 */
export const fetchTvSeriesById = createAsyncThunk(
  'tvSeries/fetchTvSeriesById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.tvSeries.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch TV series details.'
      );
    }
  }
);

/**
 * Async thunk to fetch TV series by category
 */
export const fetchTvSeriesByCategory = createAsyncThunk(
  'tvSeries/fetchTvSeriesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.tvSeries.getByCategory(categoryId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch TV series by category.'
      );
    }
  }
);

/**
 * Async thunk to fetch seasons by TV series
 */
export const fetchSeasonsByTvSeries = createAsyncThunk(
  'tvSeries/fetchSeasonsByTvSeries',
  async (tvSeriesId, { rejectWithValue }) => {
    try {
      const response = await api.seasons.getByTvSeries(tvSeriesId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch seasons.'
      );
    }
  }
);

/**
 * Async thunk to fetch a season by ID
 */
export const fetchSeasonById = createAsyncThunk(
  'tvSeries/fetchSeasonById',
  async (seasonId, { rejectWithValue }) => {
    try {
      const response = await api.seasons.getById(seasonId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch season details.'
      );
    }
  }
);

/**
 * Async thunk to fetch episodes by season
 */
export const fetchEpisodesBySeason = createAsyncThunk(
  'tvSeries/fetchEpisodesBySeason',
  async (seasonId, { rejectWithValue }) => {
    try {
      const response = await api.episodes.getBySeason(seasonId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch episodes.'
      );
    }
  }
);

/**
 * Async thunk to fetch an episode by ID
 */
export const fetchEpisodeById = createAsyncThunk(
  'tvSeries/fetchEpisodeById',
  async (episodeId, { rejectWithValue }) => {
    try {
      const response = await api.episodes.getById(episodeId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch episode details.'
      );
    }
  }
);

/**
 * TV Series slice with reducers and extra reducers for async actions
 */
const tvSeriesSlice = createSlice({
  name: 'tvSeries',
  initialState,
  reducers: {
    clearCurrentTvSeries: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        currentTvSeries: null
      };
    },
    clearCurrentSeason: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        currentSeason: null
      };
    },
    clearCurrentEpisode: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        currentEpisode: null
      };
    },
    clearTvSeriesError: (state) => {
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all TV series
      .addCase(fetchTvSeries.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          tvSeries: action.payload.results || action.payload
        };
      })
      .addCase(fetchTvSeries.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch featured TV series
      .addCase(fetchFeaturedTvSeries.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchFeaturedTvSeries.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          featuredTvSeries: action.payload.results || action.payload
        };
      })
      .addCase(fetchFeaturedTvSeries.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch TV series by ID
      .addCase(fetchTvSeriesById.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchTvSeriesById.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          currentTvSeries: action.payload
        };
      })
      .addCase(fetchTvSeriesById.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch TV series by category
      .addCase(fetchTvSeriesByCategory.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchTvSeriesByCategory.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          tvSeries: action.payload.results || action.payload
        };
      })
      .addCase(fetchTvSeriesByCategory.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch seasons by TV series
      .addCase(fetchSeasonsByTvSeries.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchSeasonsByTvSeries.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          seasons: action.payload.results || action.payload
        };
      })
      .addCase(fetchSeasonsByTvSeries.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch season by ID
      .addCase(fetchSeasonById.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchSeasonById.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          currentSeason: action.payload
        };
      })
      .addCase(fetchSeasonById.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch episodes by season
      .addCase(fetchEpisodesBySeason.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchEpisodesBySeason.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          episodes: action.payload.results || action.payload
        };
      })
      .addCase(fetchEpisodesBySeason.rejected, (state, action) => {
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch episode by ID
      .addCase(fetchEpisodeById.pending, (state) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          currentEpisode: action.payload
        };
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
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
export const {
  clearCurrentTvSeries,
  clearCurrentSeason,
  clearCurrentEpisode,
  clearTvSeriesError,
} = tvSeriesSlice.actions;

// Export selectors
export const selectTvSeries = (state) => state.tvSeries.tvSeries;
export const selectFeaturedTvSeries = (state) => state.tvSeries.featuredTvSeries;
export const selectCurrentTvSeries = (state) => state.tvSeries.currentTvSeries;
export const selectCurrentSeason = (state) => state.tvSeries.currentSeason;
export const selectCurrentEpisode = (state) => state.tvSeries.currentEpisode;
export const selectSeasons = (state) => state.tvSeries.seasons;
export const selectEpisodes = (state) => state.tvSeries.episodes;
export const selectTvSeriesLoading = (state) => state.tvSeries.loading;
export const selectTvSeriesError = (state) => state.tvSeries.error;

// Export reducer
export default tvSeriesSlice.reducer; 