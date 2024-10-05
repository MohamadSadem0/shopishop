import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  timeout: 10000, 
  headers: { 
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

axiosInstance.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
