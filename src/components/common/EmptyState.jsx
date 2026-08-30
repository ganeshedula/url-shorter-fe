import { FiInbox } from "react-icons/fi";
import { Button } from "./Button";

export function EmptyState({ title, description, actionLabel, onAction, icon: Icon = FiInbox }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-apple-xl border border-separator bg-surface p-8 sm:p-12 text-center">
      <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary text-label-tertiary">
        <Icon size={22} />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-label tracking-tight">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm text-label-secondary">{description}</p>
      {actionLabel && (
        <Button size="sm" className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
