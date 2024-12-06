import {getDecryptedToken} from "../utils/decryptToken";
import axiosInstance from "../utils/axiosInstance";

/**
 * Creates a new category under a specific section.
 * @param {Object} category - The category data (name, imageUrl) to create.
 * @param {string} sectionId - The ID of the section under which the category will be created.
 * @returns {Object} The created category.
 */
export const createCategoryAPI = async (category, sectionId) => {
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
 * Adds a new product to the store under a specific category.
 * @param {Object} product - The product details.
 * @param {string} categoryId - The ID of the category to associate with the product.
 * @param {string} token - The JWT token for authentication.
 * @returns {Object} The created product.
 */
export const createProductAPI = async (product, categoryId, token) => {
    try {


        const response = await axiosInstance.post(`/merchant/${categoryId}/product/create`, product, {
            headers: {
                Authorization: `Bearer ${token}` // Add the JWT token to the request header
            }
        });
        return response.data; // Assuming response.data contains the newly created product
    } catch (error) {
        console.error('Failed to add product:', error);
        throw new Error(error.response?.data?.message || 'Error adding product');
    }
};
/**
 * Creates a new section with authorization.
 * @param {Object} sectionData - Data for creating a new section.
 * @returns {Object} The newly created section.
 */
export const createSectionAPI = async (sectionData) => {
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