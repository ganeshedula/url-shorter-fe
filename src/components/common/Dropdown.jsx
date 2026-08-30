import { FiChevronDown } from "react-icons/fi";
import { cn } from "../../utils/cn";

export function Dropdown({ label, children, className }) {
  return (
    <details className="group relative">
      <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 rounded-apple-md border border-separator bg-surface px-3.5 py-2 text-xs sm:text-sm font-medium text-label shadow-sm hover:bg-surface-secondary active:opacity-80 transition-all select-none">
        {label}
        <FiChevronDown className="transition-transform duration-150 group-open:rotate-180 text-label-secondary" size={15} />
      </summary>
      <div
        className={cn(
          "absolute right-0 z-50 mt-1.5 min-w-48 rounded-apple-lg border border-separator bg-surface p-1.5 shadow-apple-popover space-y-0.5",
          className
        )}
      >
        {children}
      </div>
    </details>
  );
}
