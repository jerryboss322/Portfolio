// Dashboard layout component with sidebar, header, and content grid
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  sidebar?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function DashboardLayout({ sidebar, header, children, footer }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'var(--color-background)',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Header */}
      {header && (
        <header style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          {header}
        </header>
      )}

      {/* Main content */}
      <div style={{
        display: 'flex',
        flex: 1,
      }}>
        {sidebar && (
          <aside style={{
            padding: '1.5rem',
            borderRight: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            width: '260px',
            flexShrink: 0,
          }}>
            {sidebar}
          </aside>
        )}
        <main style={{
          flex: 1,
          padding: '1.5rem',
          overflowX: 'auto',
        }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <footer style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          flexShrink: 0,
        }}>
          {footer}
        </footer>
      )}
    </div>
  );
}

export default DashboardLayout;
