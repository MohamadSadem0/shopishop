import axiosInstance from '../utils/axiosInstance';

/**
 * Handles user login.
 * @param {Object} credentials - User credentials { email, password }
 * @returns {Object} User data and token
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    
   
    const { token, user } = response.data;

    // Save token in secure storage
    localStorage.setItem('token', token); // Replace with secure storage solution

    return { token, user };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * @param {Object} userDetails 
 * @returns {Object} 
 */
export const signup = async (userDetails) => {
  try {
    const response = await axiosInstance.post('/auth/signup', userDetails);
    
    
    const { token, user } = response.data;

    localStorage.setItem('token', token); 
    return { token, user };
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};

/**
 * Handles user logout.
 */
export const logout = () => {
  localStorage.removeItem('token'); // Clear token from secure storage
};
