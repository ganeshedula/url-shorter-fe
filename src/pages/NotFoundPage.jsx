import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page Not Found — 404");
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-4">
      <Card className="w-full max-w-md text-center p-8 shadow-apple-elevated">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary text-label-secondary">
          <FiCompass size={28} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-label-tertiary">404 Error</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">Page Not Found</h1>
        <p className="mt-1 text-xs sm:text-sm text-label-secondary">
          The link you followed doesn't exist or has moved.
        </p>
        <div className="mt-6 flex justify-center gap-2.5">
          <Link to="/">
            <Button variant="secondary" size="md">
              Home
            </Button>
          </Link>
          <Link to="/app/dashboard">
            <Button size="md">Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
