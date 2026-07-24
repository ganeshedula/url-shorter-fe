import { forwardRef } from "react";
import { cn } from "../../utils/cn";

export const Input = forwardRef(function Input(
  { id, label, hint, error, icon: Icon, className, ...props },
  ref
) {
  return (
    <label htmlFor={id} className="block space-y-2">
      {label ? (
        <span className="text-sm font-semibold text-text">
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "glass-panel flex min-h-12 items-center gap-3 rounded-2xl px-4 transition-all duration-200",
          error ? "border-danger/50" : "hover:border-primary/25 focus-within:border-primary/40",
          className
        )}
      >
        {Icon ? <Icon className="shrink-0 text-muted" size={18} /> : null}
        <input
          ref={ref}
          id={id}
          className="focus-ring h-11 w-full bg-transparent text-sm font-medium text-text placeholder:text-muted/80"
          {...props}
        />
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {!error && hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </label>
  );
});
