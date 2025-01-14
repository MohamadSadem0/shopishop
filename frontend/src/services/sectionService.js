import axiosInstance from '../utils/axiosInstance';
import { getDecryptedToken } from '../utils/decryptToken'; // Import the token decryption function

/**
 * Fetches all sections from the API with authorization.
 * @returns {Array} List of sections with categories.
 */
export const fetchSections = async () => {
  try {
    const response = await axiosInstance.get('/public/sections',)
    return response.data; // Assuming response.data contains the store details
  } catch (error) {
    console.error("fdsfsdfsd");
    throw new Error(error.response?.data?.message || 'Error fetching store');
  }
};

/**
 * Creates a new section with authorization.
 * @param {Object} sectionData - Data for creating a new section.
 * @returns {Object} The newly created section.
 */
export const createSection = async (sectionData) => {
  try {
    const token = getDecryptedToken();
    if (!token) throw new Error('Authentication token is not available.');

    const response = await axiosInstance.post('/admin/section/create', sectionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Failed to create section:', error);
    throw error; // Propagate error to handle in the caller component
  }
};


/**
 * Fetches sections along with categories from the API.
 * @returns {Array} List of sections with categories.
 */
export const fetchSectionsWithCategories = async () => {
  try {
    const response = await axiosInstance.get('/public/sections/with-categories');
    return response.data; // Assuming response.data contains the list of sections with categories
  } catch (error) {
    console.error('Failed to fetch sections with categories:', error);
    throw error; // Propagate error to handle in the caller component
  }
};


/**
 * Updates an existing section with authorization.
 * @param {Object} sectionData - Updated data for the section.
 * @returns {Object} The updated section.
 */
export const updateSection = async (sectionData) => {
  try {
    const token = getDecryptedToken();
    if (!token) throw new Error('Authentication token is not available.');
console.log(sectionData);


    const response = await axiosInstance.put(`/admin/section/update/${sectionData.id}`, sectionData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Failed to update section:', error);
    throw error; // Propagate error to handle in the caller component
  }
};

/**
 * Deletes a section by its ID with authorization.
 * @param {string} sectionId - The ID of the section to delete.
 * @returns {Object} The response object indicating success or failure.
 */
export const deleteSection = async (sectionId) => {
  try {
    const token = getDecryptedToken();
    if (!token) throw new Error('Authentication token is not available.');

    const response = await axiosInstance.delete(`/admin/section/delete/${sectionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Adjust based on actual API response structure
  } catch (error) {
    console.error('Failed to delete section:', error);
    throw error; // Propagate error to handle in the caller component
  }
};


export const fetchDiscountItems = async () => {
  // Simulate fetching discounts
  return [
    { id: 1, name: 'Discount Burger', url: 'https://via.placeholder.com/150', description: 'Get 50% OFF on Burgers!' },
    { id: 2, name: 'Pizza Deal', url: 'https://via.placeholder.com/150', description: '25% OFF on all pizzas!' },
  ];
};

export const fetchShopiiShopItems = async () => {
  // Simulate fetching ShopiiShop items
  return [
    { id: 1, name: 'Maryool', url: 'https://via.placeholder.com/200', description: 'Daily Dish, Healthy, Lebanese' },
    { id: 2, name: 'Socrates', url: 'https://via.placeholder.com/200', description: 'Delicious Mediterranean food' },
  ];
};
