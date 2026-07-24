import { FiChevronDown } from "react-icons/fi";
import { cn } from "../../utils/cn";

export function Dropdown({ label, children, className }) {
  return (
    <details className="group relative">
      <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-text shadow-sm hover:border-primary/30 transition-all">
        {label}
        <FiChevronDown className="transition-transform duration-200 group-open:rotate-180 text-muted" />
      </summary>
      <div
        className={cn(
          "absolute right-0 z-50 mt-2 min-w-56 rounded-2xl border border-slate-700/60 bg-slate-900 text-slate-100 p-2 shadow-2xl backdrop-blur-xl space-y-1",
          className
        )}
      >
        {children}
      </div>
    </details>
  );
}
