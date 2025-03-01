import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Initial state
const initialState = {
  purchases: [],
  rentals: [],
  loading: false,
  error: null,
};

// Async thunks
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

// Create slice
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    clearLibraryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch library
      .addCase(fetchLibrary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = action.payload.purchases || [];
        state.rentals = action.payload.rentals || [];
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create purchase
      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.purchases = [...state.purchases, action.payload];
      })
      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create rental
      .addCase(createRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRental.fulfilled, (state, action) => {
        state.loading = false;
        state.rentals = [...state.rentals, action.payload];
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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