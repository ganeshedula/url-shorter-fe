import { FiCompass } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="The link you followed doesn't exist or has moved."
      pageTitle="Page Not Found — 404"
      icon={FiCompass}
      accentColor="system-gray"
      actions={[
        { label: "Home", to: "/", variant: "secondary" },
        { label: "Dashboard", to: "/app/dashboard", variant: "primary" },
      ]}
    />
  );
}
