import { memo } from 'react';
import type { ChartDataPoint } from './ChartBase';
import { getChartDimensions } from './ChartBase';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

export function RadarChart({ data, height = 300, width = 400, className = '' }: { data: ChartDataPoint[]; height?: number; width?: number; className?: string }) {
  const { points, maxValue, width: totalWidth, height: totalHeight } = getChartDimensions(data, height, width, { top: 20, right: 20, bottom: 20, left: 20 });
  const centerX = totalWidth / 2;
  const centerY = totalHeight / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const angleStep = (2 * Math.PI) / data.length;

  const generatePoints = (angleOffset: number) => {
    return points.map((p, i) => {
      const angle = i * angleStep + angleOffset;
      return {
        x: centerX + radius * (p.value / maxValue) * Math.cos(angle),
        y: centerY + radius * (p.value / maxValue) * Math.sin(angle),
        label: p.label,
        value: p.value,
      };
    });
  };

  const plot = generatePoints(0);
  const plotClosed = [...plot, plot[0]];

  return (
    <div className={`chart-container chart-radar ${className}`} style={{ width: totalWidth, height: totalHeight }}>
      <svg width={totalWidth} height={totalHeight}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          {Array.from({ length: 5 }, (_, i) => {
            const r = radius / 5 * (i + 1);
            return (
              <circle key={i} cx={0} cy={0} r={r} fill="none" stroke="#E2E8F0" strokeWidth="1" />
            );
          })}
          <polygon
            points={plotClosed.map(p => `${p.x},${p.y}`).join(' ')}
            fill="url(#radarGradient)"
            opacity="0.2"
          />
          <polygon
            points={plotClosed.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          {plot.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="var(--color-primary)" stroke="white" strokeWidth="2" />
              <text x={p.x + 8} y={p.y - 5} fontSize="11" fill="var(--color-text)" fontWeight="500">
                {p.value.toFixed(1)}
              </text>
            </g>
          ))}
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      </svg>
    </div>
  );
}

export default memo(RadarChart);
