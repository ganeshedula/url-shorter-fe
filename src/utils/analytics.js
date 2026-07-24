export function getDailyTrendPoints(dailyClicks = []) {
  if (!dailyClicks.length) {
    return [];
  }

  const maxValue = Math.max(...dailyClicks.map((item) => item.count), 1);

  return dailyClicks.map((item, index) => ({
    ...item,
    x: dailyClicks.length === 1 ? 0 : (index / (dailyClicks.length - 1)) * 100,
    y: 100 - (item.count / maxValue) * 100,
  }));
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
