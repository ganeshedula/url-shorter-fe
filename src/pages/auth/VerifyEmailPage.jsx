import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { OtpCodeInput } from "../../components/auth/OtpCodeInput";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function VerifyEmailPage() {
  usePageTitle("Email Verification — Nexly");
  const { search } = useLocation();
  const navigate = useNavigate();
  const { completeGoogleLogin } = useAuth();
  const reset = new URLSearchParams(search).get("purpose") === "reset";
  const email = sessionStorage.getItem(reset ? "nexly_reset_email" : "nexly_verification_email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => { if (!email) navigate(reset ? "/forgot-password" : "/register", { replace: true }); }, [email, navigate, reset]);
  useEffect(() => { if (!seconds) return; const timer = setTimeout(() => setSeconds((n) => n - 1), 1000); return () => clearTimeout(timer); }, [seconds]);

  const verify = async () => {
    if (otp.length !== 6) return setError("Enter the six-digit code.");
    setBusy(true); setError("");
    try {
      if (reset) {
        const response = await authService.verifyResetOtp({ email, otp });
        sessionStorage.setItem("nexly_reset_token", response.data.resetToken);
        navigate("/reset-password", { replace: true });
      } else {
        const response = await authService.verifyRegistrationOtp({ email, otp });
        await completeGoogleLogin({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
        sessionStorage.removeItem("nexly_verification_email");
        navigate("/app/dashboard", { replace: true });
      }
    } catch (e) { setError(e.response?.data?.message || "That code could not be verified."); setOtp(""); } finally { setBusy(false); }
  };
  const resend = async () => {
    if (seconds || !email) return;
    setBusy(true); setError("");
    try { if (reset) await authService.forgotPassword({ email }); else await authService.resendOtp({ email }); setSeconds(60); setOtp(""); }
    catch (e) { setError(e.response?.data?.message || "Unable to resend the code."); }
    finally { setBusy(false); }
  };

  return <div className="w-full max-w-md mx-auto"><Card className="p-6 sm:p-8 shadow-apple-elevated text-center"><Link to={reset ? "/forgot-password" : "/register"} className="inline-flex w-full items-center gap-1.5 text-left text-xs font-medium text-system-blue hover:underline"><FiArrowLeft size={13} />Back</Link><div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-system-blue/10 text-system-blue"><FiMail size={22} /></div><h1 className="mt-4 text-2xl font-bold tracking-tight text-label">{reset ? "Verify your identity" : "Verify your email"}</h1><p className="mt-2 text-sm text-label-secondary">We sent a verification code to<br /><span className="font-semibold text-label">{email}</span></p>{error && <div className="mt-5 text-left"><Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert></div>}<div className="mt-6"><OtpCodeInput value={otp} onChange={setOtp} disabled={busy} /></div><Button className="mt-6 w-full h-11" size="lg" disabled={busy || otp.length !== 6} onClick={verify}>{busy ? "Verifying…" : "Verify"}</Button><p className="mt-6 text-sm text-label-secondary">Didn’t receive the code?</p><button type="button" disabled={Boolean(seconds) || busy} onClick={resend} className="mt-1 text-sm font-semibold text-system-blue disabled:text-label-tertiary">{seconds ? `Resend code in 0:${String(seconds).padStart(2, "0")}` : "Resend code"}</button></Card></div>;
}
