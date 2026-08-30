import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import { usePageTitle } from "../../hooks/usePageTitle";
import { formatDate } from "../../utils/formatters";

export default function SettingsPage() {
  usePageTitle("Settings — Nexly");
  const navigate = useNavigate();
  const { user, logoutAll } = useAuth();

  const handleLogoutAll = async () => {
    try {
      await logoutAll();
      toast.success("All sessions terminated");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log out all sessions.");
    }
  };

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div>
        <Breadcrumb items={[{ label: "Workspace" }, { label: "Settings" }]} />
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">Settings</h1>
      </div>

      {/* Account Profile Group */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-label-secondary px-1">
          Account Profile
        </h2>
        <Card className="p-0 overflow-hidden divide-y divide-separator">
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm">
            <span className="font-medium text-label-secondary">Username</span>
            <span className="font-semibold text-label">{user?.username || "Not set"}</span>
          </div>
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm">
            <span className="font-medium text-label-secondary">Email</span>
            <span className="font-semibold text-label">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm">
            <span className="font-medium text-label-secondary">Role</span>
            <span className="font-semibold text-label">{user?.role || "USER"}</span>
          </div>
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm">
            <span className="font-medium text-label-secondary">Member Since</span>
            <span className="font-semibold text-label">{formatDate(user?.createdAt)}</span>
          </div>
        </Card>
      </div>

      {/* Preferences Group */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-label-secondary px-1">
          Preferences
        </h2>
        <Card className="p-0 overflow-hidden divide-y divide-separator">
          <div className="flex items-center justify-between p-4 text-xs sm:text-sm">
            <div>
              <p className="font-medium text-label">Appearance</p>
              <p className="text-xs text-label-secondary mt-0.5">Toggle between light and dark mode</p>
            </div>
            <ThemeToggle />
          </div>
        </Card>
      </div>

      {/* Security & Sessions Group */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-label-secondary px-1">
          Security & Sessions
        </h2>
        <Card className="p-4 space-y-3 border-system-red/20 bg-system-red/5">
          <div>
            <p className="text-sm font-semibold text-label">Terminate All Sessions</p>
            <p className="text-xs text-label-secondary mt-0.5">
              Signs out of every device using your refresh token credentials.
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={handleLogoutAll}>
            Log out of all devices
          </Button>
        </Card>
      </div>
    </div>
  );
}
