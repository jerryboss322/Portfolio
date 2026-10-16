import { memo } from 'react';
import type { ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function StackedBarChart({ data, height = 300, width = 600, showGrid = true }: { data: ChartDataPoint[]; height?: number; width?: number; showGrid?: boolean; showLabels?: boolean }) {
  const { padding, chartWidth, chartHeight, maxValue, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width, { top: 20, right: 20, bottom: 40, left: 50 });

  const barGroupWidth = chartWidth / (data.length || 1);

  return (
    <div className="chart-container chart-stacked-bar" style={{ width: totalWidth, height: totalHeight }}>
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
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          const y = padding.top + chartHeight - barHeight;
          const x = padding.left + barGroupWidth * i + 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barGroupWidth - 4}
              height={barHeight}
              fill={item.color || 'var(--color-primary)'}
              rx="4"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default memo(StackedBarChart);