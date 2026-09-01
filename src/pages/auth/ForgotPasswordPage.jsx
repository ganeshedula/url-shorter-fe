import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { authService } from "../../services/authService";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

const schema = z.object({ email: z.string().email("Enter a valid email address") });

export default function ForgotPasswordPage() {
  usePageTitle("Password Recovery — Nexly");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const submit = async ({ email }) => {
    setBusy(true); setError("");
    try {
      await authService.forgotPassword({ email });
      sessionStorage.setItem("nexly_reset_email", email.trim().toLowerCase());
      navigate("/verify-email?purpose=reset");
    } catch (e) {
      setError(e.response?.data?.message || "Unable to send a code. Please try again.");
    } finally { setBusy(false); }
  };

  return <div className="w-full max-w-md mx-auto"><Card className="p-6 sm:p-8 shadow-apple-elevated"><div className="text-center mb-6"><h1 className="text-2xl font-bold tracking-tight text-label">Password Recovery</h1><p className="mt-1 text-sm text-label-secondary">Enter your email and we’ll send a verification code.</p></div>{error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}<form className="mt-4 space-y-4" onSubmit={handleSubmit(submit)}><Input id="forgot-email" label="Email" placeholder="name@example.com" icon={FiMail} error={errors.email?.message} {...register("email")} /><Button type="submit" className="w-full h-11" size="lg" disabled={busy}>{busy ? "Sending code…" : "Send verification code"}</Button><div className="pt-4 text-center text-xs border-t border-separator/60"><Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-system-blue hover:underline"><FiArrowLeft size={13} />Back to Sign In</Link></div></form></Card></div>;
}
