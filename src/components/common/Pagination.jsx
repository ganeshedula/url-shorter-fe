import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "./Button";

export function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        Page <span className="font-semibold text-text">{page + 1}</span> of{" "}
        <span className="font-semibold text-text">{Math.max(totalPages, 1)}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
        >
          <FiChevronLeft />
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <FiChevronRight />
        </Button>
      </div>
    </div>
  );
}
