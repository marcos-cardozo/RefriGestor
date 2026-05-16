export function SkeletonCard() {
  return (
    <div
      className="
        w-full
        animate-pulse
        rounded-3xl
        border
        border-white/10
        bg-zinc-900/70
        p-5!
        shadow-xl
      "
    >
      <div className="mb-4! flex items-center justify-between">
        <div className="h-6 w-32 rounded-full bg-zinc-700" />

        <div className="h-8 w-20 rounded-full bg-zinc-700" />
      </div>

      <div className="mb-3! h-4 w-24 rounded-full bg-zinc-700" />

      <div className="mb-2! h-4 w-full rounded-full bg-zinc-700" />

      <div className="h-4 w-2/3 rounded-full bg-zinc-700" />

      <div className="mt-5! flex gap-2">
        <div className="h-10 flex-1 rounded-xl bg-zinc-700" />

        <div className="h-10 flex-1 rounded-xl bg-zinc-700" />
      </div>
    </div>
  );
}
