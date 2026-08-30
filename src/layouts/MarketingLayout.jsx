import { Outlet } from "react-router-dom";
import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";

export function MarketingLayout() {
  return (
    <div className="min-h-screen bg-app text-label flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
