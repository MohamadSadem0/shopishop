import axiosInstance from '../utils/axiosInstance';

/**
 * Handles user login.
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Object} User data
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    
    // The token is now managed by the server in an HTTP-only cookie
    const { user } = response.data; // No need to handle token in the client-side

    return user;
  } catch (error) {
    console.error('Login failed:', error);
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
    const response = await axiosInstance.post('/auth/signup', userDetails);
    
    // The token is now managed by the server in an HTTP-only cookie
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
    await axiosInstance.post('/auth/logout'); // Trigger server-side logout to clear cookies
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
