import React from 'react';
import { useDeptAuth } from '../../context/AuthContext';

export const DeptHeader: React.FC = () => {
  const { user } = useDeptAuth();

  return (
    <header className="dept-header">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-txt-muted">Department</span>
        <span className="text-xs text-border-medium">/</span>
        <h1 className="text-sm font-heading font-bold text-txt-primary">{user?.departmentName}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border-subtle">
          <div className="w-6 h-6 rounded-full bg-state-cyan/20 text-state-cyan font-bold text-xs flex items-center justify-center">
            {user?.name?.[0] || 'D'}
          </div>
          <span className="text-xs font-medium text-txt-primary">{user?.name}</span>
          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-state-cyan/20 text-state-cyan">
            {user?.departmentCode}
          </span>
        </div>
      </div>
    </header>
  );
};
