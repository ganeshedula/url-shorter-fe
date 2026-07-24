import { cn } from "../../utils/cn";

const variants = {
  primary: "bg-primary/12 text-primary",
  success: "bg-success/12 text-success",
  danger: "bg-danger/12 text-danger",
  muted: "bg-slate-400/12 text-muted",
  secondary: "bg-secondary/12 text-secondary",
};

export function Badge({ children, variant = "muted", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
