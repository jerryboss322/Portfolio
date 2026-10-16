// Bar chart component with SVG rendering
import { memo } from 'react';
import type { BarChartProps, ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function BarChart({ data, height = 300, width = 600, showGrid = true, showLabels = true, className = '' }: BarChartProps) {
  const { padding, chartWidth, chartHeight, maxValue, points, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width);
  const barWidth = Math.min(chartWidth / data.length - 0.5, 40);

  return (
    <div className={`chart-container chart-bar ${className}`} style={{ width: totalWidth, height: totalHeight }}>
      {showGrid && (
        <svg width={totalWidth} height={totalHeight} style={{ position: 'absolute', top: 0, left: 0 }}>
          {Array.from({ length: 5 }, (_, i) => {
            const y = padding.top + (chartHeight / 4) * i;
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                >
                  {(maxValue * (1 - i / 4)).toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>
      )}
      <svg width={totalWidth} height={totalHeight}>
        {data.map((item, i) => {
          const x = padding.left + (chartWidth / data.length) * i + 2;
          const barHeight = (item.value / maxValue) * chartHeight;
          const y = padding.top + chartHeight - barHeight;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={item.color || 'var(--color-primary)'}
              rx="4"
              className="cursor-pointer"
              onMouseEnter={(e) => {
                (e.target as SVGElement).style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                (e.target as SVGElement).style.opacity = '1';
              }}
            />
          );
        })}
        {showLabels && (
          <g>
            {data.map((item, i) => {
              const x = padding.left + (chartWidth / data.length) * i + barWidth / 2;
              const barHeight = (item.value / maxValue) * chartHeight;
              const y = padding.top + chartHeight - barHeight;
              return (
                <text
                  key={i}
                  x={x}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--color-text-secondary)"
                  fontWeight="500"
                >
                  {item.label}
                </text>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}

export default memo(BarChart);
