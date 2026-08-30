import { useState, useEffect } from "react";
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
import { cn } from "../../utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Outer fixed header positioning */}
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            width: isScrolled ? "min(1024px, calc(100% - 1.5rem))" : "100%",
            marginTop: isScrolled ? 12 : 0,
            borderRadius: isScrolled ? 9999 : 0,
            borderTopWidth: isScrolled ? 1 : 0,
            borderRightWidth: isScrolled ? 1 : 0,
            borderBottomWidth: 1,
            borderLeftWidth: isScrolled ? 1 : 0,
            boxShadow: isScrolled
              ? "0 20px 45px -10px rgba(0, 0, 0, 0.35), 0 6px 16px rgba(0, 0, 0, 0.15)"
              : "0 1px 0 0 transparent",
            backgroundColor: isScrolled
              ? "var(--navbar-glass-scrolled)"
              : "var(--navbar-glass-top)",
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "relative pointer-events-auto overflow-hidden transition-colors duration-300",
            "border-separator/80 dark:border-white/10"
          )}
          style={{
            backdropFilter: isScrolled
              ? "blur(28px) saturate(190%) contrast(105%) brightness(106%)"
              : "blur(20px) saturate(180%)",
            WebkitBackdropFilter: isScrolled
              ? "blur(28px) saturate(190%) contrast(105%) brightness(106%)"
              : "blur(20px) saturate(180%)",
          }}
        >
          {/* Glass Lens Curved Specular Highlight & Refraction Rim */}
          <motion.div
            initial={false}
            animate={{
              opacity: isScrolled ? 1 : 0,
              borderRadius: isScrolled ? 9999 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/[0.03] to-transparent dark:from-white/10 dark:via-white/[0.01]"
          />
          <motion.div
            initial={false}
            animate={{
              opacity: isScrolled ? 1 : 0,
              borderRadius: isScrolled ? 9999 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.25)] dark:shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.2),inset_0_-1px_1px_0_rgba(0,0,0,0.5)]"
          />

          {/* Navigation Bar Content Container */}
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-400 ease-out",
              isScrolled
                ? "h-12 sm:h-13 px-4 sm:px-6 w-full"
                : "h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
            )}
          >
            {/* Logo */}
            <Link to="/" aria-label="Nexly home" className="shrink-0">
              <Logo />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex">
              {marketingNav.map((item) =>
                item.disabled ? (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-label-tertiary select-none"
                  >
                    {item.label}
                    {item.badge ? <Badge>{item.badge}</Badge> : null}
                  </span>
                ) : item.href.startsWith("/") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-label-secondary transition-colors hover:text-label hover:bg-surface-secondary/80"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium text-label-secondary transition-colors hover:text-label hover:bg-surface-secondary/80"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              {isAuthenticated ? (
                <Link to="/app/dashboard" className="flex items-center gap-2">
                  <Button size="sm" className="rounded-full px-4">
                    Dashboard
                  </Button>
                  <Avatar name={user?.username || user?.email} size="sm" />
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="rounded-full px-3.5">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="rounded-full px-4">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 md:hidden">
              <ThemeToggle />
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-label-secondary hover:text-label hover:bg-surface-secondary active:scale-95 transition-all"
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
              >
                <FiMenu size={19} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Spacer to prevent content jump behind fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile Drawer */}
      <Drawer open={open} onClose={() => setOpen(false)} side="right">
        <div className="flex items-center justify-between border-b border-separator pb-3">
          <Logo />
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-label-secondary hover:text-label"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <FiX size={16} />
          </button>
        </div>
        <div className="mt-6 space-y-1">
          {marketingNav.map((item) =>
            item.disabled ? (
              <div key={item.label} className="px-3 py-2 text-sm text-label-tertiary">
                {item.label}
              </div>
            ) : item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-apple-md px-3 py-2 text-sm font-medium text-label hover:bg-surface-secondary"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-apple-md px-3 py-2 text-sm font-medium text-label hover:bg-surface-secondary"
              >
                {item.label}
              </a>
            )
          )}
        </div>
        <div className="mt-8 pt-4 border-t border-separator grid gap-2">
          {isAuthenticated ? (
            <Link to="/app/dashboard" onClick={() => setOpen(false)}>
              <Button className="w-full" size="md">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="secondary" className="w-full" size="md">
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full" size="md">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}
