import apiClient from './apiClient';

/**
 * Transaction service
 * Handles purchase and rental operations
 */

const transactionService = {
  /**
   * Purchase content
   * @param {Object} data - Purchase data (content_id, payment_method, etc.)
   * @returns {Promise} - API response
   */
  createPurchase: (data) => apiClient.post('/purchases/', data),
  
  /**
   * Rent content
   * @param {Object} data - Rental data (content_id, rental_period, payment_method, etc.)
   * @returns {Promise} - API response
   */
  createRental: (data) => apiClient.post('/rentals/', data),
};

export default transactionService; 