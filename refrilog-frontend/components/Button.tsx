interface ButtonProps {
  title: string;
}

export function Button({ title }: ButtonProps) {
  return (
    <button className="rounded-xl w-[60%] bg-zinc-800 p-4 text-lg font-semibold text-white transition active:scale-95  cursor-pointer">
      {title}
    </button>
  );
}
