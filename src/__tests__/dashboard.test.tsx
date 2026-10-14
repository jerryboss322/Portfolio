// Dashboard component tests
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LineChart } from '../components/ui/charts/LineChart';
import { BarChart } from '../components/ui/charts/BarChart';
import { PieChart } from '../components/ui/charts/PieChart';
import { AreaChart } from '../components/ui/charts/AreaChart';
import { DataTable } from '../components/ui/DataTable';
import { ProgressBar } from '../components/ui/ProgressBar';
import { DashboardDemo } from '../pages/DashboardDemo';

const sampleData = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
];

describe('LineChart', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LineChart data={[{ label: 'Jan', value: 10 }, { label: 'Feb', value: 20 }]} height={200} width={400} />
      </BrowserRouter>
    );
  });
});

describe('BarChart', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <BarChart data={[{ label: 'A', value: 10 }, { label: 'B', value: 20 }]} height={200} width={400} />
      </BrowserRouter>
    );
  });
});

describe('PieChart', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PieChart data={[{ label: 'A', value: 50 }, { label: 'B', value: 50 }]} height={200} width={200} />
      </BrowserRouter>
    );
  });
});

describe('AreaChart', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <AreaChart data={[{ label: 'Jan', value: 10 }, { label: 'Feb', value: 20 }]} height={200} width={400} />
      </BrowserRouter>
    );
  });
});

describe('DataTable', () => {
  test('renders table with data', () => {
    render(
      <BrowserRouter>
        <DataTable
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Name', accessor: 'name' },
          ]}
          data={sampleData}
          pageSize={5}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
  });

  test('renders empty state when no data', () => {
    render(
      <BrowserRouter>
        <DataTable
          columns={[{ header: 'ID', accessor: 'id' }]}
          data={[]}
          pageSize={5}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});

describe('ProgressBar', () => {
  test('renders with progress', () => {
    render(
      <ProgressBar value={75} max={100} />
    );
    expect(screen.getByText('75/100 (75.0%)')).toBeInTheDocument();
  });
});

describe('DashboardDemo', () => {
  test('renders dashboard components', () => {
    render(
      <BrowserRouter>
        <DashboardDemo />
      </BrowserRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
