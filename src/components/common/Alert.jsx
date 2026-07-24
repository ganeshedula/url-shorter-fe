import { useState } from "react";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

const variantStyles = {
  danger: {
    container: "bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200",
    icon: FiAlertCircle,
    iconColor: "text-red-600 dark:text-red-400",
  },
  error: {
    container: "bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200",
    icon: FiAlertCircle,
    iconColor: "text-red-600 dark:text-red-400",
  },
  success: {
    container: "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200",
    icon: FiCheckCircle,
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    container: "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200",
    icon: FiAlertTriangle,
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  info: {
    container: "bg-blue-500/10 border-blue-500/30 text-blue-950 dark:text-blue-200",
    icon: FiInfo,
    iconColor: "text-blue-600 dark:text-blue-400",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  dismissible = false,
  className,
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const style = variantStyles[variant] || variantStyles.info;
  const IconComponent = style.icon;

  const handleDismiss = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full items-start gap-3.5 rounded-2xl border p-4 text-sm transition-all duration-200 shadow-sm",
        style.container,
        className
      )}
    >
      <IconComponent className={cn("mt-0.5 h-5 w-5 shrink-0 font-semibold", style.iconColor)} />
      <div className="flex-1 space-y-1">
        {title ? <h4 className="font-semibold leading-tight">{title}</h4> : null}
        {children ? <div className="text-sm font-medium leading-relaxed opacity-95">{children}</div> : null}
      </div>
      {dismissible || onClose ? (
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-lg p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Dismiss alert"
        >
          <FiX className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
