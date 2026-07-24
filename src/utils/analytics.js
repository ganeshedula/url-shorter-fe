export function getDailyTrendPoints(dailyClicks = [], padding = 16) {
  if (!dailyClicks.length) {
    return [];
  }

  const values = dailyClicks.map((item) => item.count || 0);
  const maxValue = Math.max(...values, 1);
  const availableHeight = 100 - padding * 2;

  return dailyClicks.map((item, index) => {
    const count = item.count || 0;
    const x = dailyClicks.length === 1 ? 50 : (index / (dailyClicks.length - 1)) * 100;
    const ratio = count / maxValue;
    const y = (100 - padding) - ratio * availableHeight;

    return {
      ...item,
      count,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
    };
  });
}

export function groupByLabel(list = [], getLabel) {
  return list.reduce((acc, item) => {
    const label = getLabel(item) || "Unknown";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});
}

export function toDistributionEntries(groupedRecord = {}) {
  return Object.entries(groupedRecord)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export function getRingSegments(items = []) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  let offset = 0;

  return items.map((item, index) => {
    const share = (item.value / total) * 100;
    const segment = {
      ...item,
      color: ["#2563EB", "#7C3AED", "#06B6D4", "#22C55E", "#EF4444"][index % 5],
      offset,
      share,
    };
    offset += share;
    return segment;
  });
}
