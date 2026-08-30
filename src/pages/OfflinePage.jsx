import { FiWifiOff } from "react-icons/fi";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";
import { usePageTitle } from "../hooks/usePageTitle";

export default function OfflinePage() {
  usePageTitle("Offline — Nexly");
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-4">
      <Card className="w-full max-w-md text-center p-8 shadow-apple-elevated">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary text-label-secondary">
          <FiWifiOff size={28} />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-label-tertiary">Network Status</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">You're Offline</h1>
        <p className="mt-1 text-xs sm:text-sm text-label-secondary">
          Please check your internet connection and try again.
        </p>
        <div className="mt-6 flex justify-center">
          <Button size="md" onClick={() => window.location.reload()}>
            Reconnect
          </Button>
        </div>
      </Card>
    </div>
  );
}
