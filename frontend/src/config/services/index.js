/**
 * Services index file
 * Exports all services for easy importing
 */

import apiClient from './apiClient';
import authService from './authService';
import profileService from './profileService';
import contentService from './contentService';
import categoryService from './categoryService';
import searchService from './searchService';
import watchlistService from './watchlistService';
import libraryService from './libraryService';
import transactionService from './transactionService';
import engagementService from './engagementService';

// Legacy API export for backward compatibility
// This can be removed once all components are migrated to use the new services
const api = {
  auth: authService,
  profile: profileService,
  content: contentService,
  categories: categoryService,
  search: searchService,
  watchlist: watchlistService,
  library: libraryService,
  purchases: {
    create: transactionService.createPurchase,
  },
  rentals: {
    create: transactionService.createRental,
  },
  ratings: engagementService.ratings,
  comments: {
    ...engagementService.comments,
    getByContent: (contentId) => contentService.getComments(contentId),
  },
};

export {
  apiClient,
  authService,
  profileService,
  contentService,
  categoryService,
  searchService,
  watchlistService,
  libraryService,
  transactionService,
  engagementService,
  api, // Export legacy API for backward compatibility
};

// Default export for backward compatibility
export default api; 