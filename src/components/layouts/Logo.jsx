import { FiLink } from "react-icons/fi";

export function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className="flex h-8 w-8 items-center justify-center rounded-apple-md bg-system-blue text-white shadow-sm">
        <FiLink size={16} />
      </div>
      {!compact && (
        <div>
          <span className="text-base font-bold tracking-tight text-label">Nexly</span>
          <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wider text-system-blue">
            Shortener
          </span>
        </div>
      )}
    </div>
  );
}
