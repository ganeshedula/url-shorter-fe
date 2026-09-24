import { FiServer } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function ServerErrorPage() {
  return (
    <ErrorPage
      code="500"
      title="Server Interruption"
      description="Something unexpected went wrong on our end. Please try again in a moment."
      pageTitle="Server Error — 500"
      icon={FiServer}
      accentColor="system-red"
      actions={[
        { label: "Home", to: "/", variant: "secondary" },
        { label: "Retry Dashboard", to: "/app/dashboard", variant: "primary" },
      ]}
    />
  );
}
