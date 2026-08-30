import { useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { FiActivity, FiArrowRight, FiLink2, FiMousePointer, FiTrendingUp } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Card } from "../../components/common/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { Skeleton } from "../../components/common/Skeleton";
import { Button } from "../../components/common/Button";
import { MiniLineChart } from "../../components/charts/MiniLineChart";
import { StatCard } from "../../components/url/StatCard";
import { useUrlLibrary } from "../../hooks/useUrlLibrary";
import { usePageTitle } from "../../hooks/usePageTitle";
import { formatDate, truncateMiddle } from "../../utils/formatters";

function buildRecentTrend(urls) {
  if (!urls || !urls.length) {
    return [];
  }

  const daysMap = {};
  const now = new Date();

  // Initialize last 7 days in chronological order
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    daysMap[key] = { date: label, count: 0, key };
  }

  urls.forEach((item) => {
    const createdKey = item.createdAt ? item.createdAt.slice(0, 10) : "";
    const accessedKey = item.lastAccessedAt ? item.lastAccessedAt.slice(0, 10) : "";
    const clicks = item.clickCount || 0;

    if (accessedKey && daysMap[accessedKey]) {
      daysMap[accessedKey].count += clicks;
    } else if (createdKey && daysMap[createdKey]) {
      daysMap[createdKey].count += clicks;
    }
  });

  const timeline = Object.values(daysMap);
  const totalClicksCalculated = timeline.reduce((sum, d) => sum + d.count, 0);
  const totalWorkspaceClicks = urls.reduce((sum, item) => sum + (item.clickCount || 0), 0);

  if (totalWorkspaceClicks > 0 && totalClicksCalculated === 0) {
    urls.forEach((item, index) => {
      const targetIdx = (timeline.length - 1) - (index % timeline.length);
      timeline[targetIdx].count += item.clickCount || 0;
    });
  }

  return timeline;
}

export default function DashboardOverviewPage() {
  usePageTitle("Dashboard — Nexly");
  const { globalSearch } = useOutletContext();
  const params = useMemo(
    () => ({
      page: 0,
      size: 12,
      sortBy: "createdAt",
      direction: "desc",
      search: globalSearch,
    }),
    [globalSearch]
  );
  const { data, loading, error, fetchUrls } = useUrlLibrary(params);

  const metrics = useMemo(() => {
    const totalLinks = data.content.length;
    const totalClicks = data.content.reduce((sum, item) => sum + item.clickCount, 0);
    const activeLinks = data.content.filter((item) => item.active).length;
    const todaysClicks = data.content
      .filter((item) => {
        if (!item.lastAccessedAt) return false;
        return new Date(item.lastAccessedAt).toDateString() === new Date().toDateString();
      })
      .reduce((sum, item) => sum + item.clickCount, 0);

    return { totalLinks, totalClicks, activeLinks, todaysClicks };
  }, [data.content]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-full overflow-hidden">
        <Skeleton className="h-6 w-36" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        description="We couldn't load your dashboard metrics."
        onRetry={() => fetchUrls(params)}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <Breadcrumb items={[{ label: "Workspace" }, { label: "Dashboard" }]} />
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">Overview</h1>
        </div>
        <Link to="/app/urls" className="self-start sm:self-auto">
          <Button size="sm">
            <span>Manage URLs</span>
            <FiArrowRight size={14} />
          </Button>
        </Link>
      </div>

      {/* KPI Cards: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard icon={FiLink2} label="Total links" value={metrics.totalLinks} color="system-blue" />
        <StatCard icon={FiMousePointer} label="Total clicks" value={metrics.totalClicks} color="system-purple" />
        <StatCard icon={FiActivity} label="Today's clicks" value={metrics.todaysClicks} color="system-green" />
        <StatCard icon={FiTrendingUp} label="Active links" value={metrics.activeLinks} color="system-orange" />
      </div>

      {/* Trends & Activity Grid */}
      <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-4 sm:p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-label tracking-tight">7-Day Click Activity</h2>
            <p className="text-xs text-label-secondary">Aggregated access volume across workspace links.</p>
          </div>
          <MiniLineChart data={buildRecentTrend(data.content)} />
        </Card>

        <Card className="p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-label tracking-tight">Recent Links</h2>
              <Link to="/app/urls" className="text-xs font-medium text-system-blue hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {data.content.length ? (
                data.content.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-apple-md border border-separator bg-surface-secondary/40 p-3 hover:bg-surface-secondary/80 transition-colors space-y-1"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-xs sm:text-sm font-semibold text-system-blue break-all flex-1">
                        {item.shortUrl}
                      </p>
                      <span className="text-xs font-bold text-label bg-surface px-2 py-0.5 rounded-full border border-separator shrink-0">
                        {item.clickCount || 0}
                      </span>
                    </div>
                    <p className="truncate text-xs text-label-secondary" title={item.originalUrl}>
                      {truncateMiddle(item.originalUrl, 38, 12)}
                    </p>
                    <p className="text-[11px] text-label-tertiary pt-0.5">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="No links yet"
                  description="Create your first link to see activity."
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
