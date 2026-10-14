// Line chart component with SVG rendering
import { memo } from 'react';
import type { LineChartProps, ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

export function LineChart({ data, height = 300, width = 600, showGrid = true, showLabels = true, className = '' }: LineChartProps) {
  const { padding, chartWidth, chartHeight, maxValue, points, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width);

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} ${padding.top + chartHeight} L ${points[0]?.x || 0} ${padding.top + chartHeight} Z`;

  return (
    <div className={`chart-container chart-line ${className}`} style={{ width: totalWidth, height: totalHeight }}>
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
        <path
          d={areaPath}
          fill="url(#lineGradient)"
          opacity="0.15"
        />
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill="var(--color-primary)"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
            />
            {showLabels && i === points.length - 1 && (
              <text
                x={p.x + 10}
                y={p.y - 8}
                fontSize="11"
                fill="var(--color-text)"
                fontWeight="500"
              >
                {p.value.toFixed(1)}
              </text>
            )}
          </g>
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default memo(LineChart);
