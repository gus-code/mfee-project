import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.signal = AbortSignal.timeout(5000);

  return config;
});

export default axiosInstance;