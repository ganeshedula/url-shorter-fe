import { getRingSegments } from "../../utils/analytics";

export function DoughnutChart({ items = [], title }) {
  const segments = getRingSegments(items);
  const total = items.reduce((sum, item) => sum + item.value, 0);

  if (!items.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-border p-5">
        <h3 className="text-lg">{title}</h3>
        <p className="mt-3">No distribution data yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-border p-5">
      <h3 className="text-lg">{title}</h3>
      <div className="mt-5 flex items-center gap-6">
        <svg viewBox="0 0 42 42" className="h-36 w-36 -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(148,163,184,.16)" strokeWidth="6" />
          {segments.map((segment) => (
            <circle
              key={segment.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={segment.color}
              strokeWidth="6"
              strokeDasharray={`${segment.share} ${100 - segment.share}`}
              strokeDashoffset={-segment.offset}
            />
          ))}
        </svg>
        <div className="space-y-3">
          <p className="text-sm text-muted">{total} tracked events</p>
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-3 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="font-semibold text-text">{segment.label}</span>
              <span className="text-muted">{segment.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
