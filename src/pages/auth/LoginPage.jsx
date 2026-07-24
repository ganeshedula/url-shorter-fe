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
import { usePageTitle } from "../../hooks/usePageTitle";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export default function LoginPage() {
  usePageTitle("Login");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isBusy } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate(location.state?.from || "/app/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_520px]">
      <Card className="hidden min-h-[680px] lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Welcome back</p>
          <h1 className="mt-5 text-5xl">Your links, analytics, and sessions in one calm workspace.</h1>
          <p className="mt-5 max-w-lg text-lg">
            Sign in with the existing backend credentials and continue managing URLs without changing any API behavior.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Shorten faster", "Monitor activity", "Stay secure", "Switch themes"].map((item) => (
            <div key={item} className="rounded-[24px] border border-border bg-surface-alt/40 p-4 text-sm font-semibold text-text">
              {item}
            </div>
          ))}
        </div>
      </Card>

      <Card className="mx-auto w-full max-w-[520px]">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Login</p>
          <h2 className="mt-3 text-3xl">Access your dashboard</h2>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="login-email"
            label="Email"
            placeholder="you@company.com"
            icon={FiMail}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="login-password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={FiLock}
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="flex items-center gap-2 font-medium text-text">
              <input type="checkbox" className="h-4 w-4 rounded border-border" {...register("remember")} />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={isBusy}>
            {isBusy ? "Signing in..." : "Sign in"}
            <FiArrowRight />
          </Button>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" type="button">Google placeholder</Button>
            <Button variant="secondary" type="button">GitHub placeholder</Button>
          </div>
          <p className="text-center text-sm">
            New here?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
