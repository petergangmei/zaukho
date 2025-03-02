import apiClient from './apiClient';

/**
 * Search service
 * Handles search-related operations
 */

const searchService = {
  /**
   * Search for content
   * @param {string} query - Search query
   * @returns {Promise} - API response with search results
   */
  content: (query) => apiClient.get('/search/', { params: { q: query } }),
};

export default searchService; 