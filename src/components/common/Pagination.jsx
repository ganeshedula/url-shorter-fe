import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "./Button";

export function Pagination({ page, totalPages, onPageChange }) {
  const current = page + 1;
  const total = Math.max(totalPages, 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p className="text-xs sm:text-sm text-label-secondary">
        Page <span className="font-semibold text-label">{current}</span> of{" "}
        <span className="font-semibold text-label">{total}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <FiChevronLeft size={15} />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <FiChevronRight size={15} />
        </Button>
      </div>
    </div>
  );
}
