import apiClient from './apiClient';

/**
 * Content Service
 * Handles operations related to content items like fetching, filtering, and recommendations
 */

/**
 * Get all content with optional filtering parameters
 * @param {Object} params - Query parameters for filtering content
 * @returns {Promise} - API response with content list
 */
const getAllContent = (params) => apiClient.get('/content/', { params });

/**
 * Get a specific content item by ID
 * @param {string|number} id - Content ID
 * @returns {Promise} - API response with content details
 */
const getContentById = (id) => apiClient.get(`/content/${id}/`);

/**
 * Get featured content
 * @returns {Promise} - API response with featured content
 */
const getFeaturedContent = () => apiClient.get('/content/featured/');

/**
 * Get trending content
 * @returns {Promise} - API response with trending content
 */
const getTrendingContent = () => apiClient.get('/content/trending/');

/**
 * Get recommended content for the current user
 * @returns {Promise} - API response with recommended content
 */
const getRecommendedContent = () => apiClient.get('/content/recommended/');

/**
 * Get newly released content
 * @returns {Promise} - API response with new releases
 */
const getNewReleases = () => apiClient.get('/content/new-releases/');

/**
 * Get comments for a specific content item
 * @param {string|number} contentId - Content ID
 * @returns {Promise} - API response with comments
 */
const getContentComments = (contentId) => apiClient.get(`/content/${contentId}/comments/`);

const contentService = {
  getAllContent,
  getContentById,
  getFeaturedContent,
  getTrendingContent,
  getRecommendedContent,
  getNewReleases,
  getContentComments
};

export default contentService; 