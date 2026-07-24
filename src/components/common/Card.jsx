import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn("glass-panel rounded-[28px] p-6", className)}
    >
      {children}
    </motion.div>
  );
}
