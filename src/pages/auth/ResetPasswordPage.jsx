import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { authService } from "../../services/authService";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";
import { getPasswordStrength } from "../../utils/passwordStrength";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ResetPasswordPage() {
  usePageTitle("Reset Password — Nexly");
  const navigate = useNavigate();
  const email = sessionStorage.getItem("nexly_reset_email");
  const resetToken = sessionStorage.getItem("nexly_reset_token");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const strength = getPasswordStrength(watch("password"));

  useEffect(() => {
    if (!email || !resetToken) navigate("/forgot-password", { replace: true });
  }, [email, resetToken, navigate]);

  const submit = async ({ password }) => {
    setBusy(true);
    setError("");
    try {
      await authService.resetPassword({ email, resetToken, password });
      sessionStorage.removeItem("nexly_reset_email");
      sessionStorage.removeItem("nexly_reset_token");
      // Use the platform alert so acknowledgement is required before returning to login.
      window.alert("Password updated");
      navigate("/login", { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || "Unable to reset your password.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 shadow-apple-elevated">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-label">Set new password</h1>
          <p className="mt-1 text-sm text-label-secondary">Choose a new password for your account.</p>
        </div>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(submit)}>
          <div>
            <Input
              id="reset-password"
              label="New Password"
              type="password"
              placeholder="At least 8 characters"
              icon={FiLock}
              error={errors.password?.message}
              {...register("password")}
            />
            {watch("password") && (
              <p className="mt-2 text-xs text-label-secondary">
                Password strength:{" "}
                <span className="font-semibold text-label">{strength.label}</span>
              </p>
            )}
          </div>

          <Input
            id="reset-confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Repeat new password"
            icon={FiLock}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" className="w-full h-11" size="lg" disabled={busy}>
            {busy ? "Updating password…" : "Update Password"}
          </Button>

          <div className="pt-4 text-center text-xs border-t border-separator/60">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 font-medium text-system-blue hover:underline"
            >
              <FiArrowLeft size={13} />
              Back to Sign In
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
