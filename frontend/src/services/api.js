import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const normalizedBaseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const client = axios.create({
  baseURL: normalizedBaseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;