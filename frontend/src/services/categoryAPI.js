import axiosInstance from '../utils/axiosInstance';
import {getDecryptedToken} from '../utils/decryptToken'; // Import token decryption

/**
 * Creates a new category under a specific section.
 * @param {Object} category - The category data (name, imageUrl) to create.
 * @param {string} sectionId - The ID of the section under which the category will be created.
 * @returns {Object} The created category.
 */
export const createCategory = async (category, sectionId) => {
  try {
    const token = getDecryptedToken(); // Decrypt the token
    if (!token) throw new Error('No token found');
    
    const response = await axiosInstance.post(`/admin/category/create/${sectionId}`, category, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the decrypted JWT token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create category:', error);
    throw new Error(error.response?.data?.message || 'Error creating category');
  }
};

/**
 * Deletes a category by ID.
 * @param {string} categoryId - The ID of the category to delete.
 * @returns {void}
 */
export const deleteCategory = async (categoryId) => {
  try {
    const token = getDecryptedToken(); // Decrypt the token
    if (!token) throw new Error('No token found');

    await axiosInstance.delete(`/admin/category/delete/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Pass the decrypted JWT token
      }
    });
  } catch (error) {
    console.error('Failed to delete category:', error);
    throw new Error(error.response?.data?.message || 'Error deleting category');
  }
};

/**
 * Fetches all sections available for the admin.
 * @returns {Array} List of sections.
 */
export const fetchAllSections = async () => {
  try {
    const token = getDecryptedToken(); // Decrypt the token
    if (!token) throw new Error('No token found');

    const response = await axiosInstance.get('/admin/sections', {
      headers: {
        Authorization: `Bearer ${token}` // Pass the decrypted JWT token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sections:', error);
    throw new Error(error.response?.data?.message || 'Error fetching sections');
  }
};

/**
 * Updates an existing category by ID.
 * @param {string} categoryId - The ID of the category to update.
 * @param {Object} categoryData - The updated category details (name, imageUrl).
 * @returns {Object} The updated category data.
 */
export const updateCategory = async (categoryId, categoryData) => {
  try {
    const token = getDecryptedToken(); // Decrypt the token
    if (!token) throw new Error('No token found');

    const response = await axiosInstance.put(`/admin/category/update/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}` // Add the JWT token for authentication
      }
    });
    return response.data; // Assuming response.data contains the updated category
  } catch (error) {
    console.error('Failed to update category:', error);
    throw new Error(error.response?.data?.message || 'Error updating category');
  }
};