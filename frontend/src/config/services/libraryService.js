import apiClient from './apiClient';

/**
 * Library service
 * Handles library-related operations
 */

const libraryService = {
  /**
   * Get the user's library content
   * @returns {Promise} - API response with library items
   */
  get: () => apiClient.get('/library/'),
};

export default libraryService; 