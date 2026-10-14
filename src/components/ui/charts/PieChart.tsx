// Pie chart component with SVG rendering
import { memo } from 'react';
import type { PieChartProps, ChartDataPoint } from './ChartBase';

const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-success)', 'var(--color-warning)', 'var(--color-error)', 'var(--color-info)'];

export function PieChart({ data, height = 300, width = 400, className = '' }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeAngle = 0;

  // Calculate total angle
  const segments = data.map((item, i) => {
    const angle = (item.value / total) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    const midAngle = startAngle + angle / 2;
    return { ...item, angle, startAngle, midAngle, color: item.color || COLORS[i % COLORS.length] };
  });

  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  const polarToCartesian = (angle: number, radius: number) => {
    return {
      x: centerX + radius * Math.cos((angle - 90) * Math.PI / 180),
      y: centerY + radius * Math.sin((angle - 90) * Math.PI / 180),
    };
  };

  const arcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(startAngle, radius);
    const end = polarToCartesian(endAngle, radius);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArc, 1, end.x, end.y,
      'Z',
    ].join(' ');
  };

  return (
    <div className={`chart-container chart-pie ${className}`} style={{ width: width, height: height }}>
      <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          {segments.map((seg, i) => (
            <path
              key={i}
              d={arcPath(seg.startAngle, seg.startAngle + seg.angle)}
              fill={seg.color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
              data-label={seg.label}
            />
          ))}
        </g>
      </svg>
      {/* Legend */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0.25rem 0',
            }}
          >
            <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: seg.color }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{seg.label}</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text)', fontWeight: 500 }}>
              {(seg.value / total * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(PieChart);
