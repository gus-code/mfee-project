import axios from "axios";

const axiosInstance = axios.create();
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkQG91dGxvb2suY29tIiwiaWF0IjoxNzE1Nzk4NTc2LCJleHAiOjE3MTU4MDIxNzZ9.EgW4AcErd_fwDVwZa-pzJCw12xKBzGJ32B8Ry92XRs8";

axiosInstance.interceptors.request.use((config) => {
  config.baseURL = "https://test.neuraac.com/api";
  config.headers.Authorization = `Bearer ${token}`;
  config.signal = AbortSignal.timeout(5000);
  return config;
});

export default axiosInstance;
