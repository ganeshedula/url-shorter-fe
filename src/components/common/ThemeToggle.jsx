import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="secondary"
      size="sm"
      className="w-11 px-0"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
    </Button>
  );
}
