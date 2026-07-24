import { cn } from "../../utils/cn";

export function Avatar({ name = "User", className }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-sm font-bold text-white shadow-soft",
        className
      )}
      aria-label={name}
    >
      {initials || "U"}
    </div>
  );
}
