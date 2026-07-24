import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ResetPasswordPage() {
  usePageTitle("Reset Password");
  const [notice, setNotice] = useState("");

  const handleUpdate = () => {
    const msg = "Reset password endpoint is not available in the current backend.";
    setNotice(msg);
    toast(msg, { icon: "ℹ️" });
  };

  return (
    <Card className="w-full max-w-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Reset password</p>
      <h1 className="mt-4 text-3xl">Reset password</h1>
      <p className="mt-4 text-muted">
        This UI is ready, but password reset token endpoints are not supported by the backend yet.
      </p>

      {notice ? (
        <div className="mt-6">
          <Alert variant="info" dismissible onClose={() => setNotice("")}>
            {notice}
          </Alert>
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        <Input id="reset-password" label="New password" type="password" placeholder="Enter a new password" />
        <Input id="reset-confirm-password" label="Confirm password" type="password" placeholder="Confirm the new password" />
        <Button onClick={handleUpdate} className="w-full">
          Update password
        </Button>
      </div>
    </Card>
  );
}
