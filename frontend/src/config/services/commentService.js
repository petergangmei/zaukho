import apiClient from './apiClient';

/**
 * Comment Service
 * Handles operations related to content comments
 */

/**
 * Create a new comment
 * @param {Object} data - Comment data (content_id, text, etc.)
 * @returns {Promise} - API response with comment details
 */
const createComment = (data) => apiClient.post('/comments/', data);

/**
 * Update an existing comment
 * @param {string|number} id - Comment ID
 * @param {Object} data - Updated comment data
 * @returns {Promise} - API response with updated comment
 */
const updateComment = (id, data) => apiClient.put(`/comments/${id}/`, data);

/**
 * Delete a comment
 * @param {string|number} id - Comment ID
 * @returns {Promise} - API response
 */
const deleteComment = (id) => apiClient.delete(`/comments/${id}/`);

const commentService = {
  createComment,
  updateComment,
  deleteComment
};

export default commentService; 