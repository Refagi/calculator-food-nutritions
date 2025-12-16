import axios from "axios";

const API_URL: string =
  import.meta.env.VITE_APP_URL;

const api = axios.create({
  baseURL: API_URL || '/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);


export default api;