import { getDailyTrendPoints } from "../../utils/analytics";

export function MiniLineChart({ data = [] }) {
  const points = getDailyTrendPoints(data);
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x},${point.y}`)
    .join(" ");

  if (!points.length) {
    return (
      <div className="flex h-44 items-center justify-center rounded-[24px] border border-dashed border-border">
        <p>No click trend data yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-border bg-surface-alt/30 p-4">
      <svg viewBox="0 0 100 100" className="h-44 w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id="trend-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="url(#trend-gradient)" strokeWidth="3.5" strokeLinecap="round" />
        {points.map((point) => (
          <circle key={point.date} cx={point.x} cy={point.y} r="2.5" fill="#2563EB" />
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-muted">
        {data.map((item) => (
          <span key={item.date}>{item.date}</span>
        ))}
      </div>
    </div>
  );
}
