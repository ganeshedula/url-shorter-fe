import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function VerifyEmailPage() {
  usePageTitle("Verify Email");

  return (
    <Card className="w-full max-w-lg text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Email verification</p>
      <h1 className="mt-4 text-3xl">Verification flow placeholder</h1>
      <p className="mt-4">
        The UI is ready, but the backend currently has no email verification endpoint. Once one exists, this page can be wired in without reshaping the design system.
      </p>
      <Button className="mt-8 w-full" onClick={() => toast("Email verification endpoint is not available in the current backend.")}>
        Resend verification email
      </Button>
    </Card>
  );
}
