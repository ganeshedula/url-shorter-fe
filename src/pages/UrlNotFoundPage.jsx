import { FiLink2 } from "react-icons/fi";
import { ErrorPage } from "../components/common/ErrorPage";

export default function UrlNotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="URL Not Found"
      description="This short URL doesn't exist or has been deleted. It may have been removed by its owner."
      pageTitle="URL Not Found — 404"
      icon={FiLink2}
      accentColor="system-orange"
      actions={[
        { label: "Back to Home", to: "/", variant: "secondary" },
        { label: "Create a Link", to: "/app/urls", variant: "primary" },
      ]}
    />
  );
}
