import { Link, Outlet } from "react-router-dom";
import { Logo } from "../components/layouts/Logo";
import { ThemeToggle } from "../components/common/ThemeToggle";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-app text-label flex flex-col justify-between p-4 sm:p-6">
      <header className="flex items-center justify-between w-full max-w-5xl mx-auto py-2">
        <Link to="/" aria-label="Nexly home">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex items-center justify-center py-8">
        <Outlet />
      </main>

      <footer className="py-4 text-center text-xs text-label-tertiary">
        <p>© {new Date().getFullYear()} Nexly. All rights reserved.</p>
      </footer>
    </div>
  );
}
