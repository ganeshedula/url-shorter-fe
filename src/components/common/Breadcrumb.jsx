export function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-medium text-muted">
      {items.map((item, index) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          {index > 0 ? <span>/</span> : null}
          <span className={index === items.length - 1 ? "text-text" : ""}>{item.label}</span>
        </span>
      ))}
    </nav>
  );
}
