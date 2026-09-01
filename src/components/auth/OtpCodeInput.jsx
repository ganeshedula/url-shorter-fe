import { useEffect, useRef, useState } from "react";

export function OtpCodeInput({ value, onChange, disabled = false }) {
  const [digits, setDigits] = useState(() => Array.from({ length: 6 }, (_, index) => value[index] || ""));
  const refs = useRef([]);

  useEffect(() => setDigits(Array.from({ length: 6 }, (_, index) => value[index] || "")), [value]);
  useEffect(() => refs.current[0]?.focus(), []);

  const commit = (next) => {
    setDigits(next);
    onChange(next.join(""));
  };
  const setAt = (index, input) => {
    const clean = input.replace(/\D/g, "");
    if (clean.length > 1) {
      const next = [...digits];
      clean.slice(0, 6).split("").forEach((digit, offset) => { if (index + offset < 6) next[index + offset] = digit; });
      commit(next);
      refs.current[Math.min(index + clean.length, 5)]?.focus();
      return;
    }
    const next = [...digits]; next[index] = clean; commit(next);
    if (clean && index < 5) refs.current[index + 1]?.focus();
  };

  return <div className="flex justify-center gap-2 sm:gap-3" role="group" aria-label="Six digit verification code">
    {digits.map((digit, index) => <input key={index} ref={(element) => { refs.current[index] = element; }} value={digit} disabled={disabled}
      inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"} aria-label={`Digit ${index + 1}`} maxLength={6}
      onChange={(event) => setAt(index, event.target.value)}
      onKeyDown={(event) => { if (event.key === "Backspace" && !digits[index] && index > 0) refs.current[index - 1]?.focus(); if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus(); if (event.key === "ArrowRight" && index < 5) refs.current[index + 1]?.focus(); }}
      className="h-12 w-10 rounded-apple-md border border-separator bg-surface text-center text-xl font-semibold tabular-nums text-label outline-none transition focus:border-system-blue focus:ring-2 focus:ring-system-blue/20 disabled:opacity-50 sm:h-14 sm:w-12" />)}
  </div>;
}
