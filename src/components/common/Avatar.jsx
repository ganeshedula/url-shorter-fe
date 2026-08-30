import { cn } from "../../utils/cn";

export function Avatar({ name = "User", className, size = "md" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-8 w-8 text-xs font-semibold",
    lg: "h-10 w-10 text-sm font-semibold",
    xl: "h-14 w-14 text-lg font-bold",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-system-blue text-white select-none shadow-sm",
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      aria-label={name}
    >
      {initials || "U"}
    </div>
  );
}
