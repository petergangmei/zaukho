import apiClient from './apiClient';

/**
 * User Profile Service
 * Handles user profile operations like getting, updating profile and changing password
 */

const profileService = {
  /**
   * Get the current user's profile
   * @returns {Promise} - API response with profile data
   */
  get: () => apiClient.get('/users/profile/'),
  
  /**
   * Update the current user's profile
   * @param {Object} data - Profile data to update
   * @returns {Promise} - API response with updated profile
   */
  update: (data) => apiClient.patch('/users/profile/', data),
  
  /**
   * Update the current user's password
   * @param {Object} data - Password change data (old_password, new_password)
   * @returns {Promise} - API response
   */
  updatePassword: (data) => apiClient.post('/users/profile/change-password/', data),
};

export default profileService; 