import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  usePageTitle("Sign In — Nexly");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isBusy } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await login(values);
      navigate(location.state?.from || "/app/dashboard", { replace: true });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Invalid email or password.";
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 shadow-apple-elevated">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-label">Sign In</h1>
          <p className="mt-1 text-xs sm:text-sm text-label-secondary">
            Use your Nexly account credentials to continue.
          </p>
        </div>

        {serverError && (
          <div className="mb-4">
            <Alert variant="danger" dismissible onClose={() => setServerError("")}>
              {serverError}
            </Alert>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="login-email"
            label="Email"
            placeholder="name@example.com"
            icon={FiMail}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="login-password"
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={FiLock}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-label-secondary">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded-apple-sm border-separator accent-system-blue"
                {...register("remember")}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="font-medium text-system-blue hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-11" size="lg" disabled={isBusy}>
            {isBusy ? (
              "Signing in..."
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight size={15} />
              </>
            )}
          </Button>

          <div className="pt-4 text-center text-xs text-label-secondary border-t border-separator/60">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-system-blue hover:underline">
              Create one now
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
