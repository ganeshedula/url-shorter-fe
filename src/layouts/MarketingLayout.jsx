import { Outlet } from "react-router-dom";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";

export function MarketingLayout() {
  return (
    <div className="relative overflow-x-hidden pb-10">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
