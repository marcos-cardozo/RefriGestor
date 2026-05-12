"use client";

import { useEffect, useState } from "react";

import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types/job";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsService.getAll();

        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen p-4">
      <h1 className="mb-6 text-3xl font-bold">RefriLog</h1>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-xl bg-zinc-800 p-4 text-white">
            <h2 className="text-xl font-bold">{job.clientName}</h2>

            <p>${job.amount}</p>

            <p>{job.date}</p>

            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
