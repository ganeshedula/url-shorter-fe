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
  usePageTitle("Settings");
  const navigate = useNavigate();
  const { user, logoutAll } = useAuth();

  const handleLogoutAll = async () => {
    try {
      await logoutAll();
      toast.success("All sessions ended.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log out all sessions.");
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Workspace" }, { label: "Settings" }]} />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <h2 className="text-2xl">Profile</h2>
          <p className="mt-2">The current backend exposes account retrieval but not profile mutation, so this section stays accurate and future-ready.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border p-4">
              <p className="text-sm font-semibold text-muted">Name</p>
              <h3 className="mt-2 text-lg">{user?.username || "Not provided"}</h3>
            </div>
            <div className="rounded-[24px] border border-border p-4">
              <p className="text-sm font-semibold text-muted">Email</p>
              <h3 className="mt-2 text-lg">{user?.email}</h3>
            </div>
            <div className="rounded-[24px] border border-border p-4">
              <p className="text-sm font-semibold text-muted">Role</p>
              <h3 className="mt-2 text-lg">{user?.role}</h3>
            </div>
            <div className="rounded-[24px] border border-border p-4">
              <p className="text-sm font-semibold text-muted">Joined</p>
              <h3 className="mt-2 text-lg">{formatDate(user?.createdAt)}</h3>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl">Preferences</h2>
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between rounded-[24px] border border-border p-4">
              <div>
                <p className="font-semibold text-text">Theme mode</p>
                <p className="mt-1 text-sm">Switch between light and dark surfaces.</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="rounded-[24px] border border-border p-4">
              <p className="font-semibold text-text">Profile updates</p>
              <p className="mt-1 text-sm">
                Update-name, change-email, and change-password panels are intentionally held until matching backend endpoints exist.
              </p>
              <Button variant="secondary" className="mt-4" onClick={() => toast("Profile update endpoints are not available yet.")}>
                View planned actions
              </Button>
            </div>

            <div className="rounded-[24px] border border-danger/25 bg-danger/5 p-4">
              <p className="font-semibold text-text">Danger zone</p>
              <p className="mt-1 text-sm">End every active session using the backend-supported logout-all endpoint.</p>
              <Button variant="danger" className="mt-4" onClick={handleLogoutAll}>
                Logout all sessions
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
