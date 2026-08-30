import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ForgotPasswordPage() {
  usePageTitle("Password Recovery — Nexly");
  const [notice, setNotice] = useState("");

  const handleRequest = () => {
    const msg = "Password reset recovery will be enabled in an upcoming release.";
    setNotice(msg);
    toast(msg);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 shadow-apple-elevated">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-label">Password Recovery</h1>
          <p className="mt-1 text-xs sm:text-sm text-label-secondary">
            Enter your email to receive recovery instructions.
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
          <Input id="forgot-email" label="Email" placeholder="name@example.com" icon={FiMail} />
          <Button onClick={handleRequest} className="w-full h-11" size="lg">
            Send Reset Link
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
