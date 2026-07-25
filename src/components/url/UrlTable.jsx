import { FiBarChart2, FiCopy, FiEdit2, FiExternalLink, FiImage, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Badge } from "../common/Badge";
import { Tooltip } from "../common/Tooltip";
import { formatDate, formatRelativeFromNow, isUrlExpired } from "../../utils/formatters";
import { cn } from "../../utils/cn";

export function UrlTable({ items, onCopy, onDelete, onEdit, onQr }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface-alt/60 text-left">
            <tr className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
              <th className="px-5 py-4">Link</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Clicks</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4">Expiry</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => {
              const updatedTimestamp = item.updatedAt || item.lastAccessedAt || item.createdAt;
              const expired = item.expirationDate && isUrlExpired(item.expirationDate);

              return (
                <tr key={item.id} className="transition-colors hover:bg-surface-alt/25">
                  <td className="px-5 py-4 max-w-xs md:max-w-md">
                    <div className="space-y-1.5">
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        {item.shortUrl}
                        <FiExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <p
                        className="text-sm font-medium text-text truncate max-w-sm md:max-w-lg"
                        title={item.originalUrl}
                      >
                        {item.originalUrl}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {expired ? (
                      <Badge variant="danger">Expired</Badge>
                    ) : (
                      <Badge variant={item.active ? "success" : "danger"}>
                        {item.active ? "Active" : "Inactive"}
                      </Badge>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-text">{item.clickCount || 0}</td>
                  <td className="px-5 py-4 text-sm font-medium text-text">
                    {formatRelativeFromNow(updatedTimestamp)}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-text">
                    {item.expirationDate ? (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold border",
                          expired
                            ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
                        )}
                      >
                        {expired ? "Expired: " : ""}{formatDate(item.expirationDate, { includeTime: true })}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-muted/70 italic">Never</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2.5">
                      <Tooltip content="Copy URL">
                        <button
                          type="button"
                          onClick={() => onCopy(item.shortUrl)}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/25 active:scale-95 transition-all shadow-sm"
                          aria-label="Copy URL"
                        >
                          <FiCopy className="h-4.5 w-4.5" />
                        </button>
                      </Tooltip>

                      <Tooltip content="Edit URL">
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/25 active:scale-95 transition-all shadow-sm"
                          aria-label="Edit URL"
                        >
                          <FiEdit2 className="h-4.5 w-4.5" />
                        </button>
                      </Tooltip>

                      <Tooltip content="Generate QR">
                        <button
                          type="button"
                          onClick={() => onQr(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/25 active:scale-95 transition-all shadow-sm"
                          aria-label="Generate QR"
                        >
                          <FiImage className="h-4.5 w-4.5" />
                        </button>
                      </Tooltip>

                      <Tooltip content="View analytics">
                        <Link
                          to={`/app/analytics?id=${item.id}`}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 active:scale-95 transition-all shadow-sm"
                          aria-label="View analytics"
                        >
                          <FiBarChart2 className="h-4.5 w-4.5" />
                        </Link>
                      </Tooltip>

                      <Tooltip content="Delete URL">
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all shadow-sm"
                          aria-label="Delete URL"
                        >
                          <FiTrash2 className="h-4.5 w-4.5" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
