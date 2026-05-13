import { Job } from "@/types/job";
import { motion } from "framer-motion";

interface JobCardProps {
  job: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

export function JobCard({ job, onDelete, onEdit }: JobCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },

        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.3,
      }}
      className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 p-4! text-white shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98]"
    >
      <div className="mb-2! flex items-center justify-between">
        <h2 className="text-lg font-bold">{job.clientName}</h2>

        <div className="rounded-2xl bg-green-300">
          <span className="p-2! text-lg font-semibold text-green-800">
            ${job.amount}
          </span>
        </div>
      </div>

      <p className="mb-2! text-sm text-zinc-300">{job.date}</p>

      <p className="line-clamp-2 text-sm text-zinc-100">{job.description}</p>

      <div className="mt-4! flex gap-2 pt-2!">
        <button
          onClick={() => onEdit(job)}
          className="flex-1 rounded-lg bg-yellow-500 p-2! font-medium text-black transition active:scale-95"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(job.id)}
          className="flex-1 rounded-lg bg-red-500 p-2! font-medium text-zinc-800 transition active:scale-95"
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}
