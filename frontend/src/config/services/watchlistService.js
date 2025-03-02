import apiClient from './apiClient';

/**
 * Watchlist Service
 * Handles operations related to user's watchlist
 */

/**
 * Get all items in the user's watchlist
 * @returns {Promise} - API response with watchlist items
 */
const getWatchlist = () => apiClient.get('/watchlist/');

/**
 * Add a content item to the user's watchlist
 * @param {string|number} contentId - Content ID to add
 * @returns {Promise} - API response
 */
const addToWatchlist = (contentId) => apiClient.post('/watchlist/add/', { content_id: contentId });

/**
 * Remove a content item from the user's watchlist
 * @param {string|number} contentId - Content ID to remove
 * @returns {Promise} - API response
 */
const removeFromWatchlist = (contentId) => apiClient.delete(`/watchlist/remove/${contentId}/`);

const watchlistService = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
};

export default watchlistService; 