export function HorizontalBarList({ title, items = [] }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-apple-xl border border-separator bg-surface p-5 shadow-apple">
      <h3 className="text-sm font-semibold text-label tracking-tight">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-medium text-label truncate">{item.label}</span>
                <span className="font-semibold text-label shrink-0">{item.value}</span>
              </div>
              <div className="h-1.5 rounded-full bg-surface-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-system-blue transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-label-secondary">No geographic data recorded yet.</p>
        )}
      </div>
    </div>
  );
}
