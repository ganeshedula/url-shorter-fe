import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ResetPasswordPage() {
  usePageTitle("Reset Password — Nexly");
  const [notice, setNotice] = useState("");

  const handleUpdate = () => {
    const msg = "Password reset verification will be enabled in an upcoming release.";
    setNotice(msg);
    toast(msg);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 shadow-apple-elevated">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-label">Set New Password</h1>
          <p className="mt-1 text-xs sm:text-sm text-label-secondary">
            Choose a strong password to protect your account.
          </p>
        </div>

        {notice && (
          <div className="mb-4">
            <Alert variant="info" dismissible onClose={() => setNotice("")}>
              {notice}
            </Alert>
          </div>
        )}

        <div className="space-y-4">
          <Input id="reset-password" label="New Password" type="password" placeholder="Enter new password" icon={FiLock} />
          <Input id="reset-confirm-password" label="Confirm Password" type="password" placeholder="Confirm new password" icon={FiLock} />
          <Button onClick={handleUpdate} className="w-full h-11" size="lg">
            Update Password
          </Button>

          <div className="pt-4 text-center text-xs border-t border-separator/60">
            <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-system-blue hover:underline">
              <FiArrowLeft size={13} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
