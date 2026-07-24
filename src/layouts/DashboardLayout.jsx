import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Drawer } from "../components/common/Drawer";
import { Button } from "../components/common/Button";
import { DashboardTopbar } from "../components/layouts/DashboardTopbar";
import { Sidebar } from "../components/layouts/Sidebar";

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-app px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="space-y-4">
          <div className="flex lg:hidden">
            <Button variant="secondary" onClick={() => setMobileNavOpen(true)}>
              Open menu
            </Button>
          </div>
          <DashboardTopbar
            search={search}
            onSearchChange={(event) => setSearch(event.target.value)}
          />
          <Outlet context={{ globalSearch: search }} />
        </div>
      </div>
      <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <Sidebar compact />
      </Drawer>
    </div>
  );
}
