import apiClient from './apiClient';

/**
 * Rentals Service
 * Handles operations related to content rentals
 */

const rentalsService = {
  /**
   * Create a new rental
   * @param {Object} data - Rental data
   * @returns {Promise} - API response with rental details
   */
  create: (data) => apiClient.post('/rentals/', data),
};

export default rentalsService; 