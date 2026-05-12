import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { jobsService } from "@/services/jobs.service";
import { CreateJob } from "@/types/create-job";
import { Job } from "@/types/job";
import { useEffect } from "react";

interface AddJobModalProps {
  open: boolean;
  onClose: () => void;
  onJobCreated: () => void;
  editingJob: Job | null;
}

export function AddJobModal({
  open,
  onClose,
  onJobCreated,
  editingJob,
}: AddJobModalProps) {
  const { register, handleSubmit, reset } = useForm<CreateJob>();

  useEffect(() => {
    if (editingJob) {
      reset({
        clientName: editingJob.clientName,

        description: editingJob.description,

        amount: editingJob.amount,

        date: editingJob.date,
      });
    } else {
      reset({
        clientName: "",
        description: "",
        amount: undefined,
        date: "",
      });
    }
  }, [editingJob, reset]);

  const onSubmit = async (data: CreateJob) => {
    try {
      if (editingJob) {
        await jobsService.update(editingJob.id, data);

        toast.success("Trabajo actualizado");
      } else {
        await jobsService.create(data);

        toast.success("Trabajo agregado con éxito");
      }

      toast.success("Trabajo agregado con éxito");

      onJobCreated();

      reset();

      onClose();
    } catch (error) {
      toast.error("Error al agregar trabajo");

      console.error(error);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6! ">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingJob ? "Editar trabajo" : "Nuevo trabajo"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-red-400 bg-red-400/20 rounded-full w-8 h-8 transition active:scale-95 flex justify-center items-center mb-2!"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Cliente</label>
            <input
              type="text"
              placeholder="ej. Juan Pérez"
              {...register("clientName")}
              className="rounded-lg border p-3!"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">
              Descripción
            </label>
            <textarea
              placeholder="ej. Carga de gas, reparación, etc."
              {...register("description")}
              className="rounded-lg border p-3!"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Monto</label>
            <input
              type="number"
              placeholder="ej. 15000"
              {...register("amount", {
                valueAsNumber: true,
              })}
              className="rounded-lg border p-3!"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700">Fecha</label>

            <input
              type="date"
              {...register("date")}
              className="rounded-lg border p-3!"
            />
          </div>

          <button className="rounded-xl bg-zinc-800 p-4! font-semibold text-white">
            Guardar trabajo
          </button>
        </form>
      </div>
    </div>
  );
}
