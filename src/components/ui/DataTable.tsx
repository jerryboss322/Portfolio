// DataTable component - sortable, filterable, paginated table
import { useState, useMemo } from 'react';
import type { DataTableProps, DataTableColumn, TableRow } from '../../types/ui';

export function DataTable({
  columns,
  data,
  pageSize = 10,
  currentPage = 1,
  sortBy,
  sortDirection,
  onSort,
  filter,
  className = '',
}: DataTableProps) {
  const [page, setPage] = useState(currentPage);
  const [col, setCol] = useState<keyof TableRow>(sortBy || (columns[0]?.accessor as keyof TableRow) || 'id');
  const [dir, setDir] = useState<'asc' | 'desc'>(sortDirection || 'asc');

  const sortedData = useMemo(() => {
    let result = [...data];

    if (filter) {
      result = result.filter(row => {
        return columns.some(col => {
          const val = row[col.accessor as keyof TableRow];
          return val != null && String(val).toLowerCase().includes(filter.toLowerCase());
        });
      });
    }

    result = [...result].sort((a, b) => {
      const aVal = a[col];
      const bVal = b[col];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const comparison = String(aVal).localeCompare(String(bVal));
      return dir === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [data, filter, col, dir, columns]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (column: keyof TableRow) => {
    if (col === column) {
      setDir(dir === 'asc' ? 'desc' : 'asc');
    } else {
      setCol(column);
      setDir('asc');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={`data-table-container ${className}`}>
      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
            }}
          >
            Previous
          </button>
          <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;

