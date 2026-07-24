import { Button } from "./Button";

export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="glass-panel rounded-[28px] p-10 text-center">
      <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-primary/10" />
      <h3 className="text-xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
