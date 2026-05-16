import { Job } from "@/types/job";

interface UseJobStatsProps {
  jobs: Job[];
}

export function useJobStats({ jobs }: UseJobStatsProps) {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();

  const monthlyJobs = jobs.filter((job) => {
    const jobDate = new Date(job.date);

    return (
      jobDate.getMonth() === currentMonth &&
      jobDate.getFullYear() === currentYear
    );
  });

  const monthlyTotal = monthlyJobs.reduce(
    (accumulator, job) => accumulator + Number(job.amount),
    0,
  );

  const yearlyJobs = jobs.filter((job) => {
    const jobDate = new Date(job.date);

    return jobDate.getFullYear() === currentYear;
  });

  const yearlyTotal = yearlyJobs.reduce(
    (accumulator, job) => accumulator + Number(job.amount),
    0,
  );

  return {
    monthlyTotal,
    yearlyTotal,
  };
}
