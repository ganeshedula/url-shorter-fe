import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

export function Card({ className, children, ...props }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-apple-xl border border-separator bg-surface p-5 sm:p-6 shadow-apple transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
