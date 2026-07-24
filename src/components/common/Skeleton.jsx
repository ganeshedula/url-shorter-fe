import { cn } from "../../utils/cn";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-2xl bg-slate-300/25 dark:bg-slate-700/40", className)} />;
}
