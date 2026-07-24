import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("404");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">404</p>
        <h1 className="mt-4 text-4xl">That page slipped out of the product map.</h1>
        <p className="mt-4">Try heading back to the landing page or the dashboard.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/">
            <Button variant="secondary">Go home</Button>
          </Link>
          <Link to="/app/dashboard">
            <Button>Open dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
