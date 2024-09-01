import axiosInstance from '../utils/axiosInstance';

/**
 * Handles user login.
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Object} User data
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/user/login', credentials, {
      withCredentials: true, 
    });

    const { user } = response;

    return response;

  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Fetches service categories.
 * @returns {Array} List of service categories
 */
export const fetchServiceCategories = async () => {
  try {
    const response = await axiosInstance.get('/service/categories');
    return response.data.categories; // Adjust based on the actual API response
  } catch (error) {
    console.error('Failed to fetch service categories:', error);
    throw error;
  }
};

/**
 * Handles user signup.
 * @param {Object} userDetails - User details { name, email, password, ... }
 * @returns {Object} User data
 */
export const signup = async (userDetails) => {
  try {
    const response = await axiosInstance.post('/user/save', userDetails, {
      withCredentials: true, // Ensure cookies are sent with requests
    });

    const { user } = response.data;

    return user;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

/**
 * Handles user logout.
 */
export const logout = async () => {
  try {
    await axiosInstance.post('/api/user/logout', {}, {
      withCredentials: true, // Ensure cookies are sent with requests
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
