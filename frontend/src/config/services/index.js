/**
 * Services index file
 * Exports all API services for easy importing
 */

import apiClient from './apiClient';
import authService from './authService';
import profileService from './profileService';
import contentService from './contentService';
import categoryService from './categoryService';
import searchService from './searchService';
import watchlistService from './watchlistService';
import libraryService from './libraryService';
import purchaseService from './purchaseService';
import rentalService from './rentalService';
import ratingService from './ratingService';
import commentService from './commentService';
import homeService from './homeService';

// Export all services
export {
  apiClient,
  authService,
  profileService,
  contentService,
  categoryService,
  searchService,
  watchlistService,
  libraryService,
  purchaseService,
  rentalService,
  ratingService,
  commentService,
  homeService
};

// For backward compatibility with the original api.js
// This allows existing code to continue working while transitioning to the new structure
const api = {
  auth: authService,
  profile: profileService,
  content: contentService,
  categories: categoryService,
  search: searchService,
  watchlist: watchlistService,
  library: libraryService,
  purchases: purchaseService,
  rentals: rentalService,
  ratings: ratingService,
  comments: commentService,
  home: homeService
};

export default api; 