import React from 'react';
import { Inbox, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DeptEmptyStateProps {
  title: string;
  description: string;
}

export const DeptEmptyState: React.FC<DeptEmptyStateProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-secondary border border-border-subtle rounded-lg my-6">
      <div className="w-20 h-20 rounded-full bg-state-green/10 text-state-green flex items-center justify-center mb-4 border border-state-green/20">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h3 className="text-base font-heading font-bold text-txt-primary mb-1">{title}</h3>
      <p className="text-xs text-txt-secondary max-w-sm">{description}</p>
    </div>
  );
};
