import axiosInstance from '../utils/axiosInstance';

/**
 * Fetches all sections from the API.
 * @returns {Array} List of sections with categories.
 */
export const fetchSections = async () => {
  try {
    const response = await axiosInstance.get('public/sections');
    return response.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Failed to fetch sections:', error);
    throw error; // Propagate error to handle in the caller component
  }
};
