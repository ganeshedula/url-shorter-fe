import { FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function ForgotPasswordPage() {
  usePageTitle("Forgot Password");

  return (
    <Card className="w-full max-w-lg">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Password recovery</p>
      <h1 className="mt-4 text-3xl">Reset password UI is ready for backend support.</h1>
      <p className="mt-4">
        The current Spring Boot backend does not expose a forgot-password endpoint yet, so this page is included as a polished placeholder rather than a broken form.
      </p>
      <div className="mt-8 space-y-4">
        <Input id="forgot-email" label="Email" placeholder="you@company.com" icon={FiMail} />
        <Button onClick={() => toast("Backend endpoint not available yet.")} className="w-full">
          Request reset link
        </Button>
      </div>
    </Card>
  );
}
