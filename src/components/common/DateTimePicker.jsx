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

  // Parse current value or default to now
  const parsedDate = value ? new Date(value) : null;
  const validDate = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

  // View state for calendar navigation
  const [viewYear, setViewYear] = useState(() => (validDate ? validDate.getFullYear() : new Date().getFullYear()));
  const [viewMonth, setViewMonth] = useState(() => (validDate ? validDate.getMonth() : new Date().getMonth()));

  // Time state (12h format)
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

  // Sync internal view when value prop changes
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

  // Smart placement calculation (top vs bottom)
  useEffect(() => {
    if (isOpen && containerRef.current) {
      if (placement === "auto") {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        // If space below is less than 350px and there's space above, open upwards
        if (spaceBelow < 350 && rect.top > 280) {
          setEffectivePlacement("top");
        } else {
          setEffectivePlacement("bottom");
        }
      } else {
        setEffectivePlacement(placement);
      }
    }
  }, [isOpen, placement]);

  // Click outside to close
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

  // Helper to format Date -> YYYY-MM-DDTHH:mm
  const formatToLocalISO = (year, month, day, h12Str, minStr, ampmStr) => {
    let h24 = parseInt(h12Str, 10);
    if (isNaN(h24)) h24 = 12;
    if (ampmStr === "PM" && h24 < 12) h24 += 12;
    if (ampmStr === "AM" && h24 === 12) h24 = 0;

    const pad = (n) => String(n).padStart(2, "0");
    return `${year}-${pad(month + 1)}-${pad(day)}T${pad(h24)}:${minStr}`;
  };

  // Emit change helper
  const updateDateTime = (year, month, day, h12Str = hours12, minStr = minutes, ampmStr = ampm) => {
    const localIso = formatToLocalISO(year, month, day, h12Str, minStr, ampmStr);
    onChange(localIso);
  };

  // Calendar calculations
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    isCurrentMonth: false,
    isPrev: true,
  }));

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: true,
  }));

  const remainingSlots = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingSlots > 7 ? remainingSlots - 7 : remainingSlots }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
    isNext: true,
  }));

  const allCalendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (dayObj) => {
    let targetYear = viewYear;
    let targetMonth = viewMonth;

    if (dayObj.isPrev) {
      if (viewMonth === 0) {
        targetMonth = 11;
        targetYear -= 1;
      } else {
        targetMonth -= 1;
      }
      setViewMonth(targetMonth);
      setViewYear(targetYear);
    } else if (dayObj.isNext) {
      if (viewMonth === 11) {
        targetMonth = 0;
        targetYear += 1;
      } else {
        targetMonth += 1;
      }
      setViewMonth(targetMonth);
      setViewYear(targetYear);
    }

    updateDateTime(targetYear, targetMonth, dayObj.day);
  };

  const handleTimeChange = (newHours, newMinutes, newAmpm) => {
    setHours12(newHours);
    setMinutes(newMinutes);
    setAmpm(newAmpm);

    if (validDate) {
      updateDateTime(
        validDate.getFullYear(),
        validDate.getMonth(),
        validDate.getDate(),
        newHours,
        newMinutes,
        newAmpm
      );
    } else {
      const today = new Date();
      updateDateTime(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        newHours,
        newMinutes,
        newAmpm
      );
    }
  };

  // Presets
  const applyPreset = (daysToAdd) => {
    const target = new Date();
    target.setDate(target.getDate() + daysToAdd);
    target.setHours(23, 59, 0, 0);

    const pad = (n) => String(n).padStart(2, "0");
    const formatted = `${target.getFullYear()}-${pad(target.getMonth() + 1)}-${pad(target.getDate())}T23:59`;

    onChange(formatted);
    setIsOpen(false);
  };

  const isToday = (d) => {
    const today = new Date();
    return (
      d === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  };

  const isSelected = (dayObj) => {
    if (!validDate) return false;
    let checkMonth = viewMonth;
    let checkYear = viewYear;

    if (dayObj.isPrev) {
      checkMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      checkYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    } else if (dayObj.isNext) {
      checkMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      checkYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    }

    return (
      dayObj.day === validDate.getDate() &&
      checkMonth === validDate.getMonth() &&
      checkYear === validDate.getFullYear()
    );
  };

  // Formatted trigger text display
  const getDisplayText = () => {
    if (!validDate) return "Select expiration date & time";
    return validDate.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div ref={containerRef} className={cn("relative block space-y-1.5", isOpen ? "z-50" : "z-10")}>
      {label ? (
        <label htmlFor={id} className="block text-sm font-semibold text-text">
          {label}
        </label>
      ) : null}

      <div
        id={id}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={cn(
          "glass-panel flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-2xl px-4 transition-all duration-200 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          error
            ? "!border-red-500/80 ring-2 ring-red-500/20 bg-red-500/5"
            : isOpen
            ? "border-primary/60 ring-2 ring-primary/20 bg-surface-alt/40"
            : "hover:border-primary/30",
          className
        )}
      >
        <div className="flex flex-1 items-center gap-3 min-w-0">
          <FiCalendar className={cn("shrink-0 text-base transition-colors", validDate ? "text-primary" : "text-slate-400")} />
          <span className={cn("text-sm font-medium truncate", validDate ? "text-text font-semibold" : "text-slate-400 dark:text-slate-300")}>
            {getDisplayText()}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {validDate ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="flex h-7 w-7 items-center justify-center rounded-xl text-muted hover:bg-red-500/15 hover:text-red-500 transition-colors"
              title="Clear date"
            >
              <FiX className="h-4 w-4" />
            </button>
          ) : null}
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-surface-alt/50 text-muted">
            <FiClock className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>

      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 pt-0.5">
          <FiAlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
      {!error && hint ? <p className="text-sm text-muted">{hint}</p> : null}

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="calendar-popover"
            initial={{ opacity: 0, y: effectivePlacement === "top" ? -8 : 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: effectivePlacement === "top" ? -6 : 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute left-0 right-0 sm:left-auto sm:right-0 z-[100] w-full sm:w-[350px] max-h-[75vh] overflow-y-auto rounded-3xl border border-border bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-2xl text-slate-100 ring-1 ring-white/10 select-none",
              effectivePlacement === "top" ? "bottom-full mb-2" : "top-full mt-2"
            )}
          >
            {/* Presets Header */}
            <div className="mb-3 space-y-1.5 border-b border-border/60 pb-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Quick presets</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Tomorrow", days: 1 },
                  { label: "+3 Days", days: 3 },
                  { label: "+1 Week", days: 7 },
                  { label: "+1 Month", days: 30 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => applyPreset(preset.days)}
                    className="rounded-xl border border-border bg-surface-alt/50 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Header Navigation */}
            <div className="mb-2.5 flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                {monthNames[viewMonth]} {viewYear}
              </h4>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-surface-alt/40 text-slate-300 hover:bg-surface-alt hover:text-white transition-colors"
                  aria-label="Previous Month"
                >
                  <FiChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="flex h-7 w-7 items-center justify-center rounded-xl border border-border bg-surface-alt/40 text-slate-300 hover:bg-surface-alt hover:text-white transition-colors"
                  aria-label="Next Month"
                >
                  <FiChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="mb-1 grid grid-cols-7 text-center">
              {daysOfWeek.map((day) => (
                <span key={day} className="text-[10px] font-bold text-muted uppercase">
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {allCalendarDays.map((dayObj, index) => {
                const selected = isSelected(dayObj);
                const today = dayObj.isCurrentMonth && isToday(dayObj.day);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectDay(dayObj)}
                    className={cn(
                      "flex h-8 w-full items-center justify-center rounded-xl text-xs font-semibold transition-all relative",
                      selected
                        ? "bg-primary text-white shadow-md shadow-primary/30 scale-105 font-bold z-10"
                        : dayObj.isCurrentMonth
                        ? "text-slate-200 hover:bg-primary/20 hover:text-white"
                        : "text-slate-600 hover:bg-surface-alt/40",
                      today && !selected && "ring-1 ring-primary text-primary font-bold"
                    )}
                  >
                    {dayObj.day}
                  </button>
                );
              })}
            </div>

            {/* Time Picker Bar */}
            <div className="mt-3 pt-2.5 border-t border-border/60">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted">Time</span>
                <div className="flex items-center gap-1.5">
                  {/* Hours */}
                  <select
                    value={hours12}
                    onChange={(e) => handleTimeChange(e.target.value, minutes, ampm)}
                    className="rounded-xl border border-border bg-surface-alt/60 px-2 py-1 text-xs font-bold text-slate-100 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const h = String(i + 1).padStart(2, "0");
                      return <option key={h} value={h} className="bg-slate-900 text-slate-100">{h}</option>;
                    })}
                  </select>
                  <span className="font-bold text-slate-400">:</span>
                  {/* Minutes */}
                  <select
                    value={minutes}
                    onChange={(e) => handleTimeChange(hours12, e.target.value, ampm)}
                    className="rounded-xl border border-border bg-surface-alt/60 px-2 py-1 text-xs font-bold text-slate-100 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => (
                      <option key={m} value={m} className="bg-slate-900 text-slate-100">{m}</option>
                    ))}
                  </select>
                  {/* AM / PM Toggle */}
                  <div className="flex rounded-xl border border-border bg-surface-alt/60 p-0.5">
                    {["AM", "PM"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handleTimeChange(hours12, minutes, p)}
                        className={cn(
                          "px-2 py-0.5 text-xs font-bold rounded-lg transition-all",
                          ampm === p
                            ? "bg-primary text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-2.5">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
              >
                Clear date
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-primary-hover active:scale-95 transition-all"
              >
                <FiCheck className="h-3.5 w-3.5" />
                Done
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
