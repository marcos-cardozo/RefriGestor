/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types/job";
import { AddJobModal } from "@/components/AddJobModal";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const fetchJobs = async () => {
    try {
      const response = await jobsService.getAll();

      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="mx-auto min-h-screen max-w-md bg-[#bfd2e6] p-4">
      <Header />

      <div
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center pt-3! pb-3!"
      >
        <Button title="+ Nuevo trabajo" />
      </div>

      <div className="flex flex-col items-center gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <AddJobModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onJobCreated={fetchJobs}
      />
    </main>
  );
}
