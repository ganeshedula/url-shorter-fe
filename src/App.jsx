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

      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!rounded-2xl !border !border-border !bg-surface !px-4 !py-3 !text-sm !font-medium !text-app shadow-soft",
        }}
      />
    </>
  );
}
