import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { FiActivity, FiLink2, FiMousePointer, FiTrendingUp } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Card } from "../../components/common/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { Skeleton } from "../../components/common/Skeleton";
import { MiniLineChart } from "../../components/charts/MiniLineChart";
import { StatCard } from "../../components/url/StatCard";
import { useUrlLibrary } from "../../hooks/useUrlLibrary";
import { usePageTitle } from "../../hooks/usePageTitle";
import { formatDate, truncateMiddle } from "../../utils/formatters";

function buildRecentTrend(urls) {
  return urls
    .slice(0, 7)
    .map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: item.clickCount,
    }))
    .reverse();
}

export default function DashboardOverviewPage() {
  usePageTitle("Dashboard");
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
      <div className="space-y-4">
        <Skeleton className="h-16" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <ErrorState
          description="We couldn't load your dashboard metrics from the current backend."
          onRetry={() => fetchUrls(params)}
        />
      );
  }

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Workspace" }, { label: "Dashboard" }]} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FiLink2} label="Total links" value={metrics.totalLinks} />
        <StatCard icon={FiMousePointer} label="Total clicks" value={metrics.totalClicks} />
        <StatCard icon={FiActivity} label="Today's clicks" value={metrics.todaysClicks} />
        <StatCard icon={FiTrendingUp} label="Active links" value={metrics.activeLinks} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <div className="mb-5">
            <h2 className="text-2xl">Recent trend</h2>
            <p className="mt-2">A lightweight overview powered by the click totals already returned in your URL list.</p>
          </div>
          <MiniLineChart data={buildRecentTrend(data.content)} />
        </Card>

        <Card>
          <div className="mb-5">
            <h2 className="text-2xl">Recent activity</h2>
            <p className="mt-2">Latest links from your current workspace.</p>
          </div>
          <div className="space-y-4">
            {data.content.length ? (
              data.content.slice(0, 5).map((item) => (
                <div key={item.id} className="rounded-[24px] border border-border p-4">
                  <p className="font-semibold text-primary">{item.shortUrl}</p>
                  <p className="mt-2 text-sm">{truncateMiddle(item.originalUrl)}</p>
                  <p className="mt-3 text-xs">{formatDate(item.createdAt, { includeTime: true })}</p>
                </div>
              ))
            ) : (
              <EmptyState
                title="No links yet"
                description="Create your first short link to unlock dashboard insights."
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
