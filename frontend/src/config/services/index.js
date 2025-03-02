/**
 * Services index file
 * Exports all services for easy importing
 */

import apiClient from './apiClient';
import authService from './auth.service';
import profileService from './profile.service';
import contentService from './content.service';
import categoriesService from './categories.service';
import searchService from './search.service';
import watchlistService from './watchlist.service';
import libraryService from './library.service';
import purchasesService from './purchases.service';
import rentalsService from './rentals.service';
import ratingsService from './ratings.service';
import commentsService from './comments.service';
import homeService from './home.service';

// Legacy export for backward compatibility
const api = {
  auth: authService,
  profile: profileService,
  content: contentService,
  categories: categoriesService,
  search: searchService,
  watchlist: watchlistService,
  library: libraryService,
  purchases: purchasesService,
  rentals: rentalsService,
  ratings: ratingsService,
  comments: commentsService,
  home: homeService,
};

// Export individual services
export {
  apiClient,
  authService,
  profileService,
  contentService,
  categoriesService,
  searchService,
  watchlistService,
  libraryService,
  purchasesService,
  rentalsService,
  ratingsService,
  commentsService,
  homeService,
  api, // Legacy export
};

// Default export for backward compatibility
export default api; 