import { useState } from "react";
import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ForgotPasswordPage() {
  usePageTitle("Forgot Password");
  const [notice, setNotice] = useState("");

  const handleRequest = () => {
    const msg = "Backend recovery endpoint is not available yet in the current version.";
    setNotice(msg);
    toast(msg, { icon: "ℹ️" });
  };

  return (
    <Card className="w-full max-w-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Password recovery</p>
      <h1 className="mt-4 text-3xl">Reset password UI</h1>
      <p className="mt-4 text-muted">
        The current Spring Boot backend does not expose a forgot-password endpoint yet, so this page provides a polished UI preview.
      </p>

      {notice ? (
        <div className="mt-6">
          <Alert variant="info" dismissible onClose={() => setNotice("")}>
            {notice}
          </Alert>
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        <Input id="forgot-email" label="Email" placeholder="you@company.com" icon={FiMail} />
        <Button onClick={handleRequest} className="w-full">
          Request reset link
        </Button>
      </div>
    </Card>
  );
}
