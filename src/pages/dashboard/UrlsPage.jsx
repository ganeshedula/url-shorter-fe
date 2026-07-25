import { useMemo, useState } from "react";
import { FiCheck, FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Dropdown } from "../../components/common/Dropdown";
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
import { cn } from "../../utils/cn";

import { isUrlExpired } from "../../utils/formatters";

export default function UrlsPage() {
  usePageTitle("My URLs");
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
      toast.success("Link updated.");
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
      toast.success("Link deleted.");
      setDeletingUrl(null);
      await refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete URL.");
    }
  };

  const handleCopy = async (shortUrl) => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Short URL copied.");
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-56" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description="We couldn't load your URL library." onRetry={refresh} />;
  }

  const filterLabelMap = {
    all: "All links",
    active: "Active only",
    inactive: "Inactive only",
  };

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Workspace" }, { label: "My URLs" }]} />
      <UrlFormCard onSubmit={handleCreate} loading={saving} />

      <Card>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl">Managed links</h2>
            <p className="mt-2">Search, sort, update, copy, analyze, and remove links without touching backend contracts.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Dropdown
              label={
                <span className="inline-flex items-center gap-2 font-semibold text-text">
                  <FiFilter className="text-primary" /> Filter: {filterLabelMap[statusFilter]}
                </span>
              }
            >
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                  statusFilter === "all" ? "bg-primary text-white" : "text-slate-100 hover:bg-slate-800"
                )}
                onClick={() => setStatusFilter("all")}
              >
                <span>All links</span>
                {statusFilter === "all" ? <FiCheck className="text-white" /> : null}
              </button>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                  statusFilter === "active" ? "bg-primary text-white" : "text-slate-100 hover:bg-slate-800"
                )}
                onClick={() => setStatusFilter("active")}
              >
                <span>Active only</span>
                {statusFilter === "active" ? <FiCheck className="text-white" /> : null}
              </button>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors",
                  statusFilter === "inactive" ? "bg-primary text-white" : "text-slate-100 hover:bg-slate-800"
                )}
                onClick={() => setStatusFilter("inactive")}
              >
                <span>Inactive only</span>
                {statusFilter === "inactive" ? <FiCheck className="text-white" /> : null}
              </button>
            </Dropdown>
            <Button variant="secondary" onClick={() => setDirection((current) => (current === "desc" ? "asc" : "desc"))}>
              Sort: {direction === "desc" ? "Newest" : "Oldest"}
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
            <div className="mt-6">
              <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          </>
        ) : (
          <EmptyState
            title="No URLs match this view"
            description="Try a different search term or status filter, or create a new link."
          />
        )}
      </Card>

      <Modal
        open={Boolean(editingUrl)}
        onClose={() => setEditingUrl(null)}
        title="Edit link details"
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

      <Modal
        open={Boolean(deletingUrl)}
        onClose={() => setDeletingUrl(null)}
        title="Delete this short link?"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeletingUrl(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete link
            </Button>
          </div>
        }
      >
        <p>This action removes the selected link from your current workspace.</p>
      </Modal>

      <Modal open={Boolean(qrUrl)} onClose={() => setQrUrl(null)} title="QR code preview">
        {qrUrl ? (
          <div className="space-y-4 text-center">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrUrl.shortUrl)}`}
              alt={`QR code for ${qrUrl.shortUrl}`}
              className="mx-auto rounded-[24px] border border-border bg-white p-3"
            />
            <p className="text-sm">{qrUrl.shortUrl}</p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
