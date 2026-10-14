// Chart data utilities - generate sample data for charts
import type { ChartDataPoint } from './ChartBase';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

export function generateLineData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let base = 50;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const volatility = (Math.sin(i / 5) * 15 + Math.random() * 10 - 5);
    const value = Math.max(0, base + volatility);
    data.push({ label, value, color: COLORS[0] });
    base += 0.5;
  }

  return data;
}

export function generateBarData(categories: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']): ChartDataPoint[] {
  return categories.map((cat, i) => ({
    label: cat,
    value: 40 + Math.random() * 60,
    color: COLORS[i % COLORS.length],
  }));
}

export function generatePieData(categories: string[] = ['Product A', 'Product B', 'Product C', 'Other']): ChartDataPoint[] {
  const values = [35, 25, 20, 20];
  return categories.map((label, i) => ({
    label,
    value: values[i % values.length],
    color: COLORS[i % COLORS.length],
  }));
}

export function generateAreaData(days: number = 30): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  let base = 30;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const trend = i * 0.4;
    const seasonal = Math.sin(i / 7) * 12;
    const noise = Math.random() * 8 - 4;
    const value = Math.max(0, base + trend + seasonal + noise);
    data.push({ label, value, color: COLORS[1] });
  }

  return data;
}
