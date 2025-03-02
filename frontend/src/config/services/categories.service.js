import apiClient from './apiClient';

/**
 * Categories Service
 * Handles operations related to content categories
 */

const categoriesService = {
  /**
   * Get all categories
   * @returns {Promise} - API response with categories list
   */
  getAll: () => apiClient.get('/categories/'),
  
  /**
   * Get category by ID
   * @param {string|number} id - Category ID
   * @returns {Promise} - API response with category details
   */
  getById: (id) => apiClient.get(`/categories/${id}/`),
  
  /**
   * Get content for a specific category
   * @param {string|number} id - Category ID
   * @param {Object} params - Query parameters for filtering
   * @returns {Promise} - API response with category content
   */
  getContent: (id, params) => apiClient.get(`/categories/${id}/content/`, { params }),
};

export default categoriesService; 