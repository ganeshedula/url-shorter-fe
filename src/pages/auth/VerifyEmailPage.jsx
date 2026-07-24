import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function VerifyEmailPage() {
  usePageTitle("Verify Email");
  const [notice, setNotice] = useState("");

  const handleResend = () => {
    const msg = "Email verification endpoint is not available in the current backend.";
    setNotice(msg);
    toast(msg, { icon: "ℹ️" });
  };

  return (
    <Card className="w-full max-w-lg text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Email verification</p>
      <h1 className="mt-4 text-3xl">Email verification</h1>
      <p className="mt-4 text-muted">
        The UI is ready, but the backend currently has no email verification endpoint.
      </p>

      {notice ? (
        <div className="mt-6 text-left">
          <Alert variant="info" dismissible onClose={() => setNotice("")}>
            {notice}
          </Alert>
        </div>
      ) : null}

      <Button className="mt-6 w-full" onClick={handleResend}>
        Resend verification email
      </Button>
    </Card>
  );
}
