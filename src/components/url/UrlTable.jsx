import { FiBarChart2, FiCopy, FiEdit2, FiExternalLink, FiMaximize2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Badge } from "../common/Badge";
import { formatDate, formatRelativeFromNow, isUrlExpired, truncateMiddle } from "../../utils/formatters";

export function UrlTable({ items, onCopy, onDelete, onEdit, onQr }) {
  return (
    <div className="space-y-3">
      {/* Mobile iOS Grouped List View */}
      <div className="space-y-2.5 md:hidden">
        {items.map((item) => {
          const expired = item.expirationDate && isUrlExpired(item.expirationDate);
          const updatedTimestamp = item.updatedAt || item.lastAccessedAt || item.createdAt;

          return (
            <div
              key={item.id}
              className="rounded-apple-lg border border-separator bg-surface p-3.5 shadow-sm space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <a
                    href={item.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-system-blue hover:underline break-all"
                  >
                    {item.shortUrl}
                    <FiExternalLink size={12} className="shrink-0 opacity-70" />
                  </a>
                  <p className="mt-0.5 text-xs text-label-secondary truncate" title={item.originalUrl}>
                    {item.originalUrl}
                  </p>
                </div>
                <Badge variant={expired ? "danger" : item.active ? "success" : "muted"}>
                  {expired ? "Expired" : item.active ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-label-secondary border-t border-separator/50 pt-2">
                <div>
                  <span className="font-semibold text-label">{item.clickCount || 0}</span> clicks
                  <span className="mx-1.5 text-label-tertiary">·</span>
                  <span>{formatRelativeFromNow(updatedTimestamp)}</span>
                </div>

                {item.expirationDate && (
                  <span className={expired ? "text-system-red font-medium" : "text-system-orange font-medium"}>
                    {expired ? "Expired" : `Exp: ${formatDate(item.expirationDate)}`}
                  </span>
                )}
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onCopy(item.shortUrl)}
                  className="flex h-8 items-center gap-1 rounded-apple-sm bg-surface-secondary px-2.5 text-xs font-medium text-system-blue hover:bg-surface-tertiary active:scale-95 transition-all"
                  aria-label="Copy short link"
                >
                  <FiCopy size={13} />
                  <span>Copy</span>
                </button>
                <button
                  type="button"
                  onClick={() => onQr(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                  title="QR code"
                  aria-label="QR code"
                >
                  <FiMaximize2 size={13} />
                </button>
                <Link
                  to={`/app/analytics?id=${item.id}`}
                  className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                  title="Analytics"
                  aria-label="Analytics"
                >
                  <FiBarChart2 size={13} />
                </Link>
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                  title="Edit"
                  aria-label="Edit"
                >
                  <FiEdit2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="flex h-8 w-8 items-center justify-center rounded-apple-sm bg-system-red/10 text-system-red hover:bg-system-red/20 active:scale-95 transition-all"
                  title="Delete"
                  aria-label="Delete"
                >
                  <FiTrash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop macOS / iPadOS Grouped Table */}
      <div className="hidden md:block overflow-hidden rounded-apple-lg border border-separator bg-surface shadow-apple">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full divide-y divide-separator text-left">
            <thead className="bg-surface-secondary/70">
              <tr className="text-[11px] font-semibold uppercase tracking-wider text-label-secondary whitespace-nowrap">
                <th className="px-4 py-3 min-w-[260px]">Link & Destination</th>
                <th className="px-3 py-3 min-w-[90px]">Status</th>
                <th className="px-3 py-3 min-w-[80px]">Clicks</th>
                <th className="px-3 py-3 min-w-[110px]">Updated</th>
                <th className="px-3 py-3 min-w-[150px]">Expiration</th>
                <th className="px-4 py-3 text-right min-w-[180px]">Actions</th>
              </tr>
            </thead>
          <tbody className="divide-y divide-separator/60 text-xs sm:text-sm">
            {items.map((item) => {
              const updatedTimestamp = item.updatedAt || item.lastAccessedAt || item.createdAt;
              const expired = item.expirationDate && isUrlExpired(item.expirationDate);

              return (
                <tr key={item.id} className="hover:bg-surface-secondary/40 transition-colors">
                  <td className="px-4 py-3 min-w-[260px]">
                    <div className="space-y-0.5">
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-system-blue hover:underline break-all"
                      >
                        {item.shortUrl}
                        <FiExternalLink size={12} className="shrink-0 opacity-70" />
                      </a>
                      <p className="text-xs text-label-secondary truncate max-w-sm" title={item.originalUrl}>
                        {truncateMiddle(item.originalUrl, 45, 15)}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Badge variant={expired ? "danger" : item.active ? "success" : "muted"}>
                      {expired ? "Expired" : item.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-3 py-3 font-semibold text-label whitespace-nowrap">{item.clickCount || 0}</td>
                  <td className="px-3 py-3 text-xs text-label-secondary whitespace-nowrap">
                    {formatRelativeFromNow(updatedTimestamp)}
                  </td>
                  <td className="px-3 py-3 text-xs whitespace-nowrap">
                    {item.expirationDate ? (
                      <span className={expired ? "text-system-red font-medium" : "text-system-orange font-medium"}>
                        {formatDate(item.expirationDate, { includeTime: true })}
                      </span>
                    ) : (
                      <span className="text-label-tertiary">Never</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onCopy(item.shortUrl)}
                        className="flex h-7 items-center gap-1 rounded-apple-sm bg-surface-secondary px-2 text-xs font-medium text-system-blue hover:bg-surface-tertiary active:scale-95 transition-all"
                        title="Copy short URL"
                      >
                        <FiCopy size={12} />
                        <span>Copy</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onQr(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                        title="QR Code"
                        aria-label="QR Code"
                      >
                        <FiMaximize2 size={13} />
                      </button>

                      <Link
                        to={`/app/analytics?id=${item.id}`}
                        className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                        title="View Analytics"
                        aria-label="View Analytics"
                      >
                        <FiBarChart2 size={13} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                        title="Edit link"
                        aria-label="Edit link"
                      >
                        <FiEdit2 size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-system-red hover:bg-system-red/10 active:scale-95 transition-all"
                        title="Delete link"
                        aria-label="Delete link"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
