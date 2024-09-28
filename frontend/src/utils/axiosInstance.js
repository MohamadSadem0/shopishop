import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/api/', 
  baseURL: 'https://dry-temple-95599-6b8f54712ec8.herokuapp.com/api/', 
  timeout: 5000, 
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
