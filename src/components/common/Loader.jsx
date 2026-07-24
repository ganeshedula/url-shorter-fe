export function Loader({ label = "Loading..." }) {
  return (
    <div className="inline-flex items-center gap-3 text-sm font-semibold text-muted">
      <span className="relative flex h-3.5 w-3.5">
        <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-primary/40" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary" />
      </span>
      {label}
    </div>
  );
}
