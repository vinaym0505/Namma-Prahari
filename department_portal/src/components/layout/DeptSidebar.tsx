import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Inbox, History, Building2, Radio } from 'lucide-react';
import { useDeptAuth, TEST_DEPT_ACCOUNTS } from '../../context/AuthContext';

export const DeptSidebar: React.FC = () => {
  const { user, switchDepartment } = useDeptAuth();

  return (
    <aside className="dept-sidebar w-64">
      {/* Brand & Department Badge */}
      <div className="brand-header flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-brand flex items-center justify-center text-white font-bold text-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="font-heading font-extrabold text-sm text-white">DEPT PORTAL</span>
        </div>

        {/* Department Switcher Dropdown (for testing RLS isolation) */}
        <div className="mt-2 p-2 rounded bg-surface-tertiary border border-border-subtle flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-txt-muted">Active Department</span>
          <select
            value={user?.departmentCode}
            onChange={(e) => switchDepartment(e.target.value as any)}
            className="bg-surface-primary text-txt-primary text-xs font-semibold rounded p-1 border border-border-medium outline-none cursor-pointer"
          >
            <option value="BBMP_ROAD">🚧 BBMP Road Dept</option>
            <option value="BBMP_SWM">🗑️ BBMP Garbage (SWM)</option>
            <option value="BWSSB_WATER">💧 BWSSB Water Dept</option>
            <option value="BESCOM_ELEC">⚡ BESCOM Electrical</option>
          </select>
        </div>
      </div>

      {/* Nav Queue items */}
      <div className="flex flex-col gap-1 mt-4">
        <span className="nav-section-label">Work Queue</span>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/queue"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Inbox className="w-4 h-4" />
          <span>Complaint Queue</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <History className="w-4 h-4" />
          <span>Audit History</span>
        </NavLink>
      </div>

      {/* Polling Footer */}
      <div className="mt-auto pt-4 border-t border-border-subtle flex items-center gap-2 px-3 py-2 rounded bg-surface-tertiary text-xs text-txt-secondary">
        <Radio className="w-3 h-3 text-state-green animate-pulse" />
        <span>RLS Scoped · 25s Polling</span>
      </div>
    </aside>
  );
};
