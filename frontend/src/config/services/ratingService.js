import apiClient from './apiClient';

/**
 * Rating Service
 * Handles operations related to content ratings
 */

/**
 * Create a new rating
 * @param {Object} data - Rating data (content_id, rating_value, review_text, etc.)
 * @returns {Promise} - API response with rating details
 */
const createRating = (data) => apiClient.post('/ratings/', data);

/**
 * Update an existing rating
 * @param {string|number} id - Rating ID
 * @param {Object} data - Updated rating data
 * @returns {Promise} - API response with updated rating
 */
const updateRating = (id, data) => apiClient.put(`/ratings/${id}/`, data);

/**
 * Delete a rating
 * @param {string|number} id - Rating ID
 * @returns {Promise} - API response
 */
const deleteRating = (id) => apiClient.delete(`/ratings/${id}/`);

const ratingService = {
  createRating,
  updateRating,
  deleteRating
};

export default ratingService; 