import { forwardRef, useState } from "react";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { cn } from "../../utils/cn";

export const Input = forwardRef(function Input(
  { id, label, hint, error, icon: Icon, className, type, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === "password";
  const inputType = isPasswordInput ? (showPassword ? "text" : "password") : type;

  return (
    <label htmlFor={id} className="block space-y-1.5">
      {label ? (
        <span className="text-sm font-semibold text-text">
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "glass-panel flex min-h-12 items-center gap-3 rounded-2xl px-4 transition-all duration-200",
          error
            ? "!border-red-500/80 ring-2 ring-red-500/20 bg-red-500/5"
            : "hover:border-primary/25 focus-within:border-primary/40",
          className
        )}
      >
        {Icon ? <Icon className="shrink-0 text-muted" size={18} /> : null}
        <input
          ref={ref}
          id={id}
          type={inputType}
          className="focus-ring h-11 w-full bg-transparent text-sm font-medium text-text placeholder:text-muted/80"
          {...props}
        />
        {isPasswordInput ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 text-muted hover:text-text transition-colors p-1 rounded-lg focus:outline-none cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 pt-0.5">
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
      {!error && hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </label>
  );
});
