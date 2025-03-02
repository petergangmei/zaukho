import apiClient from './apiClient';

/**
 * Search Service
 * Handles search operations across the platform
 */

/**
 * Search for content with a query string
 * @param {string} query - Search query
 * @returns {Promise} - API response with search results
 */
const searchContent = (query) => apiClient.get('/search/', { params: { q: query } });

const searchService = {
  searchContent
};

export default searchService; 