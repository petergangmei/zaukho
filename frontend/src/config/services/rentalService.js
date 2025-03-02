import apiClient from './apiClient';

/**
 * Rental Service
 * Handles operations related to content rentals
 */

/**
 * Create a new rental
 * @param {Object} data - Rental data (content_id, rental_period, payment_method, etc.)
 * @returns {Promise} - API response with rental details
 */
const createRental = (data) => apiClient.post('/rentals/', data);

const rentalService = {
  createRental
};

export default rentalService; 