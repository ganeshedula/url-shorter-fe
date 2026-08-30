import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DashboardTopbar } from "../components/layouts/DashboardTopbar";
import { Sidebar } from "../components/layouts/Sidebar";
import { dashboardNav } from "../constants/navigation";
import { cn } from "../utils/cn";

export function DashboardLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-screen bg-app text-label w-full max-w-full overflow-x-hidden">
      {/* Desktop macOS/iPadOS Sidebar */}
      <div className="hidden lg:block lg:sticky lg:top-0 lg:h-screen lg:shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 pb-28 lg:pb-8 w-full max-w-full overflow-x-hidden">
        <DashboardTopbar
          search={search}
          onSearchChange={(event) => setSearch(event.target.value)}
        />
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto box-border overflow-x-hidden">
          <Outlet context={{ globalSearch: search }} />
        </main>
      </div>

      {/* Mobile iOS Bottom Tab Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 border-t border-separator bg-surface/90 backdrop-blur-apple lg:hidden pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex h-16 items-center justify-around px-2">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center justify-center flex-1 h-full py-1 text-[11px] font-medium transition-colors select-none",
                    isActive
                      ? "text-system-blue font-semibold"
                      : "text-label-tertiary hover:text-label"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-[1.75]"} />
                    <span className="mt-1 leading-none">{item.label}</span>
                    {isActive && (
                      <span className="mt-1 h-1 w-1 rounded-full bg-system-blue" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
