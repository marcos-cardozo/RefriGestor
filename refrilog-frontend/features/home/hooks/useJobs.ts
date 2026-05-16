/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await jobsService.getAll();

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    const confirmDelete = confirm("¿Eliminar este trabajo?");

    if (!confirmDelete) return;

    try {
      await jobsService.remove(id);

      toast.success("Trabajo eliminado");

      fetchJobs();
    } catch (error) {
      toast.error("Error al eliminar trabajo");

      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    fetchJobs,
    deleteJob,
  };
}
