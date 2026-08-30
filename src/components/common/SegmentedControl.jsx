import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function SegmentedControl({ options = [], value, onChange, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center rounded-apple-md border border-separator/80 bg-surface-secondary/80 p-1 text-xs sm:text-sm font-medium select-none shadow-inner",
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isSelected}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-3 sm:px-4 py-1.5 rounded-apple-sm transition-colors duration-150 z-10 font-medium",
              isSelected ? "text-label font-semibold" : "text-label-secondary hover:text-label"
            )}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-pill"
                className="absolute inset-0 rounded-apple-sm bg-surface shadow-sm border border-separator/60 -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.icon ? <option.icon className="h-3.5 w-3.5" /> : null}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
