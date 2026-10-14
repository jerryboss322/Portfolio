import { memo } from 'react';
import type { ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function PairChart({ data, height = 300, width = 600 }: { data: ChartDataPoint[]; height?: number; width?: number }) {
  const { padding, chartWidth, chartHeight, maxValue, points, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width, { top: 20, right: 40, bottom: 40, left: 50 });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padding.top + chartHeight} L ${points[0]?.x || 0} ${padding.top + chartHeight} Z`;

  const barWidth = Math.min(chartWidth / data.length - 0.5, 30);
  const bars = points.map((p, i) => ({
    x: padding.left + (chartWidth / data.length) * i + 2,
    y: p.y,
    height: p.y - padding.top,
    width: barWidth,
  }));

  return (
    <div className="chart-container chart-pair" style={{ width: totalWidth, height: totalHeight }}>
      <svg width={totalWidth} height={totalHeight}>
        <path d={areaPath} fill="var(--color-primary)" opacity="0.1" />
        <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.width} height={b.height} fill="var(--color-primary)" rx="4" opacity="0.6" />
        ))}
      </svg>
    </div>
  );
}

export default memo(PairChart);
