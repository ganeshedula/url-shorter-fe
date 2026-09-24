import { FiAlertTriangle } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function InvalidUrlPage() {
  return (
    <ErrorPage
      code="400"
      title="Invalid URL"
      description="The requested short link format is invalid. Please check the URL and try again."
      pageTitle="Invalid URL — 400"
      icon={FiAlertTriangle}
      accentColor="system-orange"
      actions={[
        { label: "Back to Home", to: "/", variant: "secondary" },
        { label: "Dashboard", to: "/app/dashboard", variant: "primary" },
      ]}
    />
  );
}
