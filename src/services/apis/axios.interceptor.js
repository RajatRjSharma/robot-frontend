import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = API_URL;

axios.defaults.headers = {
  "Content-Type": "application/json",
};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
