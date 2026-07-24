import { Loader } from "./Loader";

export function LoaderScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app">
      <div className="glass-panel rounded-[32px] px-8 py-7">
        <Loader label="Preparing your workspace..." />
      </div>
    </div>
  );
}
