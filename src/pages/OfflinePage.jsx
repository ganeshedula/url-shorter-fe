import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { usePageTitle } from "../hooks/usePageTitle";

export default function OfflinePage() {
  usePageTitle("Offline");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Offline</p>
        <h1 className="mt-4 text-4xl">Connection lost for the moment.</h1>
        <p className="mt-4">Reconnect to keep creating links and viewing live analytics.</p>
        <Button className="mt-8" onClick={() => window.location.reload()}>
          Retry connection
        </Button>
      </Card>
    </div>
  );
}
