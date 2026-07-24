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
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterPage() {
  usePageTitle("Register");
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
      navigate("/app/dashboard", { replace: true });
    } catch (error) {
      const errMsg = error.response?.data?.message || "Unable to create your account. Please try again.";
      setServerError(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[520px_1fr]">
      <Card className="mx-auto w-full max-w-[520px]">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Register</p>
          <h2 className="mt-3 text-3xl">Create your premium workspace</h2>
        </div>
        {serverError ? (
          <div className="mb-5">
            <Alert variant="danger" dismissible onClose={() => setServerError("")}>
              {serverError}
            </Alert>
          </div>
        ) : null}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="register-username"
            label="Username"
            placeholder="Ganesh"
            icon={FiUser}
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            id="register-email"
            label="Email"
            placeholder="you@company.com"
            icon={FiMail}
            error={errors.email?.message}
            {...register("email")}
          />
          <div className="space-y-2">
            <Input
              id="register-password"
              label="Password"
              type="password"
              placeholder="Create a secure password"
              icon={FiLock}
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="h-2 overflow-hidden rounded-full bg-slate-300/20">
              <div className={`h-2 ${passwordStrength.width} ${passwordStrength.color} rounded-full transition-all duration-300`} />
            </div>
            <p className="text-sm">
              Password strength: <span className="font-semibold text-text">{passwordStrength.label}</span>
            </p>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isBusy}>
            {isBusy ? "Creating account..." : "Create account"}
            <FiArrowRight />
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Card>

      <Card className="hidden min-h-[680px] lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">Why teams upgrade the experience</p>
          <h1 className="mt-5 text-5xl">A cleaner surface for the backend you already trust.</h1>
          <p className="mt-5 max-w-lg text-lg">
            This redesign keeps API compatibility intact while modernizing every major interaction around auth, management, analytics, and settings.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["Responsive", "Accessible", "Extensible"].map((item) => (
            <div key={item} className="rounded-[24px] border border-border bg-surface-alt/40 p-4 text-sm font-semibold text-text">
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
