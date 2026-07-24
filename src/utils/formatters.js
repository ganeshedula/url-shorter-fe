export function formatDate(value, options = {}) {
  if (!value) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: options.includeTime ? "short" : undefined,
  }).format(new Date(value));
}

export function formatCompactNumber(value = 0) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatRelativeFromNow(value) {
  if (!value) {
    return "No activity yet";
  }

  const diff = new Date(value).getTime() - Date.now();
  const minutes = Math.round(diff / 60000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) {
    return rtf.format(hours, "hour");
  }

  return rtf.format(Math.round(hours / 24), "day");
}

export function truncateMiddle(value, head = 22, tail = 12) {
  if (!value || value.length <= head + tail) {
    return value;
  }

  return `${value.slice(0, head)}...${value.slice(-tail)}`;
}
