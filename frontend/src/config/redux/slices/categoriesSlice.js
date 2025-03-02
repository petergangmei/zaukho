import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the categories slice
 */
const initialState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch all categories
 */
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.categories.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch categories.'
      );
    }
  }
);

/**
 * Async thunk to fetch category by ID
 */
export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.categories.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch category details.'
      );
    }
  }
);

/**
 * Categories slice with reducers and extra reducers for async actions
 */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      console.log('Clearing current category, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        currentCategory: null
      };
    },
    clearCategoriesError: (state) => {
      console.log('Clearing categories error, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        console.log('Fetch categories pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log('Fetch categories fulfilled, current state:', state);
        console.log('Fetch categories fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          categories: action.payload.results || action.payload
        };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.log('Fetch categories rejected, current state:', state);
        console.log('Fetch categories rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Fetch category by ID
      .addCase(fetchCategoryById.pending, (state) => {
        console.log('Fetch category by ID pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        console.log('Fetch category by ID fulfilled, current state:', state);
        console.log('Fetch category by ID fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          currentCategory: action.payload
        };
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        console.log('Fetch category by ID rejected, current state:', state);
        console.log('Fetch category by ID rejected, action payload:', action.payload);
        
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
export const { clearCurrentCategory, clearCategoriesError } = categoriesSlice.actions;

// Export selectors
export const selectCategories = (state) => state.categories.categories;
export const selectCurrentCategory = (state) => state.categories.currentCategory;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

// Export reducer
export default categoriesSlice.reducer; 