import { api } from "@/lib/axios";

export const jobsService = {
  async getAll() {
    const response = await api.get("/jobs");
    console.log(response);
    return response.data;
  },
};
