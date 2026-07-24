import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
