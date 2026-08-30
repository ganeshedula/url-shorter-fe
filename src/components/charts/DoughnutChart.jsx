import { getRingSegments } from "../../utils/analytics";

export function DoughnutChart({ items = [], title }) {
  const segments = getRingSegments(items);
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (!items.length) {
    return (
      <div className="rounded-apple-xl border border-separator bg-surface p-5 text-center">
        <h3 className="text-sm font-semibold text-label tracking-tight">{title}</h3>
        <p className="mt-2 text-xs text-label-secondary">No distribution recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-apple-xl border border-separator bg-surface p-5 shadow-apple">
      <h3 className="text-sm font-semibold text-label tracking-tight">{title}</h3>
      <div className="mt-4 flex items-center gap-6">
        <svg viewBox="0 0 42 42" className="h-32 w-32 -rotate-90 shrink-0">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--color-separator)" strokeWidth="4.5" />
          {segments.map((segment) => (
            <circle
              key={segment.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={segment.color}
              strokeWidth="4.5"
              strokeDasharray={`${segment.share} ${100 - segment.share}`}
              strokeDashoffset={-segment.offset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="space-y-2 flex-1 min-w-0">
          <p className="text-xs font-medium text-label-secondary">{total} tracked events</p>
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: segment.color }} />
                <span className="truncate font-medium text-label">{segment.label}</span>
              </div>
              <span className="font-semibold text-label shrink-0">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
