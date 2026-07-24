import { NavLink } from "react-router-dom";
import { dashboardNav } from "../../constants/navigation";
import { cn } from "../../utils/cn";
import { Logo } from "./Logo";

export function Sidebar({ compact = false }) {
  return (
    <aside className={cn("glass-panel rounded-[32px] p-4", compact && "rounded-[28px]")}>
      <div className="px-2 py-3">
        <Logo />
      </div>
      <nav className="mt-8 space-y-2">
        {dashboardNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                  isActive ? "bg-primary text-white shadow-soft" : "text-muted hover:bg-primary/10 hover:text-text"
                )
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
