/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types/job";
import { AddJobModal } from "@/components/AddJobModal";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import { StatsCard } from "@/components/StatsCard";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
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
  const totalAmount = jobs.reduce(
    (accumulator, job) => accumulator + Number(job.amount),
    0,
  );

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

  const handleEdit = (job: Job) => {
    setEditingJob(job);

    setOpenModal(true);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-cyan-100 via-blue-100 to-slate-200 p-4!">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col rounded-[2.5rem] border border-white/30 bg-white/30 p-5! shadow-2xl backdrop-blur-xl">
        <Header />

        <div className="mb-4! flex flex-col gap-4">
          <StatsCard title="Ganancias del mes" value={monthlyTotal} icon="💸" />

          <StatsCard title="Ganancias del año" value={yearlyTotal} icon="📈" />
        </div>

        <div
          onClick={() => setOpenModal(true)}
          className="flex justify-center items-center pt-3! pb-3!"
        >
          <Button title="+ Nuevo trabajo" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="flex flex-col items-center gap-4"
        >
          {loading ? (
            <div className="mt-16! text-zinc-700">Cargando trabajos...</div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={deleteJob}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="mt-8! flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 p-6! text-center text-white">
              <span className="mb-2! text-4xl">🧊</span>

              <h2 className="mb-1! text-lg font-bold">No hay trabajos</h2>

              <p className="max-w-[220px] text-sm text-zinc-400">
                Agregá el primer trabajo para comenzar.
              </p>
            </div>
          )}
        </motion.div>
        <AnimatePresence>
          {openModal && (
            <AddJobModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              onJobCreated={fetchJobs}
              editingJob={editingJob}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
