import { apiClient, extractApiData } from "./apiClient";

export const authService = {
  register: async (payload) =>
    extractApiData(await apiClient.post("/api/auth/register", payload)),
  login: async (payload) => extractApiData(await apiClient.post("/api/auth/login", payload)),
  me: async () => extractApiData(await apiClient.get("/api/auth/me")),
  logout: async (payload) => extractApiData(await apiClient.post("/api/auth/logout", payload)),
  logoutAll: async () => extractApiData(await apiClient.post("/api/auth/logout-all")),
  verifyRegistrationOtp: async (payload) => extractApiData(await apiClient.post("/api/auth/verify-registration-otp", payload)),
  resendOtp: async (payload) => extractApiData(await apiClient.post("/api/auth/resend-otp", payload)),
  forgotPassword: async (payload) => extractApiData(await apiClient.post("/api/auth/forgot-password", payload)),
  verifyResetOtp: async (payload) => extractApiData(await apiClient.post("/api/auth/verify-reset-otp", payload)),
  resetPassword: async (payload) => extractApiData(await apiClient.post("/api/auth/reset-password", payload)),
};
