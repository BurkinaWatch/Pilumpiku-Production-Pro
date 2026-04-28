import { cn } from "@/lib/utils";

export function ButterflyLogo({ className }: { className?: string }) {
  return (
    <img
      src="/img/logo.jpg"
      alt="Pilumpiku Production"
      className={cn(
        "w-12 h-12 object-contain bg-white rounded-lg shadow-md",
        className,
      )}
    />
  );
}
