import { FiAlertCircle } from "react-icons/fi";
import { Button } from "./Button";

export function ErrorState({ title = "Unable to load data", description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-apple-xl border border-separator bg-surface p-8 sm:p-12 text-center">
      <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-system-red/10 text-system-red">
        <FiAlertCircle size={22} />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-label tracking-tight">{title}</h3>
      {description && (
        <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm text-label-secondary">{description}</p>
      )}
      {onRetry && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
