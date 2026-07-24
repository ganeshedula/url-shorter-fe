import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-app">
      <div className="pointer-events-none absolute inset-0 bg-aurora" />
      <div className="pointer-events-none absolute left-[-5rem] top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-2rem] h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}
