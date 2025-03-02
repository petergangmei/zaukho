import apiClient from './apiClient';

/**
 * Content Service
 * Handles operations related to content like fetching, filtering, and recommendations
 */

const contentService = {
  /**
   * Get all content with optional filtering
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} - API response with content list
   */
  getAll: (params) => apiClient.get('/content/', { params }),
  
  /**
   * Get content by ID
   * @param {string|number} id - Content ID
   * @returns {Promise} - API response with content details
   */
  getById: (id) => apiClient.get(`/content/${id}/`),
  
  /**
   * Get featured content
   * @returns {Promise} - API response with featured content
   */
  getFeatured: () => apiClient.get('/content/featured/'),
  
  /**
   * Get trending content
   * @returns {Promise} - API response with trending content
   */
  getTrending: () => apiClient.get('/content/trending/'),
  
  /**
   * Get recommended content for the current user
   * @returns {Promise} - API response with recommended content
   */
  getRecommended: () => apiClient.get('/content/recommended/'),
  
  /**
   * Get newly released content
   * @returns {Promise} - API response with new releases
   */
  getNewReleases: () => apiClient.get('/content/new-releases/'),
};

export default contentService; 