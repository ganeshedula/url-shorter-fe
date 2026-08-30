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
    <div className="w-full space-y-1.5 text-left">
      {label ? (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-label-secondary"
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          "flex min-h-[42px] items-center gap-2.5 rounded-apple-md border bg-surface px-3.5 transition-all duration-150",
          error
            ? "border-system-red ring-1 ring-system-red/30 bg-system-red/5"
            : "border-separator hover:border-separator-opaque focus-within:border-system-blue focus-within:ring-2 focus-within:ring-system-blue/20",
          className
        )}
      >
        {Icon ? <Icon className="shrink-0 text-label-tertiary" size={17} /> : null}
        <input
          ref={ref}
          id={id}
          type={inputType}
          className="h-10 w-full bg-transparent text-sm text-label placeholder:text-label-tertiary focus:outline-none"
          {...props}
        />
        {isPasswordInput ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 rounded-apple-sm p-1 text-label-tertiary transition-colors hover:text-label focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-system-red pt-0.5">
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
      {!error && hint ? <p className="text-xs text-label-tertiary">{hint}</p> : null}
    </div>
  );
});
