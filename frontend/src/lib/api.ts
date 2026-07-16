// ──────────────────────────────────────────────────────────────
// API CLIENT
// ──────────────────────────────────────────────────────────────
//
// This file sets up Axios for making HTTP requests to the backend.
// ──────────────────────────────────────────────────────────────

import axios from "axios";

// Create an Axios instance with the base URL
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ──────────────────────────────────────────────────────────────
// Request Interceptor: Add JWT token to all requests
// ──────────────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (browser only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ──────────────────────────────────────────────────────────────
// Response Interceptor: Handle errors globally
// ──────────────────────────────────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Redirect to login page
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);
