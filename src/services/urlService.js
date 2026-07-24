import { apiClient, extractApiData } from "./apiClient";

export const urlService = {
  create: async (payload) => extractApiData(await apiClient.post("/api/url", payload)),
  listMine: async (params) => extractApiData(await apiClient.get("/api/url/my", { params })),
  update: async (id, payload) => extractApiData(await apiClient.put(`/api/url/${id}`, payload)),
  remove: async (id) => extractApiData(await apiClient.delete(`/api/url/${id}`)),
  getAnalytics: async (id) => extractApiData(await apiClient.get(`/api/url/${id}`)),
};
