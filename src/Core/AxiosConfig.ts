import axios from "axios";
import { envs } from "../config/env";

const axiosInstance = axios.create({
  baseURL: envs.APIURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance
