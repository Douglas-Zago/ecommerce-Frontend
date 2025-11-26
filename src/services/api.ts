import axios from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if present in localStorage
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// Response interceptor: if token is invalid/expired, remove it and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        try {
          localStorage.removeItem("token");
        } catch (e) {
          // ignore
        }
        // Show a toast informing the user, then redirect to login
        try {
          toast.error("Sua sessão expirou. Faça login novamente.");
        } catch (e) {
          // ignore if toast cannot be shown
        }
        // Use location to force full reload and navigate to login
        if (typeof window !== "undefined") {
          // small delay to allow toast to render
          setTimeout(() => {
            window.location.href = "/login";
          }, 300);
        }
      }
    } catch (e) {
      // ignore
    }
    return Promise.reject(error);
  }
);

export default api;
