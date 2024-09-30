import axiosInstance from '../utils/axiosInstance';

/**
 * Fetches categories for a specific store from the backend.
 * @param {number} storeId - The ID of the store to fetch categories for.
 * @returns {Array} List of categories.
 */
export const fetchCategoriesByStoreId = async (storeId) => {
  try {
    const response = await axiosInstance.get(`/merchant/stores/${storeId}/section-categories`);
    return response.data; // Assuming response.data contains an array of categories
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error(error.response?.data?.message || 'Error fetching categories');
  }
};

/**
 * Adds a new product to the store.
 * @param {Object} product - The product details.
 * @returns {Object} The created product.
 */
export const addProduct = async (product) => {
  try {
    const response = await axiosInstance.post('/merchant/products', product);
    return response.data; // Assuming response.data contains the newly created product
  } catch (error) {
    console.error('Failed to add product:', error);
    throw new Error(error.response?.data?.message || 'Error adding product');
  }
};
