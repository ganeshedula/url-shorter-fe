import { apiClient, extractApiData } from "./apiClient";

export const authService = {
  register: async (payload) =>
    extractApiData(await apiClient.post("/api/auth/register", payload)),
  login: async (payload) => extractApiData(await apiClient.post("/api/auth/login", payload)),
  me: async () => extractApiData(await apiClient.get("/api/auth/me")),
  logout: async (payload) => extractApiData(await apiClient.post("/api/auth/logout", payload)),
  logoutAll: async () => extractApiData(await apiClient.post("/api/auth/logout-all")),
};
