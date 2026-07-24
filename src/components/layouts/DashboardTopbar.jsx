import { FiBell, FiLogOut, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { ThemeToggle } from "../common/ThemeToggle";

export function DashboardTopbar({ search, onSearchChange }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("You have been signed out.");
    navigate("/login");
  };

  return (
    <div className="glass-panel flex flex-col gap-4 rounded-[28px] p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full max-w-md">
        <Input
          id="dashboard-search"
          aria-label="Search links"
          placeholder="Search links, analytics, or activity"
          icon={FiSearch}
          value={search}
          onChange={onSearchChange}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" size="sm" className="w-11 px-0" aria-label="Notifications">
          <FiBell />
        </Button>
        <ThemeToggle />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-text">{user?.username || "Workspace Owner"}</p>
          <p className="text-xs text-muted">{user?.email}</p>
        </div>
        <Avatar name={user?.username || user?.email} />
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </Button>
      </div>
    </div>
  );
}
