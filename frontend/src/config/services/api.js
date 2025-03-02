/**
 * DEPRECATED: This file is kept for backward compatibility.
 * Please use the individual service files instead.
 * 
 * Example:
 * import { authService, contentService } from '@/config/services';
 * 
 * Instead of:
 * import api from '@/config/services/api';
 */

import {
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
  homeService
} from './index';

// Combine all services into a single API object for backward compatibility
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
  home: homeService
};

export default api; 