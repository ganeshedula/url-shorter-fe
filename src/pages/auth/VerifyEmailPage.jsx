import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function VerifyEmailPage() {
  usePageTitle("Email Verification — Nexly");
  const [notice, setNotice] = useState("");

  const handleResend = () => {
    const msg = "Email verification service will be enabled in an upcoming release.";
    setNotice(msg);
    toast(msg);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 text-center shadow-apple-elevated">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-system-blue/10 text-system-blue">
          <FiMail size={22} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-label">Verify Your Email</h1>
        <p className="mt-1 text-xs sm:text-sm text-label-secondary">
          We've sent a verification link to your registered email address.
        </p>

        {notice && (
          <div className="mt-4 text-left">
            <Alert variant="info" dismissible onClose={() => setNotice("")}>
              {notice}
            </Alert>
          </div>
        )}

        <Button className="mt-5 w-full h-11" size="lg" onClick={handleResend}>
          Resend Verification Email
        </Button>

        <div className="mt-6 pt-4 text-center text-xs border-t border-separator/60">
          <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-system-blue hover:underline">
            <FiArrowLeft size={13} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
