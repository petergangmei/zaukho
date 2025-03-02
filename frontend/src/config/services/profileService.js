import apiClient from './apiClient';

/**
 * User Profile Service
 * Handles user profile operations like getting, updating profile and changing password
 */

/**
 * Get the current user's profile
 * @returns {Promise} - API response with profile data
 */
const getProfile = () => apiClient.get('/users/profile/');

/**
 * Update the current user's profile
 * @param {Object} data - Profile data to update
 * @returns {Promise} - API response with updated profile
 */
const updateProfile = (data) => apiClient.patch('/users/profile/', data);

/**
 * Update the current user's password
 * @param {Object} data - Password change data (old_password, new_password)
 * @returns {Promise} - API response
 */
const updatePassword = (data) => apiClient.post('/users/profile/change-password/', data);

const profileService = {
  getProfile,
  updateProfile,
  updatePassword
};

export default profileService; 