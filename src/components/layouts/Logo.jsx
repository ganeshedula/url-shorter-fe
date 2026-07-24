export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-sm font-extrabold text-white shadow-glow">
        N
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Nexly</p>
        <p className="text-xs text-muted">URL intelligence suite</p>
      </div>
    </div>
  );
}
