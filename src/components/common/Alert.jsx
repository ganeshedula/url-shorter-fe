import { useState } from "react";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

const variantStyles = {
  danger: {
    container: "bg-system-red/10 border-system-red/20 text-label",
    icon: FiAlertCircle,
    iconColor: "text-system-red",
  },
  error: {
    container: "bg-system-red/10 border-system-red/20 text-label",
    icon: FiAlertCircle,
    iconColor: "text-system-red",
  },
  success: {
    container: "bg-system-green/10 border-system-green/20 text-label",
    icon: FiCheckCircle,
    iconColor: "text-system-green",
  },
  warning: {
    container: "bg-system-orange/10 border-system-orange/20 text-label",
    icon: FiAlertTriangle,
    iconColor: "text-system-orange",
  },
  info: {
    container: "bg-system-blue/10 border-system-blue/20 text-label",
    icon: FiInfo,
    iconColor: "text-system-blue",
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
        "flex w-full items-start gap-3 rounded-apple-md border p-3.5 text-sm transition-all shadow-sm",
        style.container,
        className
      )}
    >
      <IconComponent className={cn("mt-0.5 h-4.5 w-4.5 shrink-0", style.iconColor)} />
      <div className="flex-1 space-y-0.5">
        {title ? <h4 className="font-semibold leading-tight text-label">{title}</h4> : null}
        {children ? <div className="text-xs sm:text-sm text-label leading-relaxed">{children}</div> : null}
      </div>
      {dismissible || onClose ? (
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded-apple-sm p-1 text-label-tertiary transition-colors hover:text-label hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Dismiss alert"
        >
          <FiX className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
