export function getPasswordStrength(value = "") {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  if (score <= 1) {
    return { label: "Weak", color: "bg-danger", width: "w-1/4" };
  }
  if (score === 2) {
    return { label: "Fair", color: "bg-orange-400", width: "w-2/4" };
  }
  if (score === 3) {
    return { label: "Strong", color: "bg-accent", width: "w-3/4" };
  }
  return { label: "Excellent", color: "bg-success", width: "w-full" };
}
