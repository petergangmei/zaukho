import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

// Import reducers
import authReducer from './slices/authSlice';
import categoriesReducer from './slices/categoriesSlice';
import libraryReducer from './slices/librarySlice';
import moviesReducer from './slices/moviesSlice';
import tvSeriesReducer from './slices/tvSeriesSlice';
import contentReducer from './slices/contentSlice';
import searchReducer from './slices/searchSlice';
import watchlistReducer from './slices/watchlistSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  library: libraryReducer,
  movies: moviesReducer,
  tvSeries: tvSeriesReducer,
  content: contentReducer,
  search: searchReducer,
  watchlist: watchlistReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'watchlist'], // Persist auth and watchlist states
  // Add a transform to ensure the state is valid before rehydrating
  transforms: [
    {
      in: (state, key) => {
        // Make sure the state is valid before persisting
        if (key === 'auth' && state) {
          console.log('Persisting auth state:', state);
          return {
            ...state,
            loading: false, // Reset loading state on persist
            error: null // Reset error state on persist
          };
        }
        return state;
      },
      out: (state, key) => {
        // Make sure the state is valid when rehydrating
        if (key === 'auth' && state) {
          console.log('Rehydrating auth state:', state);
          
          // Ensure token is still in localStorage
          const token = localStorage.getItem('token');
          if (!token && state.isAuthenticated) {
            console.warn('Token missing from localStorage but state shows authenticated');
            return {
              ...state,
              isAuthenticated: false,
              token: null,
              user: null,
              loading: false,
              error: null
            };
          }
          
          return {
            ...state,
            loading: false, // Ensure loading is false when rehydrating
            error: null // Ensure error is null when rehydrating
          };
        }
        return state;
      }
    }
  ]
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
const persistor = persistStore(store);

// Export store and persistor
export { store, persistor };

// Export as default (following best practices)
const storeExports = { store, persistor };
export default storeExports; 