import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-separator bg-surface/40 pb-12 pt-10 text-xs text-label-secondary">
      <div className="section-shell">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-2">
            <span className="text-sm font-semibold text-label">Nexly</span>
            <p className="max-w-xs text-xs text-label-secondary leading-relaxed">
              Designed for speed, clarity, and native feel across all devices.
            </p>
          </div>
          <div>
            <p className="font-semibold text-label">Product</p>
            <div className="mt-3 space-y-2">
              <a href="#features" className="block hover:text-label transition-colors">
                Features
              </a>
              <a href="#preview" className="block hover:text-label transition-colors">
                Control Center
              </a>
              <a href="#faq" className="block hover:text-label transition-colors">
                FAQ
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-label">Workspace</p>
            <div className="mt-3 space-y-2">
              <Link to="/login" className="block hover:text-label transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="block hover:text-label transition-colors">
                Create Account
              </Link>
              <Link to="/app/dashboard" className="block hover:text-label transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-label">Legal</p>
            <div className="mt-3 space-y-2 text-label-tertiary">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>© {new Date().getFullYear()} Nexly Inc.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
