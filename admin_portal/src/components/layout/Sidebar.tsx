import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListFilter,
  Map,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Shield,
  Radio,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  return (
    <aside className={`admin-sidebar ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-logo">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm tracking-tight text-white">NAMMA PRAHARI</span>
            <span className="text-[10px] text-txt-muted uppercase tracking-wider font-semibold">City Command</span>
          </div>
        )}
      </div>

      {/* Nav Section: Monitoring */}
      <div className="flex flex-col gap-1 mt-2">
        {!collapsed && <span className="nav-section-label">Monitoring</span>}
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title="Dashboard"
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/complaints"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title="Complaints"
        >
          <ListFilter className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Complaints</span>}
        </NavLink>

        <NavLink
          to="/map"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title="Live Map"
        >
          <Map className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Live Map</span>}
        </NavLink>
      </div>

      {/* Nav Section: Intelligence */}
      <div className="flex flex-col gap-1 mt-4">
        {!collapsed && <span className="nav-section-label">Intelligence</span>}
        
        <NavLink
          to="/analytics"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title="Analytics"
        >
          <BarChart3 className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Analytics</span>}
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title="Reports"
        >
          <FileText className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Reports</span>}
        </NavLink>
      </div>

      {/* Footer / Status */}
      <div className="mt-auto pt-4 border-t border-border-subtle flex flex-col gap-2">
        <button
          onClick={onToggleCollapse}
          className="nav-item text-txt-muted hover:text-txt-primary"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse Sidebar</span>}
        </button>

        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-surface-tertiary text-xs text-txt-secondary">
            <Radio className="w-3 h-3 text-state-green animate-pulse" />
            <span>Polling · Live 25s</span>
          </div>
        )}
      </div>
    </aside>
  );
};
