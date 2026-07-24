import { FiChevronDown } from "react-icons/fi";

export function Dropdown({ label, children }) {
  return (
    <details className="group relative">
      <summary className="focus-ring flex cursor-pointer list-none items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-text">
        {label}
        <FiChevronDown className="transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="glass-panel absolute right-0 z-20 mt-2 min-w-56 rounded-2xl p-2 shadow-soft">
        {children}
      </div>
    </details>
  );
}
