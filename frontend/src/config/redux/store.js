import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { createTransform } from 'redux-persist';

// Import reducers from the new slices structure
import { 
  authReducer, 
  watchlistReducer, 
  searchReducer, 
  contentReducer,
  categoriesReducer,
  libraryReducer,
  moviesReducer,
  tvSeriesReducer
} from './slices';

/**
 * Combine all reducers into a root reducer
 */
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

/**
 * Create a transform to validate the auth state before persisting and rehydrating
 */
const authTransform = createTransform(
  // transform state on its way to being serialized and persisted
  (inboundState) => {
    console.log('Persisting auth state:', inboundState);
    return {
      ...inboundState,
      loading: false, // Always reset loading to false when persisting
    };
  },
  // transform state being rehydrated
  (outboundState) => {
    console.log('Rehydrating auth state:', outboundState);
    // Validate token on rehydration
    const token = outboundState.token;
    const isValid = !!token;
    
    return {
      ...outboundState,
      loading: false,
      isAuthenticated: isValid && outboundState.isAuthenticated,
    };
  },
  // specify which reducers this transform gets called for
  { whitelist: ['auth'] }
);

/**
 * Configure Redux Persist
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'watchlist'], // Only persist auth and watchlist states
  transforms: [authTransform],
};

/**
 * Create persisted reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure Redux store
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

/**
 * Create Redux Persistor
 */
export const persistor = persistStore(store);

// Export as default (following best practices)
const storeExports = { store, persistor };
export default storeExports; 