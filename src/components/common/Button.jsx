import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-system-blue text-white hover:opacity-90 active:opacity-80 shadow-sm border border-transparent font-medium",
  secondary:
    "bg-surface-secondary text-label hover:bg-surface-tertiary active:opacity-75 border border-separator font-medium",
  tertiary:
    "bg-transparent text-system-blue hover:bg-system-blue/10 active:bg-system-blue/15 border border-transparent font-medium",
  ghost:
    "bg-transparent text-label hover:bg-surface-secondary active:bg-surface-tertiary border border-transparent font-medium",
  destructive:
    "bg-system-red text-white hover:opacity-90 active:opacity-80 shadow-sm border border-transparent font-medium",
  danger:
    "bg-system-red text-white hover:opacity-90 active:opacity-80 shadow-sm border border-transparent font-medium",
};

const sizes = {
  xs: "h-7 rounded-apple-sm px-2.5 text-xs",
  sm: "h-8 rounded-apple-sm px-3 text-xs",
  md: "h-9 rounded-apple-md px-4 text-sm",
  lg: "h-11 rounded-apple-lg px-5 text-sm sm:text-base",
  xl: "h-12 rounded-apple-lg px-6 text-base font-semibold",
};

export const Button = forwardRef(function Button(
  { className, children, variant = "primary", size = "md", type = "button", disabled, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={cn(
        "focus-ring inline-flex cursor-pointer items-center justify-center gap-2 select-none transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-40",
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});
