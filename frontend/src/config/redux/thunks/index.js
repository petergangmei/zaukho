/**
 * Thunks index file
 * Exports all thunks for easy importing
 */

// Auth thunks
export { 
  login, 
  register, 
  logout, 
  getCurrentUser 
} from './authThunks';

// Content thunks
export { 
  fetchFeaturedContent, 
  fetchTrendingContent, 
  fetchRecommendedContent, 
  fetchNewReleases, 
  fetchContentById 
} from './contentThunks';

// Add other thunk exports as they are created 