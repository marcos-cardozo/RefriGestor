import { useForm } from "react-hook-form";

import { jobsService } from "@/services/jobs.service";
import { CreateJob } from "@/types/create-job";

interface AddJobModalProps {
  open: boolean;
  onClose: () => void;
  onJobCreated: () => void;
}

export function AddJobModal({ open, onClose, onJobCreated }: AddJobModalProps) {
  const { register, handleSubmit, reset } = useForm<CreateJob>();
  if (!open) return null;

  const onSubmit = async (data: CreateJob) => {
    try {
      await jobsService.create(data);

      onJobCreated();

      reset();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6! ">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Nuevo trabajo</h2>

          <button
            onClick={onClose}
            className="text-2xl text-red-400 bg-red-400/20 rounded-full w-8 h-8 transition active:scale-95 flex justify-center items-center mb-2!"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Cliente"
            {...register("clientName")}
            className="rounded-lg border p-3!"
          />

          <textarea
            placeholder="Descripción"
            {...register("description")}
            className="rounded-lg border p-3!"
          />

          <input
            type="number"
            placeholder="Monto"
            {...register("amount", {
              valueAsNumber: true,
            })}
            className="rounded-lg border p-3!"
          />

          <input
            type="date"
            {...register("date")}
            className="rounded-lg border p-3!"
          />

          <button className="rounded-xl bg-zinc-800 p-4! font-semibold text-white">
            Guardar trabajo
          </button>
        </form>
      </div>
    </div>
  );
}
