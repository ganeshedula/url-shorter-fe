import { FiAlertOctagon } from "react-icons/fi";
import { Button } from "./Button";

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="glass-panel rounded-[28px] border-red-500/30 bg-red-500/5 p-10 text-center shadow-lg">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-500/15 text-2xl font-bold text-red-600 dark:text-red-400">
        <FiAlertOctagon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-bold text-text">{title}</h3>
      {description ? (
        <p className="mx-auto mt-3 max-w-md font-medium text-muted">{description}</p>
      ) : null}
      {onRetry ? (
        <Button variant="danger" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
