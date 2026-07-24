import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise = null;

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const isAuthRoute = originalRequest?.url?.includes("/api/auth/");

    if (status !== 401 || originalRequest?._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      tokenStorage.clear();
      window.dispatchEvent(new Event("auth:expired"));
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= axios.post(`${baseURL}/api/auth/refresh`, { refreshToken });
      const refreshResponse = await refreshPromise;
      refreshPromise = null;

      const authData = refreshResponse.data?.data;
      tokenStorage.setTokens({
        accessToken: authData?.accessToken,
        refreshToken: authData?.refreshToken,
      });

      originalRequest.headers.Authorization = `Bearer ${authData?.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      refreshPromise = null;
      tokenStorage.clear();
      window.dispatchEvent(new Event("auth:expired"));
      return Promise.reject(refreshError);
    }
  }
);

export function extractApiData(response) {
  return response.data;
}
