import apiClient from './apiClient';

/**
 * Library Service
 * Handles operations related to user's content library
 */

const libraryService = {
  /**
   * Get the user's content library
   * @returns {Promise} - API response with library items
   */
  get: () => apiClient.get('/library/'),
};

export default libraryService; 