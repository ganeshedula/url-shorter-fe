import { FiBarChart2, FiCopy, FiEdit2, FiExternalLink, FiImage, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Tooltip } from "../common/Tooltip";
import { formatDate, formatRelativeFromNow, truncateMiddle } from "../../utils/formatters";

export function UrlTable({ items, onCopy, onDelete, onEdit, onQr }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface-alt/50 text-left">
            <tr className="text-xs uppercase tracking-[0.18em] text-muted">
              <th className="px-5 py-4">Link</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Clicks</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4">Expiry</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-5 py-5">
                  <div className="space-y-2">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      {item.shortUrl}
                      <FiExternalLink />
                    </a>
                    <p className="text-sm">{truncateMiddle(item.originalUrl)}</p>
                  </div>
                </td>
                <td className="px-5 py-5">
                  <Badge variant={item.active ? "success" : "danger"}>{item.active ? "Active" : "Inactive"}</Badge>
                </td>
                <td className="px-5 py-5 text-sm font-semibold text-text">{item.clickCount}</td>
                <td className="px-5 py-5 text-sm">{formatRelativeFromNow(item.updatedAt)}</td>
                <td className="px-5 py-5 text-sm">{formatDate(item.expirationDate)}</td>
                <td className="px-5 py-5">
                  <div className="flex justify-end gap-2">
                    <Tooltip content="Copy URL">
                      <Button variant="secondary" size="sm" className="w-10 px-0" onClick={() => onCopy(item.shortUrl)}>
                        <FiCopy />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Edit URL">
                      <Button variant="secondary" size="sm" className="w-10 px-0" onClick={() => onEdit(item)}>
                        <FiEdit2 />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Generate QR">
                      <Button variant="secondary" size="sm" className="w-10 px-0" onClick={() => onQr(item)}>
                        <FiImage />
                      </Button>
                    </Tooltip>
                    <Tooltip content="View analytics">
                      <Link to={`/app/analytics?id=${item.id}`}>
                        <Button variant="secondary" size="sm" className="w-10 px-0">
                          <FiBarChart2 />
                        </Button>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Delete URL">
                      <Button variant="danger" size="sm" className="w-10 px-0" onClick={() => onDelete(item)}>
                        <FiTrash2 />
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
