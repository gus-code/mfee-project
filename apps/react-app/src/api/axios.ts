import axios from "axios";

const axiosInstance = axios.create();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkQG91dGxvb2suY29tIiwiaWF0IjoxNzMwMzI5MjM0LCJleHAiOjE3MzAzMzI4MzR9.RHkHCiTYKcNvqH0DDPnjBDJ87Tf1tvw41pNb-FzDFfE";

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = "https://test.neuraac.com/api";
  config.headers.Authorization = `Bearer ${token}`;
  config.signal = AbortSignal.timeout(5000);
  return config;
});

export default axiosInstance;
