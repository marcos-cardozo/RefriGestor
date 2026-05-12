import { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-800 p-4! text-white shadow-lg w-[80%]">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold">{job.clientName}</h2>

        <div className="bg-green-300 rounded-2xl">
          <span className="text-lg font-semibold text-green-800 p-2!">
            ${job.amount}
          </span>
        </div>
      </div>

      <p className="mb-2 text-sm text-zinc-300">{job.date}</p>

      <p className="line-clamp-2 text-sm text-zinc-100">{job.description}</p>

      <div className="mt-4 flex gap-2 pt-2!">
        <button className="flex-1 rounded-lg bg-yellow-500 p-2 font-medium text-black transition active:scale-95">
          Editar
        </button>

        <button className="flex-1 rounded-lg bg-red-500 p-2 font-medium text-white transition active:scale-95">
          Eliminar
        </button>
      </div>
    </div>
  );
}
