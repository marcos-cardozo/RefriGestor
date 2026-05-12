/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { jobsService } from "@/services/jobs.service";
import { Job } from "@/types/job";
import { AddJobModal } from "@/components/AddJobModal";
import { toast } from "sonner";

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
    <main className="mx-auto min-h-screen max-w-md bg-[#bfd2e6] p-4!">
      <Header />
      <div className="mb-6! flex flex-col gap-4 mt-5!">
        <div className="rounded-2xl bg-zinc-800 p-5! text-white shadow-lg">
          <p className="text-sm text-zinc-300">💰 Total generado</p>

          <h2 className="mt-2! text-3xl font-bold text-green-400">
            ${totalAmount.toLocaleString("es-AR")}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-zinc-800 p-4! text-white shadow-lg">
            <p className="text-sm text-zinc-300">📅 Este mes</p>

            <h3 className="mt-2! text-xl font-bold text-blue-400">
              ${monthlyTotal.toLocaleString("es-AR")}
            </h3>
          </div>

          <div className="rounded-2xl bg-zinc-800 p-4! text-white shadow-lg">
            <p className="text-sm text-zinc-300">📈 Este año</p>

            <h3 className="mt-2! text-xl font-bold text-yellow-400">
              ${yearlyTotal.toLocaleString("es-AR")}
            </h3>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center pt-3! pb-3!"
      >
        <Button title="+ Nuevo trabajo" />
      </div>

      <div className="flex flex-col items-center gap-6">
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
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="mb-4 text-6xl">❄️</span>

            <h2 className="text-xl font-bold text-zinc-700">No hay trabajos</h2>

            <p className="mt-2 text-zinc-600">Agregá el primer trabajo</p>
          </div>
        )}
      </div>
      <AddJobModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingJob(null);
        }}
        onJobCreated={fetchJobs}
        editingJob={editingJob}
      />
    </main>
  );
}
