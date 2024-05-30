import axios from 'axios';

// Évite de répéter le passage du token sur chaque page
const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
