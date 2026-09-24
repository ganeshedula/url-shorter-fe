import { FiWifiOff } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function OfflinePage() {
  return (
    <ErrorPage
      code="—"
      title="You're Offline"
      description="Please check your internet connection and try again."
      pageTitle="Offline"
      icon={FiWifiOff}
      accentColor="system-gray"
      actions={[
        { label: "Reconnect", onClick: () => window.location.reload(), variant: "primary" },
      ]}
    />
  );
}
