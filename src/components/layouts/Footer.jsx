import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="section-shell pb-10 pt-16">
      <div className="glass-panel rounded-[32px] px-6 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="text-xl">Nexly</h3>
            <p className="mt-3 max-w-md">
              A premium URL shortener experience designed for teams that care about speed, clarity, and polished analytics.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Product</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="#features" className="block hover:text-text">
                Features
              </a>
              <a href="#pricing" className="block hover:text-text">
                Pricing
              </a>
              <a href="#faq" className="block hover:text-text">
                FAQ
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Company</p>
            <div className="mt-4 space-y-2 text-sm">
              <a href="#about" className="block hover:text-text">
                About
              </a>
              <Link to="/login" className="block hover:text-text">
                Login
              </Link>
              <Link to="/register" className="block hover:text-text">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
