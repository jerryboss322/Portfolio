import { memo } from 'react';
import type { ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function ScatterChart({ data, height = 300, width = 600, showGrid = true, className = '' }: { data: ChartDataPoint[]; height?: number; width?: number; showGrid?: boolean; className?: string }) {
  const { padding, chartWidth, chartHeight, maxValue, points, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width);

  const xScale = (i: number) => padding.left + (chartWidth / Math.max(data.length - 1, 1)) * i;
  const yScale = (value: number) => padding.top + chartHeight - (value / maxValue) * chartHeight;

  return (
    <div className={`chart-container chart-scatter ${className}`} style={{ width: totalWidth, height: totalHeight }}>
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
        <g>
          {data.map((d, i) => {
            const x = xScale(i) + 20;
            const y = yScale(d.value);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={Math.max(5, (d.value / maxValue) * 10)}
                fill={d.color || 'var(--color-primary)'}
                opacity="0.7"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          {points.map((p, i) => (
            <text key={`label-${i}`} x={xScale(i) + 20} y={padding.top + chartHeight + 20} fontSize="11" fill="#64748B">
              {p.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default memo(ScatterChart);
