import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Input } from "../../components/common/Input";
import { Alert } from "../../components/common/Alert";
import { usePageTitle } from "../../hooks/usePageTitle";
import { getPasswordStrength } from "../../utils/passwordStrength";

const schema = z.object({
  username: z.string().max(100, "Username can be at most 100 characters").optional(),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterPage() {
  usePageTitle("Create Account — Nexly");
  const navigate = useNavigate();
  const { register: signUp, isBusy } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const passwordStrength = getPasswordStrength(watch("password"));

  const onSubmit = async (values) => {
    setServerError("");
    try {
      await signUp(values);
      sessionStorage.setItem("nexly_verification_email", values.email.trim().toLowerCase());
      navigate("/verify-email", { replace: true });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Unable to create your account.";
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="p-6 sm:p-8 shadow-apple-elevated">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-label">Create Account</h1>
          <p className="mt-1 text-xs sm:text-sm text-label-secondary">
            Get started with your free Nexly link workspace.
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
            id="register-username"
            label="Name (Optional)"
            placeholder="Jane Appleseed"
            icon={FiUser}
            error={errors.username?.message}
            {...register("username")}
          />

          <Input
            id="register-email"
            label="Email"
            placeholder="name@example.com"
            icon={FiMail}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="space-y-1.5">
            <Input
              id="register-password"
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              icon={FiLock}
              error={errors.password?.message}
              {...register("password")}
            />

            {watch("password") && (
              <div className="space-y-1 pt-1">
                <div className="h-1 w-full rounded-full bg-surface-secondary overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.width} ${passwordStrength.color} transition-all duration-300`}
                  />
                </div>
                <p className="text-[11px] text-label-secondary">
                  Strength: <span className="font-semibold text-label">{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-11" size="lg" disabled={isBusy}>
            {isBusy ? (
              "Creating account..."
            ) : (
              <>
                <span>Create Account</span>
                <FiArrowRight size={15} />
              </>
            )}
          </Button>

          <div className="pt-4 text-center text-xs text-label-secondary border-t border-separator/60">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-system-blue hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
