import apiClient from './apiClient';

/**
 * Category Service
 * Handles operations related to content categories
 */

/**
 * Get all categories
 * @returns {Promise} - API response with list of categories
 */
const getAllCategories = () => apiClient.get('/categories/');

/**
 * Get a specific category by ID
 * @param {string|number} id - Category ID
 * @returns {Promise} - API response with category details
 */
const getCategoryById = (id) => apiClient.get(`/categories/${id}/`);

/**
 * Get content items for a specific category
 * @param {string|number} id - Category ID
 * @param {Object} params - Optional query parameters for filtering
 * @returns {Promise} - API response with category content
 */
const getCategoryContent = (id, params) => apiClient.get(`/categories/${id}/content/`, { params });

const categoryService = {
  getAllCategories,
  getCategoryById,
  getCategoryContent
};

export default categoryService; 