import React from 'react';
import { ShieldAlert, SearchX, Inbox, FilterX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  type?: 'search' | 'empty' | 'filter';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  type = 'empty',
  actionLabel,
  onAction,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <SearchX className="w-12 h-12 text-txt-muted" />;
      case 'filter':
        return <FilterX className="w-12 h-12 text-txt-muted" />;
      default:
        return <Inbox className="w-12 h-12 text-txt-muted" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-secondary border border-border-subtle rounded-lg my-6">
      <div className="w-20 h-20 rounded-full bg-surface-tertiary flex items-center justify-center mb-4 border border-border-subtle">
        {getIcon()}
      </div>
      <h3 className="text-base font-heading font-bold text-txt-primary mb-1">{title}</h3>
      <p className="text-xs text-txt-secondary max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary text-xs">
          {actionLabel}
        </button>
      )}
    </div>
  );
};
