import { createAsyncThunk } from '@reduxjs/toolkit';
import { contentService } from '../../../config/services';
import { toast } from 'react-toastify';

/**
 * Async thunk to fetch featured content
 */
export const fetchFeaturedContent = createAsyncThunk(
  'content/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentService.getFeatured();
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
      const response = await contentService.getTrending();
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
      const response = await contentService.getRecommended();
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
      const response = await contentService.getNewReleases();
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
      const response = await contentService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch content details.'
      );
    }
  }
); 