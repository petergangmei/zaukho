import apiClient from './apiClient';

/**
 * Home Service
 * Handles operations related to the homepage content
 */

const homeService = {
  /**
   * Get all content for the homepage
   * @returns {Promise} - API response with homepage content
   */
  getHomeContent: async () => {
    try {
      // Fetch multiple content types in parallel for the homepage
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
  },
  
  /**
   * Get personalized content for logged-in users
   * @returns {Promise} - API response with personalized content
   */
  getPersonalizedContent: async () => {
    try {
      // Fetch personalized content for logged-in users
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
  },
  
  /**
   * Get featured categories for the homepage
   * @returns {Promise} - API response with featured categories
   */
  getFeaturedCategories: () => apiClient.get('/categories/', { params: { featured: true } }),
};

export default homeService; 