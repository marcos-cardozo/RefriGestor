import { api } from "@/lib/axios";
import { CreateJob } from "@/types/create-job";

export const jobsService = {
  async getAll() {
    const response = await api.get("/jobs");
    console.log(response);
    return response.data;
  },

  async create(data: CreateJob) {
    const response = await api.post("/jobs", data);

    return response.data;
  },

  async remove(id: string) {
    const response = await api.delete(`/jobs/${id}`);

    return response.data;
  },

  async update(id: string, data: CreateJob) {
    const response = await api.patch(`/jobs/${id}`, data);

    return response.data;
  },
};
