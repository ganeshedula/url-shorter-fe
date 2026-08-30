import { cn } from "../../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-apple-xl border border-separator bg-surface p-5 sm:p-6 shadow-apple transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
