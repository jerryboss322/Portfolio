// Activity feed component - shows recent events
import type { ActivityItem } from '../../types/ui';
import { useState } from 'react';

export type { ActivityItem };

export interface ActivityConsumerProps {
  items: ActivityItem[];
  onItemClick?: (item: ActivityItem) => void;
  showPagination?: boolean;
  className?: string;
}

export function ActivityFeed({ items, onItemClick, showPagination = true, className = '' }: ActivityConsumerProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleItems = items.slice(0, visibleCount);

  if (items.length === 0) {
    return (
      <div className={`activity-feed ${className}`}>
        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>No activity yet</p>
      </div>
    );
  }

  return (
    <div className={`activity-feed ${className}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontWeight: 600, color: 'var(--color-text)' }}>Recent Activity</h3>
        {showPagination && items.length > 5 && (
          <button
            onClick={() => setVisibleCount((c) => c + 5)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              fontSize: '0.8125rem',
            }}
          >
            Load More
          </button>
        )}
      </div>
      <div className="activity-list">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="activity-item"
            onClick={() => onItemClick?.(item)}
            style={{ cursor: onItemClick ? 'pointer' : 'default' }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {item.user.charAt(0)}
            </div>
            <div style={{ marginLeft: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.125rem' }}>
                <span style={{ fontWeight: 500, color: 'var(--color-text)' }}>
                  {item.user} {item.action}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {item.timestamp}
                </span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{item.target}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
