import apiClient from './apiClient';

/**
 * Purchases Service
 * Handles operations related to content purchases
 */

const purchasesService = {
  /**
   * Create a new purchase
   * @param {Object} data - Purchase data
   * @returns {Promise} - API response with purchase details
   */
  create: (data) => apiClient.post('/purchases/', data),
};

export default purchasesService; 