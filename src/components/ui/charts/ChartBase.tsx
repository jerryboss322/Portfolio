// Base chart component types and utilities
import { useState, useRef, useEffect } from 'react';

export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface LineChartProps {
  data: ChartDataPoint[];
  type?: ChartType;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

export interface BarChartProps {
  data: ChartDataPoint[];
  type?: ChartType;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

export interface PieChartProps {
  data: ChartDataPoint[];
  height?: number;
  width?: number;
  className?: string;
}

export interface AreaChartProps {
  data: ChartDataPoint[];
  type?: ChartType;
  height?: number;
  width?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  className?: string;
}

// Simple SVG helper for creating SVG elements
const createSVGElement = (tag: string, attrs: Record<string, string | number>) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, String(value));
  }
  return el;
};

// Calculate chart dimensions
export function getChartDimensions(
  data: ChartDataPoint[],
  height = 300,
  width = 600,
  padding = { top: 20, right: 20, bottom: 40, left: 50 }
) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1 || 1)) * chartWidth,
    y: padding.top + chartHeight - (d.value / maxValue) * chartHeight,
    ...d,
  }));

  return {
    padding,
    chartWidth,
    chartHeight,
    maxValue,
    points,
    width,
    height,
  };
}
