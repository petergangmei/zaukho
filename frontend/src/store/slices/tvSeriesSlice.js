import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Initial state
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

// Async thunks
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

// Create slice
const tvSeriesSlice = createSlice({
  name: 'tvSeries',
  initialState,
  reducers: {
    clearCurrentTvSeries: (state) => {
      state.currentTvSeries = null;
    },
    clearCurrentSeason: (state) => {
      state.currentSeason = null;
    },
    clearCurrentEpisode: (state) => {
      state.currentEpisode = null;
    },
    clearTvSeriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all TV series
      .addCase(fetchTvSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.tvSeries = action.payload.results || action.payload;
      })
      .addCase(fetchTvSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch featured TV series
      .addCase(fetchFeaturedTvSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedTvSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredTvSeries = action.payload.results || action.payload;
      })
      .addCase(fetchFeaturedTvSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch TV series by ID
      .addCase(fetchTvSeriesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvSeriesById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTvSeries = action.payload;
      })
      .addCase(fetchTvSeriesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch TV series by category
      .addCase(fetchTvSeriesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTvSeriesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.tvSeries = action.payload.results || action.payload;
      })
      .addCase(fetchTvSeriesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch seasons by TV series
      .addCase(fetchSeasonsByTvSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasonsByTvSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.seasons = action.payload.results || action.payload;
      })
      .addCase(fetchSeasonsByTvSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch season by ID
      .addCase(fetchSeasonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeasonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSeason = action.payload;
      })
      .addCase(fetchSeasonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch episodes by season
      .addCase(fetchEpisodesBySeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodesBySeason.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload.results || action.payload;
      })
      .addCase(fetchEpisodesBySeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch episode by ID
      .addCase(fetchEpisodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEpisode = action.payload;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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