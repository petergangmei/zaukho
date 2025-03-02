import apiClient from './apiClient';

/**
 * Home Service
 * Handles operations related to the home page content
 */

/**
 * Get all content for the home page
 * Combines featured, trending, and new releases in a single call
 * @returns {Promise} - API response with home page content
 */
const getHomeContent = async () => {
  try {
    // Make parallel requests for better performance
    const [featured, trending, newReleases] = await Promise.all([
      apiClient.get('/content/featured/'),
      apiClient.get('/content/trending/'),
      apiClient.get('/content/new-releases/')
    ]);
    
    return {
      featured: featured.data,
      trending: trending.data,
      newReleases: newReleases.data
    };
  } catch (error) {
    console.error('Error fetching home content:', error);
    throw error;
  }
};

/**
 * Get personalized content for logged-in users
 * @returns {Promise} - API response with personalized content
 */
const getPersonalizedContent = async () => {
  try {
    // Make parallel requests for better performance
    const [recommended, watchlist] = await Promise.all([
      apiClient.get('/content/recommended/'),
      apiClient.get('/watchlist/')
    ]);
    
    return {
      recommended: recommended.data,
      watchlist: watchlist.data
    };
  } catch (error) {
    console.error('Error fetching personalized content:', error);
    throw error;
  }
};

const homeService = {
  getHomeContent,
  getPersonalizedContent
};

export default homeService; 