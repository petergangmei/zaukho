import apiClient from './apiClient';

/**
 * Comments Service
 * Handles operations related to content comments
 */

const commentsService = {
  /**
   * Get comments for a specific content
   * @param {string|number} contentId - Content ID
   * @returns {Promise} - API response with comments
   */
  getByContent: (contentId) => apiClient.get(`/content/${contentId}/comments/`),
  
  /**
   * Create a new comment
   * @param {Object} data - Comment data
   * @returns {Promise} - API response with comment details
   */
  create: (data) => apiClient.post('/comments/', data),
  
  /**
   * Update an existing comment
   * @param {string|number} id - Comment ID
   * @param {Object} data - Updated comment data
   * @returns {Promise} - API response with updated comment
   */
  update: (id, data) => apiClient.put(`/comments/${id}/`, data),
  
  /**
   * Delete a comment
   * @param {string|number} id - Comment ID
   * @returns {Promise} - API response
   */
  delete: (id) => apiClient.delete(`/comments/${id}/`),
};

export default commentsService; 