import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ResetPasswordPage() {
  usePageTitle("Reset Password");

  return (
    <Card className="w-full max-w-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Reset password</p>
      <h1 className="mt-4 text-3xl">Waiting for API support</h1>
      <p className="mt-4">
        This UI is in place so the product feels complete, but it intentionally avoids fake API calls because the backend does not currently support password reset tokens.
      </p>
      <div className="mt-8 space-y-4">
        <Input id="reset-password" label="New password" type="password" placeholder="Enter a new password" />
        <Input id="reset-confirm-password" label="Confirm password" type="password" placeholder="Confirm the new password" />
        <Button onClick={() => toast("Reset password endpoint is not available in the current backend.")} className="w-full">
          Update password
        </Button>
      </div>
    </Card>
  );
}
