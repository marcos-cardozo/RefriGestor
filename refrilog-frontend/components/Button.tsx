interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export function Button({ title, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-2xl
        bg-zinc-900
        p-3!
        text-lg
        font-semibold
        text-white
        shadow-xl
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-zinc-800
        hover:shadow-2xl
        active:scale-[0.98]
      "
    >
      {title}
    </button>
  );
}
