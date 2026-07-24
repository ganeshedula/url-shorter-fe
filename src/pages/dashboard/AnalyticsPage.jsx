import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
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
  usePageTitle("Analytics");
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
      <div className="space-y-4">
        <Skeleton className="h-16" />
        <Skeleton className="h-80" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState description="We couldn't load analytics for the selected URL." onRetry={() => loadAnalytics(selectedId)} />;
  }

  if (!urls.length) {
    return (
      <EmptyState
        title="No analytics yet"
        description="Create your first short link and return here to inspect click activity."
      />
    );
  }

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Workspace" }, { label: "Analytics" }]} />
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl">URL analytics</h2>
            <p className="mt-2">Charts and breakdowns derived from the backend's per-URL analytics response.</p>
          </div>
          <select
            value={selectedId}
            onChange={(event) => loadAnalytics(event.target.value)}
            className="focus-ring glass-panel rounded-2xl px-4 py-3 text-sm font-semibold text-text"
            aria-label="Select URL for analytics"
          >
            {urls.map((item) => (
              <option key={item.id} value={item.id}>
                {item.shortCode} · {truncateMiddle(item.originalUrl, 18, 8)}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {analytics ? (
        <>
          <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">Selected URL</p>
              <h3 className="mt-3 text-2xl text-primary">{analytics.shortUrl}</h3>
              <p className="mt-3">{truncateMiddle(analytics.originalUrl, 45, 20)}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-border p-4">
                  <p className="text-sm font-semibold text-muted">Total clicks</p>
                  <h4 className="mt-2 text-2xl">{analytics.clickCount}</h4>
                </div>
                <div className="rounded-[24px] border border-border p-4">
                  <p className="text-sm font-semibold text-muted">Created</p>
                  <h4 className="mt-2 text-base">{formatDate(analytics.createdAt)}</h4>
                </div>
                <div className="rounded-[24px] border border-border p-4">
                  <p className="text-sm font-semibold text-muted">Last accessed</p>
                  <h4 className="mt-2 text-base">{formatDate(analytics.lastAccessedAt, { includeTime: true })}</h4>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="text-2xl">Clicks over time</h3>
              <p className="mt-2">Daily trend straight from the backend analytics payload.</p>
              <div className="mt-6">
                <MiniLineChart data={formattedDailyClicks} />
              </div>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <DoughnutChart title="Browser distribution" items={browserData} />
            <DoughnutChart title="OS distribution" items={osData} />
            <HorizontalBarList title="Top countries" items={countryData} />
          </div>

          <Card>
            <h3 className="text-2xl font-bold text-text">Recent click events</h3>
            <p className="mt-1.5 text-sm text-muted">Detailed log of recent access attempts for the selected short link.</p>
            <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-surface-alt/60 text-left">
                    <tr className="text-xs uppercase tracking-[0.18em] text-muted font-semibold">
                      <th className="px-5 py-4">Time</th>
                      <th className="px-5 py-4">Browser</th>
                      <th className="px-5 py-4">OS</th>
                      <th className="px-5 py-4">Country</th>
                      <th className="px-5 py-4">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {analytics.recentClicks && analytics.recentClicks.length ? (
                      analytics.recentClicks.map((item, index) => {
                        const clickTime = item.accessedAt || item.timestamp || item.createdAt || item.time;
                        const browser = item.browser || item.browserName || "Unknown";
                        const os = item.operatingSystem || item.os || item.osName || "Unknown";
                        const country = item.country || item.countryCode || item.location || "Unknown";
                        const ip = item.ipAddress || item.ip || item.clientIp || "Unknown";

                        return (
                          <tr key={`${clickTime}-${index}`} className="transition-colors hover:bg-surface-alt/25">
                            <td className="px-5 py-4 text-sm font-medium text-text">
                              {clickTime ? formatDate(clickTime, { includeTime: true }) : "Unknown time"}
                            </td>
                            <td className="px-5 py-4 text-sm font-semibold text-text">{browser}</td>
                            <td className="px-5 py-4 text-sm font-medium text-text">{os}</td>
                            <td className="px-5 py-4 text-sm font-medium text-text">
                              <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-alt/80 px-2.5 py-1 text-xs font-semibold text-text border border-border">
                                {country}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-sm font-mono text-muted">{ip}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-10 text-center text-sm font-medium text-muted">
                          No recent click events recorded for this URL yet.
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
