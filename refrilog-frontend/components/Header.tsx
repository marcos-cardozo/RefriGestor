import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-col items-center">
      <Image src="/logo.png" alt="RefriLog" width={150} height={150} />
    </header>
  );
}
