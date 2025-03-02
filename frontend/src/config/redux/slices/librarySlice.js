import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { toast } from 'react-toastify';

/**
 * Initial state for the library slice
 */
const initialState = {
  purchases: [],
  rentals: [],
  loading: false,
  error: null,
};

/**
 * Async thunk to fetch user's library
 */
export const fetchLibrary = createAsyncThunk(
  'library/fetchLibrary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.library.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to fetch library.'
      );
    }
  }
);

/**
 * Async thunk to create a purchase
 */
export const createPurchase = createAsyncThunk(
  'library/createPurchase',
  async (purchaseData, { rejectWithValue }) => {
    try {
      const response = await api.purchases.create(purchaseData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to complete purchase.'
      );
    }
  }
);

/**
 * Async thunk to create a rental
 */
export const createRental = createAsyncThunk(
  'library/createRental',
  async (rentalData, { rejectWithValue }) => {
    try {
      const response = await api.rentals.create(rentalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to complete rental.'
      );
    }
  }
);

/**
 * Library slice with reducers and extra reducers for async actions
 */
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    clearLibraryError: (state) => {
      console.log('Clearing library error, current state:', state);
      
      // Create a completely new state object to ensure Redux updates properly
      return {
        ...state,
        error: null
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch library
      .addCase(fetchLibrary.pending, (state) => {
        console.log('Fetch library pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        console.log('Fetch library fulfilled, current state:', state);
        console.log('Fetch library fulfilled, action payload:', action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          purchases: action.payload.purchases || [],
          rentals: action.payload.rentals || []
        };
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        console.log('Fetch library rejected, current state:', state);
        console.log('Fetch library rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Create purchase
      .addCase(createPurchase.pending, (state) => {
        console.log('Create purchase pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        console.log('Create purchase fulfilled, current state:', state);
        console.log('Create purchase fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Purchase completed successfully!');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          purchases: [...state.purchases, action.payload]
        };
      })
      .addCase(createPurchase.rejected, (state, action) => {
        console.log('Create purchase rejected, current state:', state);
        console.log('Create purchase rejected, action payload:', action.payload);
        
        // Show error toast
        toast.error(action.payload);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      })
      
      // Create rental
      .addCase(createRental.pending, (state) => {
        console.log('Create rental pending, current state:', state);
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: true,
          error: null
        };
      })
      .addCase(createRental.fulfilled, (state, action) => {
        console.log('Create rental fulfilled, current state:', state);
        console.log('Create rental fulfilled, action payload:', action.payload);
        
        // Show success toast
        toast.success('Rental completed successfully!');
        
        // Create a completely new state object to ensure Redux updates properly
        return {
          ...state,
          loading: false,
          rentals: [...state.rentals, action.payload]
        };
      })
      .addCase(createRental.rejected, (state, action) => {
        console.log('Create rental rejected, current state:', state);
        console.log('Create rental rejected, action payload:', action.payload);
        
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
export const { clearLibraryError } = librarySlice.actions;

// Export selectors
export const selectLibrary = (state) => state.library;
export const selectPurchases = (state) => state.library.purchases;
export const selectRentals = (state) => state.library.rentals;
export const selectLibraryLoading = (state) => state.library.loading;
export const selectLibraryError = (state) => state.library.error;

// Export reducer
export default librarySlice.reducer; 