import { NavLink } from "react-router-dom";
import { dashboardNav } from "../../constants/navigation";
import { cn } from "../../utils/cn";
import { Logo } from "./Logo";

export function Sidebar({ compact = false }) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col justify-between border-r border-separator bg-surface/80 p-4 backdrop-blur-apple",
        compact ? "w-full" : "w-64"
      )}
    >
      <div>
        <div className="px-2 py-1.5">
          <Logo />
        </div>

        <nav className="mt-6 space-y-1">
          <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-label-tertiary">
            Workspace
          </div>
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2.5 rounded-apple-md px-3 py-2 text-sm font-medium transition-colors select-none",
                    isActive
                      ? "bg-system-blue text-white font-semibold shadow-sm"
                      : "text-label-secondary hover:bg-surface-secondary hover:text-label"
                  )
                }
              >
                <Icon size={17} className="shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="rounded-apple-lg border border-separator bg-surface-secondary/60 p-3 text-xs">
        <p className="font-semibold text-label">Nexly Workspace</p>
        <p className="mt-0.5 text-[11px] text-label-secondary">Fast, calm, reliable link routing.</p>
      </div>
    </aside>
  );
}
