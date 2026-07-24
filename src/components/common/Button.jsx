import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-primary text-white shadow-glow hover:bg-blue-500 active:bg-blue-600 disabled:bg-blue-300",
  secondary:
    "border border-border bg-surface-alt text-text hover:border-primary/30 hover:bg-primary/10",
  ghost: "bg-transparent text-text hover:bg-white/10 dark:hover:bg-white/5",
  danger: "bg-danger text-white hover:bg-red-500 active:bg-red-600",
};

const sizes = {
  sm: "h-10 rounded-2xl px-4 text-sm",
  md: "h-11 rounded-2xl px-5 text-sm",
  lg: "h-12 rounded-2xl px-6 text-base",
};

export const Button = forwardRef(function Button(
  { className, children, variant = "primary", size = "md", type = "button", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "focus-ring inline-flex cursor-pointer items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});
