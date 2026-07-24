export function Tooltip({ content, children }) {
  return (
    <span title={content} className="inline-flex">
      {children}
    </span>
  );
}
