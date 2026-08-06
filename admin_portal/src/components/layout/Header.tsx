import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, Shield, UserCheck } from 'lucide-react';
import { useAdminAuth } from '../../context/AuthContext';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange }) => {
  const location = useLocation();
  const { user } = useAdminAuth();

  // Breadcrumbs title resolver
  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.includes('complaints')) return 'Complaints Management';
    if (path.includes('map')) return 'Live Spatial Map';
    if (path.includes('analytics')) return 'City Analytics';
    if (path.includes('reports')) return 'Executive Reports';
    return 'Command Dashboard';
  };

  return (
    <header className="admin-header">
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-txt-muted">Command</span>
        <span className="text-xs text-border-medium">/</span>
        <h1 className="text-sm font-heading font-bold text-txt-primary">{getBreadcrumb()}</h1>
      </div>

      {/* Center: Search */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by ID, Ward, MLA, MP, Category..."
          className="input pl-9 text-xs"
        />
      </div>

      {/* Right: User Profile Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-secondary border border-border-subtle">
          <div className="w-6 h-6 rounded-full bg-brand-muted text-brand font-bold text-xs flex items-center justify-center">
            {user?.name?.[0] || 'A'}
          </div>
          <span className="text-xs font-medium text-txt-primary">{user?.name}</span>
          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-brand-muted text-brand">
            {user?.role}
          </span>
        </div>
      </div>
    </header>
  );
};
