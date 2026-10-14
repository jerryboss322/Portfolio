import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { LineChart } from '../components/ui/charts/LineChart';
import { BarChart } from '../components/ui/charts/BarChart';
import { PieChart } from '../components/ui/charts/PieChart';
import { DataTable } from '../components/ui/DataTable';
import { ProgressBar } from '../components/ui/ProgressBar';
import { RealTimeWidget } from '../components/dashboard/RealTimeWidget';
import { ActivityFeed, ActivityItem } from '../components/dashboard/ActivityFeed';
import { StatusBadge } from '../components/dashboard/StatusBadge';
import { generateLineData, generateBarData, generatePieData } from '../components/ui/charts/chart-data';

const activities: ActivityItem[] = [
  { id: '1', user: 'Alice', action: 'created', target: 'Project "Portfolio Redesign"', timestamp: '2 min ago', color: '#2563EB' },
  { id: '2', user: 'Bob', action: 'updated', target: 'Pricing page', timestamp: '15 min ago', color: '#10B981' },
  { id: '3', user: 'Charlie', action: 'deleted', target: 'Old component "LegacyCard"', timestamp: '1 hour ago', color: '#EF4444' },
  { id: '4', user: 'Diana', action: 'published', target: 'Article "React 19 Guide"', timestamp: '3 hours ago', color: '#F59E0B' },
  { id: '5', user: 'Eve', action: 'commented', target: 'Issue #42: Dashboard performance', timestamp: '5 hours ago', color: '#8B5CF6' },
  { id: '6', user: 'Frank', action: 'merged', target: 'Pull request #156', timestamp: '1 day ago', color: '#06B6D4' },
];

export function DashboardPage() {
  const [lineData] = useState(generateLineData(30));
  const [barData] = useState(generateBarData());
  const [pieData] = useState(generatePieData());

  return (
    <DashboardLayout
      header={
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>Dashboard</h1>
            <StatusBadge status="online" label="All systems operational" size="sm" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <RealTimeWidget title="CPU" value="42" unit="%" color="#2563EB" />
            <RealTimeWidget title="Memory" value="68" unit="%" color="#10B981" />
            <RealTimeWidget title="Traffic" value="1.2" unit="k" color="#F59E0B" />
          </div>
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
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Dashboard v2.0</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>Last updated: {new Date().toLocaleString()}</span>
        </div>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <RealTimeWidget title="Revenue" value="48,295" unit="$" color="#2563EB" />
        <RealTimeWidget title="Active Users" value="2,847" unit="" color="#10B981" />
        <RealTimeWidget title="Conversion Rate" value="3.2" unit="%chg" color="#F59E0B" />
        <RealTimeWidget title="Server Load" value="68" unit="%of cap" color="#8B5CF6" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Revenue Trend</h3>
          <LineChart data={lineData} height={220} width={600} />
        </div>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Monthly Sales</h3>
          <BarChart data={barData} height={220} width={600} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>User Distribution</h3>
          <PieChart data={pieData} height={240} width={350} />
        </div>
        <div style={{ background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontWeight: 600, color: 'var(--color-text)' }}>Activity Feed</h3>
          <ActivityFeed items={activities} showPagination />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>Recent Users</h3>
          <button style={{ padding: '0.375rem 0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', cursor: 'pointer', fontSize: '0.8125rem' }}>View All</button>
        </div>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: 'role' },
            { header: 'Status', accessor: 'status' },
          ]}
          data={[
            { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
            { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
            { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
            { id: '4', name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
            { id: '5', name: 'Eva Martinez', email: 'eva@example.com', role: 'Editor', status: 'Active' },
            { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'Admin', status: 'Inactive' },
            { id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'User', status: 'Active' },
            { id: '8', name: 'Henry Wilson', email: 'henry@example.com', role: 'Editor', status: 'Active' },
          ]}
          pageSize={5}
        />
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
