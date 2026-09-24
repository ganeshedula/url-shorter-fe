import { FiClock } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function UrlExpiredPage() {
  return (
    <ErrorPage
      code="410"
      title="Link Expired"
      description="This short URL has passed its expiration date and is no longer available. The owner may create a new link."
      pageTitle="Link Expired — 410"
      icon={FiClock}
      accentColor="system-purple"
      actions={[
        { label: "Back to Home", to: "/", variant: "secondary" },
        { label: "Create a Link", to: "/app/urls", variant: "primary" },
      ]}
    />
  );
}
