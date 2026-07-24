import { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { marketingNav } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../common/Avatar";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Drawer } from "../common/Drawer";
import { ThemeToggle } from "../common/ThemeToggle";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-4 z-40 section-shell"
      >
        <div className="glass-panel flex items-center justify-between rounded-[28px] px-5 py-4">
          <Link to="/" aria-label="Nexly home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {marketingNav.map((item) =>
              item.disabled ? (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-muted"
                >
                  {item.label}
                  {item.badge ? <Badge>{item.badge}</Badge> : null}
                </span>
              ) : item.href.startsWith("/") ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="focus-ring rounded-2xl px-4 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="focus-ring rounded-2xl px-4 py-2 text-sm font-semibold text-muted transition-colors duration-200 hover:text-text"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/app/dashboard" className="flex items-center gap-3">
                <Avatar name={user?.username || user?.email} />
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Button variant="secondary" size="sm" className="w-11 px-0" onClick={() => setOpen(true)}>
              <FiMenu />
            </Button>
          </div>
        </div>
      </motion.header>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="sm" className="w-10 px-0" onClick={() => setOpen(false)}>
            <FiX />
          </Button>
        </div>
        <div className="mt-8 space-y-2">
          {marketingNav.map((item) =>
            item.disabled ? (
              <div key={item.label} className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted">
                {item.label}
              </div>
            ) : item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-primary/10"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-primary/10"
              >
                {item.label}
              </a>
            )
          )}
        </div>
        <div className="mt-8 grid gap-3">
          {isAuthenticated ? (
            <Link to="/app/dashboard" onClick={() => setOpen(false)}>
              <Button className="w-full">Open dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full">Register</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}
