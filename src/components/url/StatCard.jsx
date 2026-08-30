import { formatCompactNumber } from "../../utils/formatters";

export function StatCard({ icon: Icon, label, value, trend, color = "system-blue" }) {
  const colorStyles = {
    "system-blue": "bg-system-blue/10 text-system-blue",
    "system-green": "bg-system-green/10 text-system-green",
    "system-purple": "bg-system-purple/10 text-system-purple",
    "system-orange": "bg-system-orange/10 text-system-orange",
  };

  return (
    <div className="rounded-apple-xl border border-separator bg-surface p-4 sm:p-5 shadow-apple transition-colors">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-label-secondary">
          {label}
        </span>
        <div className={`flex h-8 w-8 items-center justify-center rounded-apple-sm ${colorStyles[color] || colorStyles["system-blue"]}`}>
          <Icon size={16} />
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-label">
          {formatCompactNumber(value)}
        </h3>
        {trend ? <span className="text-xs font-medium text-system-green">{trend}</span> : null}
      </div>
    </div>
  );
}
