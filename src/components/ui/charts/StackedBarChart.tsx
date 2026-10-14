import { memo } from 'react';
import type { ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function StackedBarChart({ data, height = 300, width = 600, showGrid = true, showLabels = true }: { data: ChartDataPoint[]; height?: number; width?: number; showGrid?: boolean; showLabels?: boolean }) {
  const { padding, chartWidth, chartHeight, maxValue } = getChartDimensions(data, height, width, { top: 20, right: 20, bottom: 40, left: 50 });

  const categories = Array.from({ length: data.length }, (_, i) => data[i].label || `Category ${i + 1}`);
  const series = data[0]?.series || [];
  const totalValues = Array(series.length).fill(0).map((_, i) => series[i].values.reduce((a, b) => a + b, 0));

  return (
    <div className="chart-container chart-stacked-bar" style={{ width: padding.left + chartWidth + padding.right, height: padding.top + chartHeight + padding.bottom }}>
      {showGrid && (
        <svg width={totalWidth} height={totalHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
          {Array.from({ length: 5 }, (_, i) => {
            const y = padding.top + (chartHeight / 4) * i;
            return (
              <g key={i}>
                <line x1={padding.left} y1={y} x2={padding.left + chartWidth} y2={y} stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1" />
                <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">{(maxValue * (1 - i / 4)).toFixed(1)}</text>
              </g>
            );
          })}
        </svg>
      )}
      <svg width={totalWidth} height={totalHeight}>
        {series.map((series, si) => {
          const seriesTotal = series.values.reduce((a, b) => a + b, 0);
          let cumulative = 0;
          return series.values.map((value, vi) => {
            const x = padding.left + (chartWidth / data.length) * vi;
            const barHeight = (value / maxValue) * chartHeight;
            const y = padding.top + chartHeight - barHeight - cumulative;
            cumulative += value;
            return (
              <rect
                key={vi}
                x={x}
                y={y}
                width={chartWidth / data.length - 1}
                height={barHeight}
                fill={series.color || `var(--color-primary)`}
              />
            );
          });
        })}
      </svg>
    </div>
  );
}

export default memo(StackedBarChart);
