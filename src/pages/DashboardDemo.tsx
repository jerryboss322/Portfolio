import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { LineChart } from '../components/ui/charts/LineChart';
import { BarChart } from '../components/ui/charts/BarChart';
import { PieChart } from '../components/ui/charts/PieChart';
import { DataTable } from '../components/ui/DataTable';
import { ProgressBar } from '../components/ui/ProgressBar';
import { generateLineData, generateBarData, generatePieData } from '../components/ui/charts/chart-data';

export function DashboardDemo() {
  const [data] = useState(generateLineData(30));

  return (
    <DashboardLayout
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>Dashboard</span>
        </div>
      }
      sidebar={
        <div style={{ fontSize: '0.875rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>Quick Stats</h4>
          <ProgressBar value={85} max={100} size="sm" style={{ marginBottom: '0.5rem' }} />
          <ProgressBar value={65} max={100} size="sm" variant="warning" style={{ marginBottom: '0.5rem' }} />
          <ProgressBar value={42} max={100} size="sm" variant="success" />
        </div>
      }
      footer="Updated 5 minutes ago"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase' }}>Revenue</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>$48,295</span>
        </div>
        <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase' }}>Users</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>2,847</span>
        </div>
        <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase' }}>Conversion</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>3.2%</span>
        </div>
        <div style={{ padding: '1rem', background: 'var(--color-surface)', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500, textTransform: 'uppercase' }}>Bounce</span>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)' }}>45.1%</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Revenue Overview</h3>
          <LineChart data={data} height={200} width={600} />
        </div>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Monthly Sales</h3>
          <BarChart data={generateBarData()} height={200} width={600} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>User Distribution</h3>
          <PieChart data={generatePieData()} height={250} width={350} />
        </div>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Page Views</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>Today</span>
                <div style={{ width: '100%', height: '6px', background: 'var(--color-background)', borderRadius: '9999px' }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--color-primary)', borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>65%</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Sessions</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>Yesterday</span>
                <div style={{ width: '100%', height: '6px', background: 'var(--color-background)', borderRadius: '9999px' }}>
                  <div style={{ width: '80%', height: '100%', background: 'var(--color-primary)', borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>80%</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>Bounce Rate</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>This Week</span>
                <div style={{ width: '100%', height: '6px', background: 'var(--color-background)', borderRadius: '9999px' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--color-error)', borderRadius: '9999px' }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardDemo;
