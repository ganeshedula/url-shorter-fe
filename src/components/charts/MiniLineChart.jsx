import { useState, useRef } from "react";
import { cn } from "../../utils/cn";

export function MiniLineChart({ data = [], className }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  if (!data || !data.length) {
    return (
      <div className="flex h-40 flex-col items-center justify-center rounded-apple-lg border border-dashed border-separator p-6 text-center">
        <p className="text-sm font-medium text-label">No activity recorded</p>
        <p className="mt-1 text-xs text-label-secondary">Click volume will display here over time.</p>
      </div>
    );
  }

  const totalCount = data.reduce((sum, item) => sum + (item.count || 0), 0);
  const maxCount = Math.max(...data.map((item) => item.count || 0), 1);
  const avgCount = (totalCount / data.length).toFixed(1);

  const viewBoxWidth = 460;
  const viewBoxHeight = 120;
  const padX = 12;
  const padYTop = 14;
  const padYBottom = 20;
  const usableWidth = viewBoxWidth - padX * 2;
  const usableHeight = viewBoxHeight - padYTop - padYBottom;

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

  const handlePointerInteraction = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, mouseX / rect.width));
    const closestIdx = Math.round(ratio * (points.length - 1));
    setActiveIndex(closestIdx);
  };

  const handleMouseMove = (e) => {
    handlePointerInteraction(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handlePointerInteraction(e.touches[0].clientX);
    }
  };

  const handleLeave = () => {
    setActiveIndex(null);
  };

  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <div className={cn("space-y-3.5 w-full max-w-full overflow-hidden select-none", className)}>
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 border-b border-separator/60 pb-3 text-left">
        <div>
          <span className="text-[11px] font-medium text-label-secondary block">Total</span>
          <span className="text-base sm:text-lg font-bold text-label">{totalCount}</span>
        </div>
        <div>
          <span className="text-[11px] font-medium text-label-secondary block">Peak</span>
          <span className="text-base sm:text-lg font-bold text-system-blue">{maxCount}</span>
        </div>
        <div>
          <span className="text-[11px] font-medium text-label-secondary block">Avg/day</span>
          <span className="text-base sm:text-lg font-bold text-label">{avgCount}</span>
        </div>
      </div>

      {/* Active Point Pill on hover/touch */}
      {activePoint && (
        <div className="flex justify-center -my-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-system-blue/10 px-3 py-0.5 text-xs font-semibold text-system-blue border border-system-blue/20 shadow-sm animate-fade-in">
            <span>{activePoint.date}:</span>
            <span className="font-bold">{activePoint.count} clicks</span>
          </div>
        </div>
      )}

      {/* Responsive SVG Chart Container */}
      <div
        ref={containerRef}
        className="relative pt-1 cursor-crosshair touch-pan-y"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
      >
        {/* Subtle Horizontal Gridlines */}
        <div className="pointer-events-none absolute inset-x-0 top-1 bottom-5 flex flex-col justify-between text-[10px] font-medium text-label-tertiary px-0.5">
          <div className="border-b border-separator/30 pb-0.5 flex justify-between">
            <span>{maxCount}</span>
          </div>
          <div className="border-b border-separator/20 pb-0.5" />
          <div className="border-b border-separator/30 pb-0.5 flex justify-between">
            <span>0</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} className="h-32 sm:h-36 w-full overflow-visible">
          <defs>
            <linearGradient id="apple-spark-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#007AFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path d={areaD} fill="url(#apple-spark-gradient)" />

          {/* Sparkline */}
          <path
            d={pathD}
            fill="none"
            stroke="#007AFF"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Active Vertical Guideline */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={padYTop}
              x2={activePoint.x}
              y2={viewBoxHeight - padYBottom}
              stroke="rgba(0, 122, 255, 0.45)"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {/* Active Data Point */}
          {activePoint && (
            <g>
              <circle cx={activePoint.x} cy={activePoint.y} r="4.5" fill="#007AFF" />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="7"
                fill="none"
                stroke="#007AFF"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Clean, Non-overlapping X-Axis Date Labels */}
      <div className="flex justify-between border-t border-separator/50 pt-1.5 text-[10px] sm:text-[11px] font-medium text-label-secondary">
        {points.map((pt, i) => {
          const isSelected = activeIndex === pt.index;
          // On mobile, show first, middle, and last date, or every second date to avoid crowding
          const isMobileVisible = i === 0 || i === Math.floor(points.length / 2) || i === points.length - 1;

          return (
            <span
              key={pt.date}
              className={cn(
                "transition-colors duration-100 cursor-pointer",
                !isMobileVisible && "hidden sm:inline",
                isSelected ? "text-system-blue font-bold" : "text-label-tertiary hover:text-label"
              )}
              onClick={() => setActiveIndex(pt.index)}
            >
              {pt.date}
            </span>
          );
        })}
      </div>
    </div>
  );
}
