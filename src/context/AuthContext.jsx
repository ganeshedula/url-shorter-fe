import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";
import { tokenStorage } from "../utils/tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isBusy, setIsBusy] = useState(false);

  const hydrateUser = async () => {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) {
      setIsInitializing(false);
      return;
    }

    try {
      const response = await authService.me();
      setUser(response.data);
    } catch {
      tokenStorage.clear();
      setUser(null);
    } finally {
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    hydrateUser();

    const onExpired = () => {
      setUser(null);
      toast.error("Your session expired. Please sign in again.");
    };

    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, []);

  const persistAuth = (payload) => {
    tokenStorage.setTokens(payload);
    setUser(payload.user);
  };

  const login = async (values) => {
    setIsBusy(true);
    try {
      const response = await authService.login(values);
      persistAuth(response.data);
      toast.success("Welcome back.");
      return response.data;
    } finally {
      setIsBusy(false);
    }
  };

  const register = async (values) => {
    setIsBusy(true);
    try {
      const response = await authService.register(values);
      toast.success("Verification code sent.");
      return response.data;
    } finally {
      setIsBusy(false);
    }
  };

  const completeGoogleLogin = async ({ accessToken, refreshToken }) => {
    if (!accessToken || !refreshToken) {
      throw new Error("Google sign-in did not return a complete session.");
    }
    setIsBusy(true);
    try {
      tokenStorage.setTokens({ accessToken, refreshToken });
      const response = await authService.me();
      setUser(response.data);
      toast.success("Signed in with Google.");
    } catch (error) {
      tokenStorage.clear();
      setUser(null);
      throw error;
    } finally {
      setIsBusy(false);
    }
  };

  /**
   * Called after email OTP verification. The backend returns a full auth payload
   * (accessToken, refreshToken, user) so we can persist everything synchronously
   * without an extra /me round-trip, guaranteeing isAuthenticated is true before
   * the caller navigates to a protected route.
   */
  const completeEmailVerification = (authPayload) => {
    persistAuth(authPayload);
    toast.success("Email verified. Welcome!");
  };

  const logout = async () => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      await authService.logout({ refreshToken });
    } catch {
      // Clearing local auth state is still the safest fallback.
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  };

  const logoutAll = async () => {
    await authService.logoutAll();
    tokenStorage.clear();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isBusy,
      isInitializing,
      isAuthenticated: Boolean(user),
      login,
      register,
      completeGoogleLogin,
      completeEmailVerification,
      logout,
      logoutAll,
      refreshUser: hydrateUser,
    }),
    [user, isBusy, isInitializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
