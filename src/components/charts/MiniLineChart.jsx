import { useState, useRef } from "react";
import { cn } from "../../utils/cn";

export function MiniLineChart({ data = [], className }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  if (!data || !data.length) {
    return (
      <div className="flex h-52 flex-col items-center justify-center rounded-[24px] border border-dashed border-border p-6 text-center">
        <p className="text-sm font-semibold text-text">No trend data recorded yet</p>
        <p className="mt-1 text-xs text-muted">Click activity will be plotted here over time.</p>
      </div>
    );
  }

  // Calculate stats
  const totalCount = data.reduce((sum, item) => sum + (item.count || 0), 0);
  const maxCount = Math.max(...data.map((item) => item.count || 0), 1);
  const avgCount = (totalCount / data.length).toFixed(1);

  // ViewBox fixed dimensions (500 x 140)
  const viewBoxWidth = 500;
  const viewBoxHeight = 140;
  const padX = 24;
  const padYTop = 18;
  const padYBottom = 24;
  const usableWidth = viewBoxWidth - padX * 2;
  const usableHeight = viewBoxHeight - padYTop - padYBottom;

  // Map data to coordinates
  const points = data.map((item, index) => {
    const x = data.length === 1 ? viewBoxWidth / 2 : padX + (index / (data.length - 1)) * usableWidth;
    const ratio = (item.count || 0) / maxCount;
    const y = viewBoxHeight - padYBottom - ratio * usableHeight;
    return {
      ...item,
      count: item.count || 0,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      index,
    };
  });

  // Smooth SVG path construction
  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`;
    const prev = points[idx - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`;
  }, "");

  const firstPt = points[0];
  const lastPt = points[points.length - 1];
  const areaD = `${pathD} L ${lastPt.x},${viewBoxHeight - padYBottom} L ${firstPt.x},${viewBoxHeight - padYBottom} Z`;

  // Handle mouse interaction over the chart canvas
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const closestIdx = Math.round(ratio * (points.length - 1));
    setActiveIndex(closestIdx);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <div className={cn("rounded-[24px] border border-border bg-surface-alt/25 p-5 shadow-sm space-y-4", className)}>
      {/* Top Stats Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 text-xs">
        <div className="flex items-center gap-5">
          <div>
            <span className="text-muted font-medium">Total: </span>
            <span className="font-bold text-text text-sm">{totalCount}</span>
          </div>
          <div>
            <span className="text-muted font-medium">Peak: </span>
            <span className="font-bold text-primary text-sm">{maxCount}</span>
          </div>
          <div>
            <span className="text-muted font-medium">Avg/Day: </span>
            <span className="font-bold text-text text-sm">{avgCount}</span>
          </div>
        </div>

        {activePoint ? (
          <div className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-all">
            {activePoint.date}: <span className="font-bold">{activePoint.count} clicks</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted italic">Hover graph to inspect values</span>
        )}
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="relative pt-1 cursor-crosshair select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Grid Lines & Y-Labels */}
        <div className="pointer-events-none absolute inset-x-0 top-1 bottom-6 flex flex-col justify-between text-[10px] font-medium text-muted/50 px-1">
          <div className="flex justify-between border-b border-dashed border-border/30 pb-0.5">
            <span>{maxCount} clicks</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-border/20 pb-0.5">
            <span>{Math.round(maxCount / 2)} clicks</span>
          </div>
          <div className="flex justify-between border-b border-border/30 pb-0.5">
            <span>0 clicks</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="h-44 w-full overflow-visible"
        >
          <defs>
            <linearGradient id="thin-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="thin-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>

            {/* Glow Filter for Active Hover Point */}
            <filter id="active-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area Fill */}
          <path d={areaD} fill="url(#thin-area-gradient)" />

          {/* Thin Smooth Graph Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#thin-line-gradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical Guide Line on Hover */}
          {activePoint ? (
            <line
              x1={activePoint.x}
              y1={padYTop}
              x2={activePoint.x}
              y2={viewBoxHeight - padYBottom}
              stroke="rgba(37, 99, 235, 0.35)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}

          {/* Glowing Active Data Point on Hover Only */}
          {activePoint ? (
            <g className="transition-all duration-150">
              {/* Soft Ambient Radial Glow */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                fill="#2563EB"
                opacity="0.3"
                filter="url(#active-glow)"
              />
              {/* Outer Ring */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="4.5"
                fill="#ffffff"
                stroke="#2563EB"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Inner Glowing Core */}
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="2"
                fill="#7C3AED"
              />
            </g>
          ) : null}
        </svg>
      </div>

      {/* X-Axis Date Labels */}
      <div className="flex justify-between gap-1 border-t border-border/40 pt-2 text-[11px] font-semibold text-muted">
        {points.map((pt) => {
          const isSelected = activeIndex === pt.index;
          return (
            <span
              key={pt.date}
              className={cn(
                "transition-colors duration-150 cursor-pointer",
                isSelected ? "text-primary font-bold underline" : "text-muted hover:text-text"
              )}
              onMouseEnter={() => setActiveIndex(pt.index)}
            >
              {pt.date}
            </span>
          );
        })}
      </div>
    </div>
  );
}
