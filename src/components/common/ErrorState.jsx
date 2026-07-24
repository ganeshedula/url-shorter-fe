import { Button } from "./Button";

export function ErrorState({ title = "Something went wrong", description, onRetry }) {
  return (
    <div className="glass-panel rounded-[28px] border-danger/20 p-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-danger/12 text-2xl font-bold text-danger">
        !
      </div>
      <h3 className="text-xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md">{description}</p>
      {onRetry ? (
        <Button variant="danger" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
