import { Link } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ServerErrorPage() {
  usePageTitle("500");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-danger">500</p>
        <h1 className="mt-4 text-4xl">The server had a rough moment.</h1>
        <p className="mt-4">Your frontend is ready, but the backend may need a quick health check.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/">
            <Button variant="secondary">Back home</Button>
          </Link>
          <Link to="/app/dashboard">
            <Button>Retry workspace</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
