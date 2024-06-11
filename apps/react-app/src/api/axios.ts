import axios from 'axios';

const axiosInstance = axios.create();
const token = localStorage.getItem('apiToken')

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = 'https://test.neuraac.com/api';
  config.headers.Authorization = `Bearer ${token}`;
  config.signal = AbortSignal.timeout(5000);
  return config;
});

export default axiosInstance;
