export function HorizontalBarList({ title, items = [] }) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="rounded-[24px] border border-border p-5">
      <h3 className="text-lg">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.length ? (
          items.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-text">{item.label}</span>
                <span className="text-muted">{item.value}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-300/20">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No data yet.</p>
        )}
      </div>
    </div>
  );
}
