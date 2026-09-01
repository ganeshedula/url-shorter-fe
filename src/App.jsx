import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { MarketingLayout } from "./layouts/MarketingLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { LoaderScreen } from "./components/common/LoaderScreen";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const GoogleCallbackPage = lazy(() => import("./pages/auth/GoogleCallbackPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const VerifyEmailPage = lazy(() => import("./pages/auth/VerifyEmailPage"));
const DashboardOverviewPage = lazy(() => import("./pages/dashboard/DashboardOverviewPage"));
const UrlsPage = lazy(() => import("./pages/dashboard/UrlsPage"));
const AnalyticsPage = lazy(() => import("./pages/dashboard/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ServerErrorPage = lazy(() => import("./pages/ServerErrorPage"));
const OfflinePage = lazy(() => import("./pages/OfflinePage"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoaderScreen />}>
          <Routes>
            <Route element={<MarketingLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Route>

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardOverviewPage />} />
              <Route path="urls" element={<UrlsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/offline" element={<OfflinePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {/* Apple Capsule Dynamic Island Toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--color-surface)",
            color: "var(--color-label-primary)",
            border: "1px solid var(--color-separator)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.18)",
            borderRadius: "9999px",
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 500,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99999,
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#34C759",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#FF3B30",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  );
}
