import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiX,
  FiAlertCircle,
  FiCheck,
} from "react-icons/fi";
import { cn } from "../../utils/cn";

export function DateTimePicker({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  className,
  placement = "auto",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [effectivePlacement, setEffectivePlacement] = useState(placement === "auto" ? "bottom" : placement);
  const containerRef = useRef(null);

  const parsedDate = value ? new Date(value) : null;
  const validDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

  const [viewYear, setViewYear] = useState(() => (validDate ? validDate.getFullYear() : new Date().getFullYear()));
  const [viewMonth, setViewMonth] = useState(() => (validDate ? validDate.getMonth() : new Date().getMonth()));

  const [hours12, setHours12] = useState(() => {
    if (!validDate) return "12";
    const h = validDate.getHours() % 12;
    return String(h === 0 ? 12 : h).padStart(2, "0");
  });
  const [minutes, setMinutes] = useState(() => {
    if (!validDate) return "00";
    return String(validDate.getMinutes()).padStart(2, "0");
  });
  const [ampm, setAmpm] = useState(() => {
    if (!validDate) return "PM";
    return validDate.getHours() >= 12 ? "PM" : "AM";
  });

  useEffect(() => {
    if (validDate) {
      setViewYear(validDate.getFullYear());
      setViewMonth(validDate.getMonth());
      const h = validDate.getHours() % 12;
      setHours12(String(h === 0 ? 12 : h).padStart(2, "0"));
      setMinutes(String(validDate.getMinutes()).padStart(2, "0"));
      setAmpm(validDate.getHours() >= 12 ? "PM" : "AM");
    }
  }, [value]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      if (placement === "auto") {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 360 && rect.top > 280) {
          setEffectivePlacement("top");
        } else {
          setEffectivePlacement("bottom");
        }
      } else {
        setEffectivePlacement(placement);
      }
    }
  }, [isOpen, placement]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  const constructISOString = (year, month, day, h12Str, minStr, ampmVal) => {
    let h24 = parseInt(h12Str, 10) || 12;
    if (ampmVal === "AM") {
      if (h24 === 12) h24 = 0;
    } else {
      if (h24 !== 12) h24 += 12;
    }
    const m = parseInt(minStr, 10) || 0;
    const pad = (n) => String(n).padStart(2, "0");
    return `${year}-${pad(month + 1)}-${pad(day)}T${pad(h24)}:${pad(m)}`;
  };

  const handleDaySelect = (day) => {
    const isoString = constructISOString(viewYear, viewMonth, day, hours12, minutes, ampm);
    onChange(isoString);
  };

  const handleTimeChange = (newH12, newMin, newAmpm) => {
    setHours12(newH12);
    setMinutes(newMin);
    setAmpm(newAmpm);
    if (validDate) {
      const day = validDate.getDate();
      const isoString = constructISOString(viewYear, viewMonth, day, newH12, newMin, newAmpm);
      onChange(isoString);
    }
  };

  const handleSetQuickPreset = (daysAhead) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    target.setHours(23, 59, 0, 0);
    const pad = (n) => String(n).padStart(2, "0");
    const iso = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T23:59`;
    onChange(iso);
    setIsOpen(false);
  };

  const prevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  const formattedDisplay = validDate
    ? validDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div ref={containerRef} className={cn("relative w-full space-y-1.5 text-left", className)}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-label-secondary">
          {label}
        </label>
      )}

      {/* Input Trigger */}
      <div
        id={id}
        onClick={handleToggle}
        className={cn(
          "flex min-h-[42px] cursor-pointer items-center justify-between gap-2.5 rounded-apple-md border bg-surface px-3.5 transition-all select-none",
          error
            ? "border-system-red ring-1 ring-system-red/30 bg-system-red/5"
            : isOpen
            ? "border-system-blue ring-2 ring-system-blue/20"
            : "border-separator hover:border-separator-opaque"
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <FiCalendar className="shrink-0 text-label-tertiary" size={17} />
          {validDate ? (
            <span className="truncate text-sm font-medium text-label">{formattedDisplay}</span>
          ) : (
            <span className="truncate text-sm text-label-tertiary">Never expires (optional)</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {validDate && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-secondary text-label-secondary hover:text-label transition-colors"
              title="Clear date"
            >
              <FiX size={12} />
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-system-red pt-0.5">
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {!error && hint && <p className="text-xs text-label-tertiary">{hint}</p>}

      {/* Popover Calendar Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: effectivePlacement === "top" ? 8 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: effectivePlacement === "top" ? 8 : -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 w-full min-w-[310px] max-w-[340px] rounded-apple-xl border border-separator bg-surface p-4 shadow-apple-popover select-none",
              effectivePlacement === "top" ? "bottom-full mb-2" : "top-full mt-2",
              "left-0 sm:left-auto sm:right-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Quick Presets */}
            <div className="mb-3 flex items-center justify-between gap-1.5 border-b border-separator pb-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-label-tertiary">Presets:</span>
              <div className="flex items-center gap-1">
                {[
                  { label: "24h", days: 1 },
                  { label: "7d", days: 7 },
                  { label: "30d", days: 30 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSetQuickPreset(preset.days)}
                    className="rounded-apple-sm bg-surface-secondary px-2.5 py-1 text-xs font-medium text-label hover:bg-surface-tertiary active:scale-95 transition-all"
                  >
                    +{preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Month & Year Navigation */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label active:scale-95 transition-all"
              >
                <FiChevronLeft size={15} />
              </button>

              <span className="text-sm font-semibold text-label">
                {monthNames[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-apple-sm bg-surface-secondary text-label-secondary hover:text-label active:scale-95 transition-all"
              >
                <FiChevronRight size={15} />
              </button>
            </div>

            {/* Days Header */}
            <div className="mb-1 grid grid-cols-7 text-center">
              {dayNames.map((d) => (
                <span key={d} className="text-[11px] font-medium text-label-tertiary">
                  {d}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected =
                  validDate &&
                  validDate.getFullYear() === viewYear &&
                  validDate.getMonth() === viewMonth &&
                  validDate.getDate() === day;

                const isToday =
                  new Date().getFullYear() === viewYear &&
                  new Date().getMonth() === viewMonth &&
                  new Date().getDate() === day;

                return (
                  <button
                    key={`day-${day}`}
                    type="button"
                    onClick={() => handleDaySelect(day)}
                    className={cn(
                      "flex h-8 w-8 mx-auto items-center justify-center rounded-full text-xs font-medium transition-all",
                      isSelected
                        ? "bg-system-blue text-white font-semibold shadow-sm"
                        : isToday
                        ? "text-system-blue font-bold hover:bg-surface-secondary"
                        : "text-label hover:bg-surface-secondary active:scale-95"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time Selector */}
            <div className="mt-3.5 border-t border-separator pt-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-label-secondary">
                  <FiClock size={13} /> Time:
                </span>

                <div className="flex items-center gap-1">
                  <select
                    value={hours12}
                    onChange={(e) => handleTimeChange(e.target.value, minutes, ampm)}
                    className="rounded-apple-sm border border-separator bg-surface px-2 py-1 text-xs font-medium text-label focus:outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <span className="text-label-tertiary">:</span>
                  <select
                    value={minutes}
                    onChange={(e) => handleTimeChange(hours12, e.target.value, ampm)}
                    className="rounded-apple-sm border border-separator bg-surface px-2 py-1 text-xs font-medium text-label focus:outline-none"
                  >
                    {["00", "15", "30", "45", "59"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <div className="flex rounded-apple-sm border border-separator p-0.5 bg-surface-secondary">
                    {["AM", "PM"].map((period) => (
                      <button
                        key={period}
                        type="button"
                        onClick={() => handleTimeChange(hours12, minutes, period)}
                        className={cn(
                          "px-1.5 py-0.5 text-[11px] font-medium rounded-[4px] transition-all",
                          ampm === period
                            ? "bg-surface text-label font-semibold shadow-sm"
                            : "text-label-secondary hover:text-label"
                        )}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Done Action */}
            <div className="mt-3 pt-2.5 border-t border-separator flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 rounded-apple-md bg-system-blue px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 active:scale-95 transition-all"
              >
                <FiCheck size={13} />
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
