import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Card } from "../../components/common/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { ErrorState } from "../../components/common/ErrorState";
import { Skeleton } from "../../components/common/Skeleton";
import { DoughnutChart } from "../../components/charts/DoughnutChart";
import { HorizontalBarList } from "../../components/charts/HorizontalBarList";
import { MiniLineChart } from "../../components/charts/MiniLineChart";
import { usePageTitle } from "../../hooks/usePageTitle";
import { analyticsService } from "../../services/analyticsService";
import { urlService } from "../../services/urlService";
import { groupByLabel, toDistributionEntries } from "../../utils/analytics";
import { formatDate, truncateMiddle } from "../../utils/formatters";

export default function AnalyticsPage() {
  usePageTitle("Analytics — Nexly");
  const [searchParams, setSearchParams] = useSearchParams();
  const [urls, setUrls] = useState([]);
  const [selectedId, setSelectedId] = useState(searchParams.get("id") || "");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = async (targetId) => {
    setLoading(true);
    setError(null);
    try {
      const urlsResponse = await urlService.listMine({ page: 0, size: 50, sortBy: "createdAt", direction: "desc" });
      const fetchedUrls = urlsResponse.data.content;
      setUrls(fetchedUrls);

      const resolvedId = targetId || fetchedUrls[0]?.id;
      if (!resolvedId) {
        setAnalytics(null);
        return;
      }

      setSelectedId(resolvedId);
      setSearchParams({ id: resolvedId });
      const analyticsResponse = await analyticsService.getUrlAnalytics(resolvedId);
      setAnalytics(analyticsResponse.data);
    } catch (fetchError) {
      setError(fetchError);
      toast.error(fetchError.response?.data?.message || "Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics(selectedId).catch(() => {});
  }, []);

  const browserData = useMemo(
    () => toDistributionEntries(groupByLabel(analytics?.recentClicks, (item) => item.browser)).slice(0, 5),
    [analytics]
  );
  const osData = useMemo(
    () => toDistributionEntries(groupByLabel(analytics?.recentClicks, (item) => item.operatingSystem)).slice(0, 5),
    [analytics]
  );
  const countryData = useMemo(
    () => toDistributionEntries(groupByLabel(analytics?.recentClicks, (item) => item.country)).slice(0, 5),
    [analytics]
  );
  const formattedDailyClicks = useMemo(() => {
    if (!analytics?.dailyClicks) return [];
    if (Array.isArray(analytics.dailyClicks)) {
      return analytics.dailyClicks.map((item) => ({
        date: item.date || item.day || "Date",
        count: item.count ?? item.clicks ?? 0,
      }));
    }
    if (typeof analytics.dailyClicks === "object") {
      return Object.entries(analytics.dailyClicks).map(([dateStr, count]) => ({
        date: new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: Number(count) || 0,
      }));
    }
    return [];
  }, [analytics]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-full overflow-hidden">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-14" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24 col-span-2 sm:col-span-1" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return <ErrorState description="We couldn't load analytics for the selected URL." onRetry={() => loadAnalytics(selectedId)} />;
  }

  if (!urls.length) {
    return (
      <EmptyState
        title="No URLs to analyze"
        description="Create your first short link to see click telemetry."
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5 max-w-full overflow-hidden">
      {/* Mobile-first Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Breadcrumb items={[{ label: "Workspace" }, { label: "Analytics" }]} />
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-label">Analytics</h1>
          <p className="text-xs text-label-secondary">Your link performance at a glance</p>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={selectedId}
            onChange={(event) => loadAnalytics(event.target.value)}
            className="w-full sm:w-64 rounded-apple-md border border-separator bg-surface px-3 py-2 text-xs sm:text-sm font-medium text-label focus:border-system-blue focus:outline-none shadow-sm cursor-pointer"
            aria-label="Select link for analytics"
          >
            {urls.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortCode} · {truncateMiddle(item.originalUrl, 20, 8)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {analytics ? (
        <>
          {/* Inspected Link Hero & Summary Stats */}
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-4 sm:p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-label-secondary">
                  Inspected Link
                </span>
                <div className="mt-1.5">
                  <a
                    href={analytics.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg sm:text-2xl font-bold text-system-blue hover:underline inline-flex items-center gap-1.5 break-all"
                  >
                    {analytics.shortUrl}
                    <FiExternalLink size={16} className="shrink-0 opacity-70" />
                  </a>
                </div>
                <p className="mt-1 text-xs text-label-secondary truncate max-w-full" title={analytics.originalUrl}>
                  {analytics.originalUrl}
                </p>
              </div>

              {/* Statistics: 2-column on mobile, 3-column on tablet/desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 border-t border-separator/60 pt-3.5">
                <div className="rounded-apple-md border border-separator bg-surface-secondary/40 p-2.5 text-center sm:text-left">
                  <p className="text-[11px] font-medium text-label-secondary">Total Clicks</p>
                  <p className="text-xl font-bold text-label mt-0.5">{analytics.clickCount}</p>
                </div>
                <div className="rounded-apple-md border border-separator bg-surface-secondary/40 p-2.5 text-center sm:text-left">
                  <p className="text-[11px] font-medium text-label-secondary">Created</p>
                  <p className="text-xs sm:text-sm font-semibold text-label mt-1">{formatDate(analytics.createdAt)}</p>
                </div>
                <div className="rounded-apple-md border border-separator bg-surface-secondary/40 p-2.5 text-center sm:text-left col-span-2 sm:col-span-1">
                  <p className="text-[11px] font-medium text-label-secondary">Last Active</p>
                  <p className="text-xs sm:text-sm font-semibold text-label mt-1">
                    {analytics.lastAccessedAt ? formatDate(analytics.lastAccessedAt) : "Never"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Click Volume Chart */}
            <Card className="p-4 sm:p-5">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-label tracking-tight">7-Day Click Activity</h3>
                <p className="text-xs text-label-secondary">Daily access volume for this link.</p>
              </div>
              <MiniLineChart data={formattedDailyClicks} />
            </Card>
          </div>

          {/* Breakdown Distribution Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DoughnutChart title="Browsers" items={browserData} />
            <DoughnutChart title="Operating Systems" items={osData} />
            <HorizontalBarList title="Top Locations" items={countryData} />
          </div>

          {/* Recent Clicks Audit Log (Responsive Table with Horizontal Scroll inside Card) */}
          <Card className="p-4 sm:p-5">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-label tracking-tight">Recent Access Events</h3>
              <p className="text-xs text-label-secondary">Live access log for this short link.</p>
            </div>

            <div className="overflow-hidden rounded-apple-lg border border-separator">
              <div className="overflow-x-auto">
                <table className="min-w-[540px] w-full divide-y divide-separator text-left text-xs">
                  <thead className="bg-surface-secondary/70 font-semibold uppercase text-label-secondary tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-2.5">Time</th>
                      <th className="px-3 py-2.5">Browser</th>
                      <th className="px-3 py-2.5">OS</th>
                      <th className="px-3 py-2.5">Country</th>
                      <th className="px-4 py-2.5 font-mono">IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-separator/60">
                    {analytics.recentClicks && analytics.recentClicks.length ? (
                      analytics.recentClicks.map((item, index) => {
                        const clickTime = item.accessedAt || item.timestamp || item.createdAt || item.time;
                        const browser = item.browser || item.browserName || "Unknown";
                        const os = item.operatingSystem || item.os || item.osName || "Unknown";
                        const country = item.country || item.countryCode || item.location || "Unknown";
                        const ip = item.ipAddress || item.ip || item.clientIp || "Unknown";

                        return (
                          <tr key={`${clickTime}-${index}`} className="hover:bg-surface-secondary/40">
                            <td className="px-4 py-2.5 font-medium text-label whitespace-nowrap">
                              {clickTime ? formatDate(clickTime, { includeTime: true }) : "—"}
                            </td>
                            <td className="px-3 py-2.5 text-label whitespace-nowrap">{browser}</td>
                            <td className="px-3 py-2.5 text-label whitespace-nowrap">{os}</td>
                            <td className="px-3 py-2.5 whitespace-nowrap">
                              <span className="inline-block rounded px-1.5 py-0.5 bg-surface-secondary text-[11px] font-medium text-label">
                                {country}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 font-mono text-label-tertiary whitespace-nowrap">{ip}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-label-secondary">
                          No click events logged for this URL yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
