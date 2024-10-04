import axiosInstance from '../utils/axiosInstance';
import handleError from '../utils/errorHandler';


/**
 * Handles user login.
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Object} User data
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/public/auth/login', credentials, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Login failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Fetches service categories.
 * @returns {Array} List of service categories
 */
export const fetchServiceSections = async () => {
  try {
    const response = await axiosInstance.get('/sections');
    return response.data.categories; // Adjust based on the actual API response
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Failed to fetch service categories:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Handles user signup.
 * @param {Object} userDetails - User details { name, email, password, ... }
 * @returns {Object} User data
 */
export const signup = async (userDetails) => {
  try {
    const response = await axiosInstance.post('/public/auth/signup', userDetails, {
      withCredentials: true,
    });
    return { user: response.data.user };
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Signup failed:', errorMessage);
    throw new Error(errorMessage);
  }
};

/**
 * Handles user logout.
 */
export const logout = async () => {
  try {
    await axiosInstance.post('/api/user/logout', {}, {
      withCredentials: true,
    });
    sessionStorage.clear(); // Clear sessionStorage on logout
  } catch (error) {
    const errorMessage = handleError(error);
    console.error('Logout failed:', errorMessage);
    throw new Error(errorMessage);
  }
};
