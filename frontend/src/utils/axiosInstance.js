import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080/api', 
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
