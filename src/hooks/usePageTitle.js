import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Nexly` : "Nexly URL Shortener";
  }, [title]);
}
