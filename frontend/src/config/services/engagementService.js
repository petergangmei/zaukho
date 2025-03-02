import apiClient from './apiClient';

/**
 * Engagement service
 * Handles user engagement operations like ratings and comments
 */

const engagementService = {
  // Ratings operations
  ratings: {
    /**
     * Create a new rating
     * @param {Object} data - Rating data (content_id, rating, review)
     * @returns {Promise} - API response
     */
    create: (data) => apiClient.post('/ratings/', data),
    
    /**
     * Update an existing rating
     * @param {string|number} id - Rating ID
     * @param {Object} data - Updated rating data
     * @returns {Promise} - API response
     */
    update: (id, data) => apiClient.put(`/ratings/${id}/`, data),
    
    /**
     * Delete a rating
     * @param {string|number} id - Rating ID
     * @returns {Promise} - API response
     */
    delete: (id) => apiClient.delete(`/ratings/${id}/`),
  },
  
  // Comments operations
  comments: {
    /**
     * Create a new comment
     * @param {Object} data - Comment data (content_id, text)
     * @returns {Promise} - API response
     */
    create: (data) => apiClient.post('/comments/', data),
    
    /**
     * Update an existing comment
     * @param {string|number} id - Comment ID
     * @param {Object} data - Updated comment data
     * @returns {Promise} - API response
     */
    update: (id, data) => apiClient.put(`/comments/${id}/`, data),
    
    /**
     * Delete a comment
     * @param {string|number} id - Comment ID
     * @returns {Promise} - API response
     */
    delete: (id) => apiClient.delete(`/comments/${id}/`),
  },
};

export default engagementService; 