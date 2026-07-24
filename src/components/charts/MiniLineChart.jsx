import { useState } from "react";
import { getDailyTrendPoints } from "../../utils/analytics";
import { cn } from "../../utils/cn";

export function MiniLineChart({ data = [], className }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!data || !data.length) {
    return (
      <div className="flex h-56 flex-col items-center justify-center rounded-[24px] border border-dashed border-border p-6 text-center">
        <p className="text-sm font-semibold text-text">No trend data recorded yet</p>
        <p className="mt-1 text-xs text-muted">Click activity will be plotted here over time.</p>
      </div>
    );
  }

  const points = getDailyTrendPoints(data, 18);
  const maxCount = Math.max(...data.map((item) => item.count || 0), 0);
  const totalCount = data.reduce((sum, item) => sum + (item.count || 0), 0);
  const avgCount = (totalCount / data.length).toFixed(1);

  const pathD = points.reduce((acc, point, index) => {
    return `${acc} ${index === 0 ? "M" : "L"} ${point.x},${point.y}`;
  }, "");

  const firstPoint = points[0] || { x: 0, y: 82 };
  const lastPoint = points[points.length - 1] || { x: 100, y: 82 };
  const areaD = `${pathD} L ${lastPoint.x},82 L ${firstPoint.x},82 Z`;

  return (
    <div className={cn("rounded-[24px] border border-border bg-surface-alt/30 p-5 shadow-sm space-y-4", className)}>
      {/* Metrics Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-muted">Total Clicks: </span>
            <span className="font-bold text-text text-sm">{totalCount}</span>
          </div>
          <div>
            <span className="text-muted">Peak: </span>
            <span className="font-bold text-primary text-sm">{maxCount}</span>
          </div>
          <div>
            <span className="text-muted">Avg/Day: </span>
            <span className="font-bold text-text text-sm">{avgCount}</span>
          </div>
        </div>
        {hoveredPoint ? (
          <div className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary animate-fadeIn">
            {hoveredPoint.date}: <span className="font-bold">{hoveredPoint.count} clicks</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted italic">Hover data points for details</span>
        )}
      </div>

      {/* Main SVG Chart with Grid & Axis Scale */}
      <div className="relative pt-2">
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-semibold text-muted/60">
          <div className="flex justify-between border-b border-dashed border-border/40 pb-1">
            <span>{maxCount} clicks</span>
            <span>100%</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-border/30 pb-1">
            <span>{Math.round(maxCount / 2)} clicks</span>
            <span>50%</span>
          </div>
          <div className="flex justify-between border-b border-border/40 pb-1">
            <span>0 clicks</span>
            <span>0%</span>
          </div>
        </div>

        <svg
          viewBox="0 0 100 100"
          className="h-44 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trend-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="trend-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#7C3AED" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path d={areaD} fill="url(#trend-area-grad)" />

          {/* Smooth Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#trend-stroke-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((point) => {
            const isHovered = hoveredPoint?.date === point.date;
            return (
              <g key={point.date} className="cursor-pointer">
                {/* Invisible hover target */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Outer Glow Ring on Hover */}
                {isHovered ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    className="animate-ping opacity-75"
                  />
                ) : null}
                {/* Visible Data Dot */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHovered ? "4" : "2.5"}
                  fill={isHovered ? "#7C3AED" : "#2563EB"}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? "1.5" : "1"}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* X-Axis Date Labels */}
      <div className="flex justify-between gap-1 border-t border-border/40 pt-2 text-[11px] font-semibold text-muted">
        {data.map((item) => {
          const isSelected = hoveredPoint?.date === item.date;
          return (
            <span
              key={item.date}
              className={cn(
                "transition-colors duration-150",
                isSelected ? "text-primary font-bold" : "text-muted"
              )}
            >
              {item.date}
            </span>
          );
        })}
      </div>
    </div>
  );
}
