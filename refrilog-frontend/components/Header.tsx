export function Header() {
  return (
    <header className="mb-6 flex flex-col items-center">
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800 text-3xl text-white">
        ❄️
      </div>

      <h1 className="text-3xl font-bold text-zinc-900">RefriLog</h1>

      <p className="mt-1 text-sm text-zinc-700">Gestión de trabajos</p>
    </header>
  );
}
