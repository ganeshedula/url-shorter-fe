import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function GoogleCallbackPage() {
  usePageTitle("Completing sign in — Nexly");
  const navigate = useNavigate();
  const { completeGoogleLogin } = useAuth();
  const [error, setError] = useState("");
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    const oauthError = params.get("oauthError");
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    // Remove credentials from the address bar before any asynchronous request.
    window.history.replaceState(null, "", window.location.pathname);

    if (oauthError) {
      setError(oauthError === "google_sign_in_cancelled" ? "Google sign-in was cancelled." : "Google sign-in could not be completed. Please try again.");
      return;
    }

    completeGoogleLogin({ accessToken, refreshToken })
      .then(() => navigate("/app/dashboard", { replace: true }))
      .catch(() => setError("Google sign-in could not be completed. Please try again."));
  }, [completeGoogleLogin, navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-7 sm:p-8 shadow-apple-elevated text-center">
        {error ? (
          <>
            <FiAlertCircle className="mx-auto text-system-red" size={28} />
            <h1 className="mt-4 text-xl font-bold tracking-tight text-label">Unable to sign in</h1>
            <p className="mt-2 text-sm text-label-secondary">{error}</p>
            <Button className="mt-6 w-full" onClick={() => navigate("/login", { replace: true })}>Return to sign in</Button>
          </>
        ) : (
          <>
            <FiLoader className="mx-auto animate-spin text-system-blue" size={25} />
            <h1 className="mt-4 text-xl font-bold tracking-tight text-label">Signing you in</h1>
            <p className="mt-2 text-sm text-label-secondary">Securely completing your Google sign-in.</p>
          </>
        )}
      </Card>
    </div>
  );
}
