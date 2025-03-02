import apiClient from './apiClient';

/**
 * Library Service
 * Handles operations related to user's content library
 */

/**
 * Get the user's content library
 * @returns {Promise} - API response with library items
 */
const getLibrary = () => apiClient.get('/library/');

const libraryService = {
  getLibrary
};

export default libraryService; 