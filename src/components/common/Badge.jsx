import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-system-blue/12 text-system-blue border-system-blue/20",
  success: "bg-system-green/12 text-system-green border-system-green/20",
  danger: "bg-system-red/12 text-system-red border-system-red/20",
  warning: "bg-system-orange/12 text-system-orange border-system-orange/20",
  muted: "bg-surface-secondary text-label-secondary border-separator",
  secondary: "bg-surface-secondary text-label border-separator",
};

export function Badge({ children, variant = "muted", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight select-none",
        variants[variant] || variants.muted,
        className
      )}
    >
      {children}
    </span>
  );
}
