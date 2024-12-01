import { LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './actionTypes';
import axiosInstance from '../../utils/axiosInstance';


export const login = (userData) => (dispatch) => {

  dispatch({ type: LOGIN_SUCCESS, payload: userData });
};


export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Google login action
export const googleLogin = (userData) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/google', userData);
    const token = response.data.token;

    sessionStorage.setItem('token', token);
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};