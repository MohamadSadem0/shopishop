import axiosInstance from '../utils/axiosInstance';

/**
 * Fetches categories for a specific store from the backend.
 * @param {number} storeId - The ID of the store to fetch categories for.
 * @param {string} token - The JWT token for authentication.
 * @returns {Array} List of categories.
 */
export const fetchCategoriesByStoreId = async (storeId, token) => {
  try {
    const response = await axiosInstance.get(`/merchant/${storeId}/categories`, {
      headers: {
        Authorization: `Bearer ${token}` // Add the JWT token to the request header
      }
    });
    return response.data; // Assuming response.data contains an array of categories
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error(error.response?.data?.message || 'Error fetching categories');
  }
};

/**
 * Adds a new product to the store under a specific category.
 * @param {Object} product - The product details.
 * @param {string} categoryId - The ID of the category to associate with the product.
 * @param {string} token - The JWT token for authentication.
 * @returns {Object} The created product.
 */
export const addProduct = async (product, categoryId, token) => {
  try {
    console.log(token);
    
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
 * Fetches all categories from the public API.
 * @returns {Array} List of categories.
 */
export const fetchAllCategories = async () => {
  try {
    const response = await axiosInstance.get('/public');
    return response.data; // Assuming response.data contains an array of categories
  } catch (error) {
    console.error('Failed to fetch all categories:', error);
    throw new Error(error.response?.data?.message || 'Error fetching all categories');
  }
};

/**
 * Updates an existing category.
 * @param {string} categoryId - The ID of the category to update.
 * @param {Object} categoryData - The updated category details.
 * @param {string} token - The JWT token for authentication.
 * @returns {Object} The updated category.
 */
export const updateCategory = async (categoryId, categoryData, token) => {
  try {
    const response = await axiosInstance.put(`/admin/category/update/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${token}` // Add the JWT token to the request header
      }
    });
    return response.data; // Assuming response.data contains the updated category
  } catch (error) {
    console.error('Failed to update category:', error);
    throw new Error(error.response?.data?.message || 'Error updating category');
  }
};

/**
 * Deletes a category by ID.
 * @param {string} categoryId - The ID of the category to delete.
 * @param {string} token - The JWT token for authentication.
 * @returns {void}
 */
export const deleteCategory = async (categoryId, token) => {
  try {
    await axiosInstance.delete(`/admin/category/delete/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Add the JWT token to the request header
      }
    });
  } catch (error) {
    console.error('Failed to delete category:', error);
    throw new Error(error.response?.data?.message || 'Error deleting category');
  }
};
/**
 * Fetches all products from the public API.
 * @returns {Array} List of products.
 */
export const fetchAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/public');
    return response.data; // Assuming response.data contains an array of products
  } catch (error) {
    console.error('Failed to fetch all products:', error);
    throw new Error(error.response?.data?.message || 'Error fetching products');
  }
};

/**
 * Fetches a specific product by its ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Object} The product data.
 */
export const fetchProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/public/${productId}`);
    return response.data; // Assuming response.data contains the product
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error(error.response?.data?.message || 'Error fetching product');
  }
};

/**
 * Fetches all products for a specific category.
 * @param {string} categoryId - The ID of the category to fetch products for.
 * @returns {Array} List of products.
 */
export const fetchProductsByCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/public/category/${categoryId}`);
    return response.data; // Assuming response.data contains an array of products
  } catch (error) {
    console.error('Failed to fetch products by category:', error);
    throw new Error(error.response?.data?.message || 'Error fetching products by category');
  }
};

/**
 * Fetches all products for a specific store.
 * @param {number} storeId - The ID of the store to fetch products for.
 * @param {string} token - The Bearer token for authorization.
 * @returns {Array} List of products.
 */
export const fetchProductsByStoreId = async (storeId) => {
  try {
    console.log(storeId);
    
    const response = await axiosInstance.get(`/public/product/store/${storeId}`
      // {
      // headers: {
      //   Authorization: `Bearer ${token}`, // Pass the Bearer token in the Authorization header
      // },
    // }
  );
    return response.data; // Assuming response.data contains an array of products
  } catch (error) {
    console.error('Failed to fetch products by store:', error);
    throw new Error(error.response?.data?.message || 'Error fetching products by store');
  }
};


/**
 * Fetch all stores from the backend.
 * @returns {Array} List of stores.
 */
export const fetchAllStores = async () => {
  try {
    const response = await axiosInstance.get('public/stores/all');
    
    return response.data; // Assuming response.data contains an array of stores
  } catch (error) {
    console.error('Failed to fetch stores:', error);
    throw new Error('Error fetching stores');
  }
};

/**
 * Fetches a specific store by its ID.
 * @param {number} storeId - The ID of the store to fetch.
 * @returns {Object} The store data.
 */
export const fetchStoreById = async (storeId) => {
  try {
    const response = await axiosInstance.get(`/public/stores/${storeId}`);
    return response.data; // Assuming response.data contains the store details
  } catch (error) {
    console.error('Failed to fetch store by ID:', error);
    throw new Error(error.response?.data?.message || 'Error fetching store');
  }
};