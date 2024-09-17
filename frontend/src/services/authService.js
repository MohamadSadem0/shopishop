import axiosInstance from '../utils/axiosInstance';
import data from "../data/sectionData"

/**
 * Handles user login.
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Object} User data
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('auth/login', credentials, {
      withCredentials: true, 
    });

    const { user } = response.data;

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
// export const fetchServiceCategories = async () => {
//   try {
//     const response = await axiosInstance.get('/service/categories');
//     return response.data.categories; // Adjust based on the actual API response
//   } catch (error) {
//     console.error('Failed to fetch service categories:', error);
//     throw error;
//   }
// };
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
    const response = await axiosInstance.post('/auth/signup', userDetails, {
      withCredentials: true, // Ensure cookies are sent with requests
    });

    // Ensure the response has the expected structure
    const { user } = response.data;
    
    return user;  // Return user data

  } catch (error) {
    console.error('Signup failed:', error);
    if (error.response) {
      console.error('Server responded with', error.response.status, error.response.data);
    }
    throw error;  // Rethrow error for the caller to handle
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
