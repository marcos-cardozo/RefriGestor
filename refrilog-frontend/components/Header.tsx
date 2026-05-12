import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-col items-center">
      <Image src="/logo.png" alt="RefriLog" width={200} height={200} />

      <p className="-mt-10! text-sm bg-amber-50 p-2! rounded-2xl text-zinc-700 ">
        Gestión de trabajos
      </p>
    </header>
  );
}
