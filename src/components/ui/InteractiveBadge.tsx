import React, { useState } from 'react';

interface InteractiveBadgeProps {
  label: string;
  tooltip?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
  onClick?: () => void;
}

/**
 * Interactive technology badge with hover tooltip and optional click action.
 * 
 * Variants:
 * - default: Gray badge for general tech
 * - primary: Indigo badge for key technologies
 * - success: Green badge for deployment/production
 * - warning: Amber badge for experimental/beta
 */
export const InteractiveBadge: React.FC<InteractiveBadgeProps> = ({
  label,
  tooltip,
  variant = 'default',
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const variantStyles = {
    default: 'border-line-faint bg-ink-800/60 text-muted hover:border-line-strong hover:text-bright',
    primary: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300 hover:border-indigo-500/50 hover:bg-indigo-500/20',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/20',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:border-amber-500/50 hover:bg-amber-500/20',
  };

  return (
    <div className="relative inline-block">
      <button
        className={`
          rounded-lg border px-2.5 py-1 text-[11px] font-medium
          transition-all duration-200
          ${onClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
          ${variantStyles[variant]}
        `}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {label}
      </button>

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 transform rounded-lg border border-line bg-ink-900 p-2 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <p className="text-[10px] leading-tight text-muted">{tooltip}</p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink-900"></div>
        </div>
      )}
    </div>
  );
};

export default InteractiveBadge;