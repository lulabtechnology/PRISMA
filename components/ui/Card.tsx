import { cn } from "@/lib/utils";

export default function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
