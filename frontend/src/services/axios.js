import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}`,
});

// Attach token if found
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
