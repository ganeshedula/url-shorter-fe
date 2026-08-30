import { FiLogOut, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../common/Avatar";
import { ThemeToggle } from "../common/ThemeToggle";

export function DashboardTopbar({ search, onSearchChange }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2.5 border-b border-separator bg-surface/85 px-4 py-3 backdrop-blur-apple sm:px-6 w-full max-w-full box-border">
      <div className="flex-1 max-w-xs sm:max-w-sm">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 text-label-tertiary pointer-events-none" size={15} />
          <input
            id="dashboard-search"
            aria-label="Search links"
            placeholder="Search links..."
            value={search}
            onChange={onSearchChange}
            className="h-9 w-full rounded-full border border-separator bg-surface-secondary/70 pl-8 pr-3 text-xs sm:text-sm text-label placeholder:text-label-tertiary focus:border-system-blue focus:bg-surface focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <ThemeToggle />

        <div className="h-4 w-px bg-separator hidden sm:block" />

        <div className="flex items-center gap-2">
          <Avatar name={user?.username || user?.email} size="sm" />
          <div className="hidden text-left md:block">
            <p className="text-xs font-semibold text-label leading-tight">{user?.username || "Workspace"}</p>
            <p className="text-[11px] text-label-tertiary truncate max-w-[120px]">{user?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-secondary text-label-secondary hover:text-system-red hover:bg-system-red/10 active:scale-95 transition-all"
          title="Sign out"
          aria-label="Sign out"
        >
          <FiLogOut size={15} />
        </button>
      </div>
    </header>
  );
}
