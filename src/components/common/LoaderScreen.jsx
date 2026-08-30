import { Loader } from "./Loader";

export function LoaderScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app">
      <div className="rounded-apple-xl border border-separator bg-surface p-6 shadow-apple">
        <Loader label="Loading workspace..." />
      </div>
    </div>
  );
}
