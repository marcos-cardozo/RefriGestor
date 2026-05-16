/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Job } from "@/types/job";
import { AddJobModal } from "@/components/AddJobModal";
import { AnimatePresence } from "framer-motion";
import { StatsCard } from "@/components/StatsCard";
import { useJobs } from "./hooks/useJobs";
import { useJobStats } from "./hooks/useJobStats";
import { SkeletonCard } from "@/components/SkeletonCard";
import { EarningsChart } from "@/components/EarningsChart";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");

  const { jobs, loading, fetchJobs, deleteJob } = useJobs();
  const { monthlyTotal, yearlyTotal } = useJobStats({ jobs });
  const filteredJobs = jobs
    .filter((job) =>
      job.clientName.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (job: Job) => {
    setEditingJob(job);

    setOpenModal(true);
  };

  const chartData = [
    {
      month: "Ene",
      total: 120000,
    },
    {
      month: "Feb",
      total: 180000,
    },
    {
      month: "Mar",
      total: 90000,
    },
    {
      month: "Abr",
      total: 250000,
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-cyan-100 via-blue-100 to-slate-200 p-4!">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-md flex-col rounded-[2.5rem] border border-white/30 bg-white/30 p-5! shadow-2xl backdrop-blur-xl">
        <Header />

        <div className="mb-4! flex flex-col gap-4">
          <StatsCard title="Ganancias del mes" value={monthlyTotal} icon="💸" />

          <StatsCard title="Ganancias del año" value={yearlyTotal} icon="📈" />
        </div>
        <EarningsChart data={chartData} />
        <div className="mb-4! mt-4!">
          <input
            type="text"
            placeholder="🔍 Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
                       w-full
                       rounded-2xl
                       border
                       border-white/10
                       bg-zinc-900/80
                       p-3!
                       text-white
                       placeholder:text-zinc-400
                       shadow-lg
                       outline-none
                       transition-all
                       duration-300
                       focus:border-cyan-400/40
                       focus:shadow-cyan-500/10
                       focus:ring-1 focus:ring-cyan-400/20
                       "
          />
        </div>

        <div
          onClick={() => setOpenModal(true)}
          className="flex justify-center items-center pb-3!"
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
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : jobs.length === 0 ? (
            <div className="mt-8! flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 p-6! text-center text-white">
              <span className="mb-2! text-4xl">🧊</span>

              <h2 className="mb-1! text-lg font-bold">No hay trabajos</h2>
              <div className="bg-zinc-700 p-1! pl-2! pr-2! rounded-2xl">
                <p className="max-w-55 text-sm text-white">
                  Agregá el primer trabajo para comenzar.
                </p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="mt-8! flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-900/40 p-6! text-center text-white">
              <span className="mb-2! text-4xl">🔍</span>

              <h2 className="mb-1! text-lg font-bold">
                No se encontraron clientes
              </h2>
              <div className="bg-zinc-700 p-1! pl-2! pr-2! rounded-2xl ">
                <p className="max-w-55 text-sm text-white">
                  Probá buscando otro nombre
                </p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={deleteJob}
                  onEdit={handleEdit}
                />
              ))}
            </AnimatePresence>
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
