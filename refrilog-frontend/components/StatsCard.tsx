interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="w-full rounded-3xl border border-white/10 bg-zinc-900/80 p-4! text-white shadow-xl shadow-black/20 backdrop-blur-md">
      <div className="mb-2! flex items-center gap-2">
        <span className="text-2xl">{icon}</span>

        <h3 className="text-sm text-zinc-300 font-(--font-space)">{title}</h3>
      </div>

      <p className="text-2xl tracking-tight text-green-400 font-(--font-mono)">
        ${value.toLocaleString("es-AR")}
      </p>
    </div>
  );
}
