import apiClient from './apiClient';

/**
 * Purchase Service
 * Handles operations related to content purchases
 */

/**
 * Create a new purchase
 * @param {Object} data - Purchase data (content_id, payment_method, etc.)
 * @returns {Promise} - API response with purchase details
 */
const createPurchase = (data) => apiClient.post('/purchases/', data);

const purchaseService = {
  createPurchase
};

export default purchaseService; 