import axios from "axios";
import { useSnackbarStore } from "../store/snackbarStore";

export const DATA_BASE_URL = "http://localhost:3001/api";

const openSnackbar = () => {
  useSnackbarStore.getState().show(
    "You need to log in first",
    "warning"
  )
}
// Create axios instance with base config for the data API
const api = axios.create({
  baseURL: DATA_BASE_URL,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  config.baseURL = DATA_BASE_URL;

  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.signal = AbortSignal.timeout(5000);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("accessToken");
      openSnackbar();
    }

    return Promise.reject(error);
  }
);


export default api;
