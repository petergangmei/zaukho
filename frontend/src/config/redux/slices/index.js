/**
 * Redux slices exports
 * This file serves as the main entry point for all Redux slices
 */

import authReducer from './authSlice';
import watchlistReducer from './watchlistSlice';
import searchReducer from './searchSlice';
import contentReducer from './contentSlice';
import categoriesReducer from './categoriesSlice';
import libraryReducer from './librarySlice';
import moviesReducer from './moviesSlice';
import tvSeriesReducer from './tvSeriesSlice';

// Export all reducers
export {
  authReducer,
  watchlistReducer,
  searchReducer,
  contentReducer,
  categoriesReducer,
  libraryReducer,
  moviesReducer,
  tvSeriesReducer
};

// Assign to variable before exporting as default
const reducers = {
  auth: authReducer,
  watchlist: watchlistReducer,
  search: searchReducer,
  content: contentReducer,
  categories: categoriesReducer,
  library: libraryReducer,
  movies: moviesReducer,
  tvSeries: tvSeriesReducer
};

export default reducers; 