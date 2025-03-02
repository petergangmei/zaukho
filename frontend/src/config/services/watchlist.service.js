import apiClient from './apiClient';

/**
 * Watchlist Service
 * Handles operations related to user's watchlist
 */

const watchlistService = {
  /**
   * Get all items in the user's watchlist
   * @returns {Promise} - API response with watchlist items
   */
  getAll: () => apiClient.get('/watchlist/'),
  
  /**
   * Add content to the user's watchlist
   * @param {string|number} contentId - Content ID to add
   * @returns {Promise} - API response
   */
  add: (contentId) => apiClient.post('/watchlist/add/', { content_id: contentId }),
  
  /**
   * Remove content from the user's watchlist
   * @param {string|number} contentId - Content ID to remove
   * @returns {Promise} - API response
   */
  remove: (contentId) => apiClient.delete(`/watchlist/remove/${contentId}/`),
};

export default watchlistService; 