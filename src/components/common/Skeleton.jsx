import { cn } from "../../utils/cn";

export function Skeleton({ className }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-apple-md bg-surface-secondary/80 border border-separator/40",
        className
      )}
    />
  );
}
