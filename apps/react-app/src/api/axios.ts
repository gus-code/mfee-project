import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

{/* ListoAct 11*/}

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
