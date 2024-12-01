import axiosInstance from '../utils/axiosInstance';

// Fetch products by category
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/public/product/category/${categoryId}`);
    return response.data; // Assuming response.data contains an array of products
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};


export const fetchProductsBySection = async (sectionId) => {
  try {
    const response = await axiosInstance.get(`/public/product/section/${sectionId}`);
    return response.data; // This is the array of products
  } catch (error) {
    console.error('Error fetching products by section:', error);
    throw error;
  }
};