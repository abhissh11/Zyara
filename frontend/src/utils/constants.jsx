import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://zyara-backend.onrender.com/api",
  withCredentials: true,
});

export const BASE_API_URL = "https://zyara-backend.onrender.com";
