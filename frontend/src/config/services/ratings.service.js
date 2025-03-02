import apiClient from './apiClient';

/**
 * Ratings Service
 * Handles operations related to content ratings
 */

const ratingsService = {
  /**
   * Create a new rating
   * @param {Object} data - Rating data
   * @returns {Promise} - API response with rating details
   */
  create: (data) => apiClient.post('/ratings/', data),
  
  /**
   * Update an existing rating
   * @param {string|number} id - Rating ID
   * @param {Object} data - Updated rating data
   * @returns {Promise} - API response with updated rating
   */
  update: (id, data) => apiClient.put(`/ratings/${id}/`, data),
  
  /**
   * Delete a rating
   * @param {string|number} id - Rating ID
   * @returns {Promise} - API response
   */
  delete: (id) => apiClient.delete(`/ratings/${id}/`),
};

export default ratingsService; 