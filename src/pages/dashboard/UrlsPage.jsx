import { useMemo, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { SegmentedControl } from "../../components/common/SegmentedControl";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { Modal } from "../../components/common/Modal";
import { Pagination } from "../../components/common/Pagination";
import { Skeleton } from "../../components/common/Skeleton";
import { UrlFormCard } from "../../components/url/UrlFormCard";
import { UrlTable } from "../../components/url/UrlTable";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { usePageTitle } from "../../hooks/usePageTitle";
import { useUrlLibrary } from "../../hooks/useUrlLibrary";
import { urlService } from "../../services/urlService";
import { isUrlExpired } from "../../utils/formatters";

export default function UrlsPage() {
  usePageTitle("My URLs — Nexly");
  const { globalSearch } = useOutletContext();
  const debouncedSearch = useDebouncedValue(globalSearch);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [deletingUrl, setDeletingUrl] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);

  const params = useMemo(
    () => ({
      page,
      size: 10,
      sortBy: "createdAt",
      direction,
      search: debouncedSearch,
    }),
    [page, direction, debouncedSearch]
  );

  const { data, loading, error, fetchUrls } = useUrlLibrary(params);

  const filteredItems = useMemo(() => {
    if (statusFilter === "all") {
      return data.content;
    }
    return data.content.filter((item) => {
      const expired = item.expirationDate && isUrlExpired(item.expirationDate);
      if (statusFilter === "active") {
        return item.active && !expired;
      }
      if (statusFilter === "inactive") {
        return !item.active || expired;
      }
      return true;
    });
  }, [data.content, statusFilter]);

  const refresh = () => fetchUrls(params).catch(() => {});

  const handleCreate = async (payload) => {
    setSaving(true);
    try {
      await urlService.create(payload);
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create URL.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (payload) => {
    setSaving(true);
    try {
      await urlService.update(editingUrl.id, {
        url: payload.url,
        expirationDate: payload.expirationDate,
        active: editingUrl.active,
      });
      toast.success("Link updated");
      setEditingUrl(null);
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update URL.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await urlService.remove(deletingUrl.id);
      toast.success("Link deleted");
      setDeletingUrl(null);
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete URL.");
    }
  };

  const handleCopy = async (shortUrl) => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard");
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-44" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description="We couldn't load your URL library." onRetry={refresh} />;
  }

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <Breadcrumb items={[{ label: "Workspace" }, { label: "My URLs" }]} />
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">Link Management</h1>
      </div>

      {/* Create Link Card */}
      <div className="relative z-20">
        <UrlFormCard onSubmit={handleCreate} loading={saving} />
      </div>

      {/* URL List & Filter Section */}
      <Card className="p-4 sm:p-6 space-y-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-separator/60 pb-3">
          <div>
            <h2 className="text-base font-semibold text-label tracking-tight">Your Links</h2>
            <p className="text-xs text-label-secondary">
              {filteredItems.length} {filteredItems.length === 1 ? "link" : "links"} in current view
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SegmentedControl
              options={filterOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDirection((current) => (current === "desc" ? "asc" : "desc"))}
              className="h-8 text-xs"
            >
              {direction === "desc" ? <FiArrowDown size={13} /> : <FiArrowUp size={13} />}
              <span>{direction === "desc" ? "Newest" : "Oldest"}</span>
            </Button>
          </div>
        </div>

        {filteredItems.length ? (
          <>
            <UrlTable
              items={filteredItems}
              onCopy={handleCopy}
              onEdit={setEditingUrl}
              onDelete={setDeletingUrl}
              onQr={setQrUrl}
            />
            <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
          </>
        ) : (
          <EmptyState
            title="No URLs found"
            description="Try changing your search term or status filter, or create a new short link above."
          />
        )}
      </Card>

      {/* Edit Link Modal */}
      <Modal
        open={Boolean(editingUrl)}
        onClose={() => setEditingUrl(null)}
        title="Edit Link"
      >
        {editingUrl ? (
          <UrlFormCard
            key={editingUrl.id}
            mode="edit"
            loading={saving}
            initialValues={{ url: editingUrl.originalUrl, expirationDate: editingUrl.expirationDate }}
            onSubmit={handleEdit}
          />
        ) : null}
      </Modal>

      {/* Delete Link Confirmation Dialog */}
      <Modal
        open={Boolean(deletingUrl)}
        onClose={() => setDeletingUrl(null)}
        title="Delete Short Link?"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setDeletingUrl(null)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-xs sm:text-sm text-label-secondary">
          Are you sure you want to delete <span className="font-semibold text-label">{deletingUrl?.shortUrl}</span>? This link will immediately stop redirecting.
        </p>
      </Modal>

      {/* QR Code Modal */}
      <Modal open={Boolean(qrUrl)} onClose={() => setQrUrl(null)} title="QR Code">
        {qrUrl ? (
          <div className="space-y-4 text-center py-2">
            <div className="inline-block rounded-apple-xl border border-separator bg-white p-4 shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrUrl.shortUrl)}`}
                alt={`QR code for ${qrUrl.shortUrl}`}
                className="h-48 w-48 mx-auto"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-system-blue">{qrUrl.shortUrl}</p>
              <p className="text-xs text-label-secondary mt-0.5">Scan with camera to open destination</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
