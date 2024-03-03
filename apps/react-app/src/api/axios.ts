import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = "http://localhost:3000/posts";
  return config;
});

export default axiosInstance;
