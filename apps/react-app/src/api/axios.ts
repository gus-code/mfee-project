import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = 'http://localhost:3000/posts';
  config.timeout = 5000;
  config.signal = AbortSignal.timeout(5000);
  return config;
});

export default axiosInstance;
