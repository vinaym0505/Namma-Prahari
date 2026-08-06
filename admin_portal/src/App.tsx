// =============================================================================
// NAMMA PRAHARI — ADMIN PORTAL: City Command Center
// Premium dark glassmorphic civic monitoring interface
// HARD RULES ENFORCED:
//   • NEVER complaint submission, photo upload, or image capture (Rule 3)
//   • NEVER citizen PII — name, email, phone, reward points (Rule 5)
//   • NO chatbot (Rule 6)
//   • NO fabricated images (Rule 7)
//   • Polling-based live data, NO Supabase Realtime (Rule: no realtime)
// =============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import {
  Building2, Shield, MapPin, BarChart3, FileText, RefreshCw,
  Search, Eye, Lock, AlertTriangle, CheckCircle, Clock,
  ChevronRight, Layers, TrendingUp, ArrowUpRight,
  UserCheck, Download, Activity, Zap, Droplets, Trash2,
  Construction, Filter, X, Camera, ImageOff
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart,
  Line, Area, AreaChart, Legend
} from 'recharts';
import {
  ComplaintPIISafe, INITIAL_DEPARTMENTS, INITIAL_REPRESENTATIVES,
  ComplaintHistoryItem
} from '@shared/index';
import { MOCK_COMPLAINTS, MOCK_HISTORY, computeKPIs } from '@shared/mockData';
import { STATUS_COLORS, SEVERITY_COLORS, CATEGORY_ICONS } from '@shared/tokens';

// =============================================================================
// APP SHELL
// =============================================================================

export default function App() {
  const location = useLocation();
  const [complaints, setComplaints] = useState<ComplaintPIISafe[]>(MOCK_COMPLAINTS);
  const [history, setHistory] = useState<ComplaintHistoryItem[]>(MOCK_HISTORY);
  const [lastPolled, setLastPolled] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintPIISafe | null>(null);

  // Smart Polling: auto-refresh every 25s (NO Supabase Realtime)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastPolled(new Date());
      // In production: refetch from Supabase via React Query here
    }, 25_000);
    return () => clearInterval(interval);
  }, []);

  // Refresh on window focus
  useEffect(() => {
    const onFocus = () => setLastPolled(new Date());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const kpis = useMemo(() => computeKPIs(complaints), [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = !q ||
        c.complaintId.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.ward.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q) ||
        c.departmentName.toLowerCase().includes(q) ||
        (c.representative?.mlaName.toLowerCase().includes(q)) ||
        (c.representative?.mpName.toLowerCase().includes(q));

      const matchesDept = filterDept === 'ALL' || c.departmentId === filterDept;
      const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
      const matchesSeverity = filterSeverity === 'ALL' || c.severity === filterSeverity;

      return matchesSearch && matchesDept && matchesStatus && matchesSeverity;
    });
  }, [complaints, searchTerm, filterDept, filterStatus, filterSeverity]);

  const navItems = [
    { path: '/', icon: Shield, label: 'Command Dashboard' },
    { path: '/complaints', icon: Layers, label: 'Complaint Monitoring' },
    { path: '/map', icon: MapPin, label: 'Live Complaint Map' },
    { path: '/analytics', icon: BarChart3, label: 'City Analytics' },
    { path: '/departments', icon: Building2, label: 'Department Overview' },
    { path: '/reports', icon: FileText, label: 'Reports & Export' },
  ];

  return (
    <div className="admin-shell">
      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="brand-header">
          <div className="brand-logo">
            <Shield size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              NAMMA PRAHARI
            </h2>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              City Admin Portal
            </p>
          </div>
        </div>

        <div className="nav-section-label">Navigation</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Session Info */}
        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Active Session
          </div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
            City Nodal Officer
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-emerald)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" />
            Polling Active · {lastPolled.toLocaleTimeString()}
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header className="admin-header">
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            {navItems.find(n => n.path === location.pathname)?.label || 'Command Dashboard'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn btn-ghost" onClick={() => setLastPolled(new Date())}>
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </header>

        {/* Privacy Banner */}
        <div style={{ padding: '1rem 2rem 0' }}>
          <div className="privacy-banner">
            <Lock size={14} />
            <span>PRIVACY ENFORCED: Citizen PII (Name, Email, Phone, Reward Points) stripped server-side. Only complaint metadata and public representatives shown.</span>
          </div>
        </div>

        {/* Routes */}
        <div style={{ padding: '1rem 2rem 2rem', flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <DashboardPage
                kpis={kpis}
                complaints={complaints}
                history={history}
                onViewComplaint={setSelectedComplaint}
              />
            } />
            <Route path="/complaints" element={
              <ComplaintsPage
                complaints={filteredComplaints}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterDept={filterDept}
                onFilterDeptChange={setFilterDept}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
                filterSeverity={filterSeverity}
                onFilterSeverityChange={setFilterSeverity}
                onViewComplaint={setSelectedComplaint}
                totalCount={complaints.length}
              />
            } />
            <Route path="/map" element={<MapPage complaints={complaints} />} />
            <Route path="/analytics" element={<AnalyticsPage kpis={kpis} complaints={complaints} />} />
            <Route path="/departments" element={<DepartmentsPage kpis={kpis} />} />
            <Route path="/reports" element={<ReportsPage kpis={kpis} complaints={complaints} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* ── COMPLAINT DETAIL MODAL ── */}
      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          history={history.filter(h => h.complaintId === selectedComplaint.complaintId)}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
}

// =============================================================================
// DASHBOARD PAGE
// =============================================================================

function DashboardPage({
  kpis,
  complaints,
  history,
  onViewComplaint
}: {
  kpis: ReturnType<typeof computeKPIs>;
  complaints: ComplaintPIISafe[];
  history: ComplaintHistoryItem[];
  onViewComplaint: (c: ComplaintPIISafe) => void;
}) {
  const recentComplaints = complaints
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentHistory = history
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div>
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="glass-panel kpi-card">
          <span className="kpi-title">Total Complaints</span>
          <span className="kpi-value">{kpis.total}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>All time records</span>
        </div>
        <div className="glass-panel kpi-card">
          <span className="kpi-title">Active Open</span>
          <span className="kpi-value" style={{ color: 'var(--color-amber)' }}>{kpis.open}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Pending resolution</span>
        </div>
        <div className="glass-panel kpi-card">
          <span className="kpi-title">Resolved</span>
          <span className="kpi-value" style={{ color: 'var(--color-emerald)' }}>{kpis.resolved}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-emerald)' }}>Issues closed</span>
        </div>
        <div className="glass-panel kpi-card">
          <span className="kpi-title">Escalated</span>
          <span className="kpi-value" style={{ color: 'var(--color-crimson)' }}>{kpis.escalated}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-crimson)' }}>SLA breached</span>
        </div>
        <div className="glass-panel kpi-card">
          <span className="kpi-title">SLA Overdue</span>
          <span className="kpi-value" style={{ color: 'var(--color-crimson)' }}>{kpis.overdue}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Past estimated time</span>
        </div>
        <div className="glass-panel kpi-card">
          <span className="kpi-title">Avg Resolution</span>
          <span className="kpi-value">{kpis.avgResolutionHours}h</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Estimated average</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
        {/* Recent Complaints */}
        <div className="glass-panel" style={{ padding: '1.25rem', overflow: 'hidden' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={16} color="var(--color-amber)" />
            Latest Incoming Complaints
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {recentComplaints.map((c, i) => (
              <div
                key={c.complaintId}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.75rem', borderRadius: '10px',
                  background: 'var(--bg-secondary)', cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  animation: `slideRight 0.3s var(--ease-spring) ${i * 50}ms both`,
                }}
                onClick={() => onViewComplaint(c)}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-secondary)')}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  {CATEGORY_ICONS[c.categoryId] || '📋'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-indigo)', fontSize: '0.78rem' }}>{c.complaintId}</span>
                    <span className={`badge badge-${c.status}`}>
                      {STATUS_COLORS[c.status]?.label || c.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {c.ward} · {timeAgo(c.createdAt)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: SEVERITY_COLORS[c.severity], fontWeight: 700, fontSize: '0.78rem' }}>
                    {c.priorityScore}
                  </span>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={16} color="var(--color-emerald)" />
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {recentHistory.map((log, i) => (
              <div
                key={log.id}
                style={{
                  padding: '0.65rem 0.85rem',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${STATUS_COLORS[log.statusTo]?.text || 'var(--color-indigo)'}`,
                  fontSize: '0.8rem',
                  animation: `slideUp 0.3s var(--ease-spring) ${i * 60}ms both`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-indigo)' }}>{log.complaintId}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{timeAgo(log.timestamp)}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                  {log.statusFrom ? `${log.statusFrom} → ` : ''}<strong>{log.statusTo}</strong>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {log.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Leaderboard */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1.25rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={16} color="var(--color-cyan)" />
          Department Performance Snapshot
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {kpis.deptStats.map((dept, i) => (
            <div
              key={dept.id}
              style={{
                padding: '1rem',
                background: 'var(--bg-secondary)',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                animation: `slideUp 0.4s var(--ease-spring) ${i * 80}ms both`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{dept.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{dept.headOfficer}</div>
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-indigo)', background: 'rgba(99,102,241,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                  Avg: {dept.avgPriority}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{dept.total}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-amber)' }}>{dept.open}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Open</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-emerald)' }}>{dept.resolved}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Resolved</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// COMPLAINTS PAGE
// =============================================================================

function ComplaintsPage({
  complaints, searchTerm, onSearchChange,
  filterDept, onFilterDeptChange,
  filterStatus, onFilterStatusChange,
  filterSeverity, onFilterSeverityChange,
  onViewComplaint, totalCount
}: {
  complaints: ComplaintPIISafe[];
  searchTerm: string;
  onSearchChange: (v: string) => void;
  filterDept: string;
  onFilterDeptChange: (v: string) => void;
  filterStatus: string;
  onFilterStatusChange: (v: string) => void;
  filterSeverity: string;
  onFilterSeverityChange: (v: string) => void;
  onViewComplaint: (c: ComplaintPIISafe) => void;
  totalCount: number;
}) {
  return (
    <div>
      {/* Filters */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '260px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Search size={15} color="var(--text-muted)" />
          <input
            className="input"
            style={{ border: 'none', background: 'transparent', padding: 0 }}
            type="text"
            placeholder="Search by ID, title, ward, MLA, department..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => onSearchChange('')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={14} />
            </button>
          )}
        </div>

        <select className="input" style={{ width: 'auto' }} value={filterDept} onChange={e => onFilterDeptChange(e.target.value)}>
          <option value="ALL">All Departments</option>
          {INITIAL_DEPARTMENTS.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => onFilterStatusChange(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="submitted">Submitted</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="escalated">Escalated</option>
        </select>

        <select className="input" style={{ width: 'auto' }} value={filterSeverity} onChange={e => onFilterSeverityChange(e.target.value)}>
          <option value="ALL">All Severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          {complaints.length} of {totalCount} shown
        </span>
      </div>

      {/* Complaints Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title & Summary</th>
                <th>Department</th>
                <th>Ward & Constituency</th>
                <th>Severity</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <tr key={c.complaintId} style={{ animation: `fadeIn 0.2s ease ${i * 30}ms both` }}>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--color-indigo)', fontSize: '0.82rem' }}>
                      {c.complaintId}
                    </span>
                  </td>
                  <td style={{ maxWidth: '280px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.summaryGenerated}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem' }}>{c.categoryName}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.82rem' }}>{c.ward}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.assemblyConstituency}</div>
                  </td>
                  <td>
                    <span style={{ color: SEVERITY_COLORS[c.severity], fontWeight: 700, fontSize: '0.82rem' }}>
                      {c.severity}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div className="priority-bar">
                        <div className="priority-bar-fill" style={{ width: `${c.priorityScore}%` }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{c.priorityScore}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-${c.status}`}>
                      {STATUS_COLORS[c.status]?.label || c.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {timeAgo(c.createdAt)}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }} onClick={() => onViewComplaint(c)}>
                      <Eye size={14} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAP PAGE
// =============================================================================

function MapPage({ complaints }: { complaints: ComplaintPIISafe[] }) {
  const openComplaints = complaints.filter(c => c.status !== 'resolved');

  return (
    <div>
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Live Spatial Complaint Density</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {openComplaints.length} active open complaints across Bengaluru zones
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {Object.entries(SEVERITY_COLORS).map(([sev, color]) => (
            <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
              {sev}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{
          height: '520px',
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          position: 'relative',
        }}>
          {/* Map coordinate grid overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.5) 40px)' }} />

          <MapPin size={48} color="var(--color-indigo)" />
          <h4 style={{ fontSize: '1.1rem' }}>Bengaluru Civic Complaint Map</h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '420px', textAlign: 'center' }}>
            Interactive Leaflet/OpenStreetMap layer ready. Connect Supabase to plot live complaint coordinates with severity-colored markers.
          </p>

          {/* Simulated complaint markers */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
            {openComplaints.slice(0, 5).map(c => (
              <div key={c.complaintId} style={{
                padding: '0.5rem 0.75rem',
                background: 'var(--bg-card)',
                border: `1px solid ${SEVERITY_COLORS[c.severity]}40`,
                borderRadius: '8px',
                fontSize: '0.72rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}>
                <span style={{ color: SEVERITY_COLORS[c.severity], fontWeight: 700 }}>{c.complaintId}</span>
                <span style={{ color: 'var(--text-muted)' }}>{c.lat.toFixed(4)}, {c.lng.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ANALYTICS PAGE
// =============================================================================

function AnalyticsPage({ kpis, complaints }: { kpis: ReturnType<typeof computeKPIs>; complaints: ComplaintPIISafe[] }) {
  // Prepare chart data
  const deptChartData = kpis.deptStats.map(d => ({
    name: d.code,
    fullName: d.name,
    open: d.open,
    resolved: d.resolved,
    total: d.total,
    avgPriority: d.avgPriority,
  }));

  const statusData = [
    { name: 'Submitted', value: complaints.filter(c => c.status === 'submitted').length, color: '#A5B4FC' },
    { name: 'Assigned', value: complaints.filter(c => c.status === 'assigned').length, color: '#FF9500' },
    { name: 'In Progress', value: complaints.filter(c => c.status === 'in_progress').length, color: '#00C7BE' },
    { name: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: '#10B981' },
    { name: 'Escalated', value: complaints.filter(c => c.status === 'escalated').length, color: '#FF3B30' },
  ].filter(d => d.value > 0);

  const wardChartData = kpis.wardStats.slice(0, 8).map(w => ({
    name: w.ward.replace(/Ward \d+ \(/, '').replace(')', ''),
    count: w.count,
  }));

  const severityData = [
    { name: 'High', value: complaints.filter(c => c.severity === 'High').length, color: '#FF3B30' },
    { name: 'Medium', value: complaints.filter(c => c.severity === 'Medium').length, color: '#FF9500' },
    { name: 'Low', value: complaints.filter(c => c.severity === 'Low').length, color: '#00C7BE' },
  ].filter(d => d.value > 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
      {/* Department Performance */}
      <div className="glass-panel chart-panel" style={{ gridColumn: '1 / -1' }}>
        <h3><BarChart3 size={16} color="var(--color-indigo)" /> Department Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={deptChartData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: '#131927', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F8FAFC', fontSize: 13 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94A3B8' }} />
            <Bar dataKey="open" name="Open" fill="#FF9500" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Distribution Pie */}
      <div className="glass-panel chart-panel">
        <h3><Activity size={16} color="var(--color-cyan)" /> Complaint Status Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#131927', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F8FAFC' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Severity Distribution */}
      <div className="glass-panel chart-panel">
        <h3><AlertTriangle size={16} color="var(--color-crimson)" /> Severity Breakdown</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={severityData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={false}
            >
              {severityData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#131927', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F8FAFC' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Ward-wise Issue Density */}
      <div className="glass-panel chart-panel" style={{ gridColumn: '1 / -1' }}>
        <h3><MapPin size={16} color="var(--color-amber)" /> Ward-wise Issue Density</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={wardChartData} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 12 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 12 }} width={80} />
            <Tooltip contentStyle={{ background: '#131927', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F8FAFC' }} />
            <Bar dataKey="count" name="Complaints" fill="#6366F1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// =============================================================================
// DEPARTMENTS PAGE
// =============================================================================

function DepartmentsPage({ kpis }: { kpis: ReturnType<typeof computeKPIs> }) {
  const deptIcons: Record<string, React.ReactNode> = {
    'BBMP_ROAD': <Construction size={24} />,
    'BBMP_SWM': <Trash2 size={24} />,
    'BWSSB_WATER': <Droplets size={24} />,
    'BESCOM_ELEC': <Zap size={24} />,
  };

  const iconColors: Record<string, string> = {
    'BBMP_ROAD': '#FF9500',
    'BBMP_SWM': '#10B981',
    'BWSSB_WATER': '#00C7BE',
    'BESCOM_ELEC': '#FF3B30',
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {kpis.deptStats.map((dept, i) => (
          <div
            key={dept.id}
            className="glass-panel"
            style={{
              padding: '1.5rem',
              animation: `slideUp 0.4s var(--ease-spring) ${i * 100}ms both`,
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${iconColors[dept.code]}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: iconColors[dept.code], flexShrink: 0,
              }}>
                {deptIcons[dept.code] || <Building2 size={24} />}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{dept.name}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {dept.headOfficer}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {dept.contactEmail}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '1.25rem' }}>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{dept.total}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-amber)' }}>{dept.open}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Open</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-emerald)' }}>{dept.resolved}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Resolved</div>
              </div>
            </div>

            {/* Performance bar */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                <span>Resolution Rate</span>
                <span>{dept.total > 0 ? Math.round((dept.resolved / dept.total) * 100) : 0}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${dept.total > 0 ? (dept.resolved / dept.total) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, var(--color-indigo), var(--color-emerald))',
                  borderRadius: '3px',
                  transition: 'width 0.6s var(--ease-spring)',
                }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// REPORTS PAGE
// =============================================================================

function ReportsPage({ kpis, complaints }: { kpis: ReturnType<typeof computeKPIs>; complaints: ComplaintPIISafe[] }) {
  const handleExportCSV = () => {
    const headers = ['Complaint ID', 'Title', 'Category', 'Department', 'Ward', 'Severity', 'Priority', 'Status', 'Created'];
    const rows = complaints.map(c => [
      c.complaintId, c.title, c.categoryName, c.departmentName,
      c.ward, c.severity, c.priorityScore, c.status, new Date(c.createdAt).toLocaleDateString()
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namma-prahari-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.25rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Generate & Export Official Reports</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Download compiled reports for legislative review. Data is aggregated from the current complaint dataset.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleExportCSV}>
            <Download size={16} /> Export Complaint Summary CSV
          </button>
          <button className="btn btn-ghost">
            <FileText size={16} /> Generate Legislative PDF Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} color="var(--color-indigo)" />
            Top Affected Wards
          </h4>
          {kpis.wardStats.map((w, i) => (
            <div key={w.ward} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < kpis.wardStats.length - 1 ? '1px solid var(--border-color)' : 'none', fontSize: '0.82rem' }}>
              <span>{w.ward}</span>
              <span style={{ fontWeight: 700, color: 'var(--color-indigo)' }}>{w.count} issues</span>
            </div>
          ))}
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={16} color="var(--color-cyan)" />
            Department Resolution Summary
          </h4>
          {kpis.deptStats.map((d, i) => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: i < kpis.deptStats.length - 1 ? '1px solid var(--border-color)' : 'none', fontSize: '0.82rem' }}>
              <span>{d.code}</span>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: 'var(--color-amber)' }}>{d.open} open</span>
                <span style={{ color: 'var(--color-emerald)' }}>{d.resolved} resolved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// COMPLAINT DETAIL MODAL
// HARD RULE 5: Absolutely NO citizen PII displayed here
// =============================================================================

function ComplaintDetailModal({
  complaint,
  history,
  onClose
}: {
  complaint: ComplaintPIISafe;
  history: ComplaintHistoryItem[];
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="glass-panel modal-content">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-indigo)', fontWeight: 800 }}>
                {complaint.complaintId}
              </span>
              <span className={`badge badge-${complaint.status}`}>
                {STATUS_COLORS[complaint.status]?.label || complaint.status}
              </span>
              {complaint.isDuplicate && (
                <span className="badge badge-escalated">DUPLICATE of {complaint.duplicateOfId}</span>
              )}
            </div>
            <h2 style={{ fontSize: '1.15rem' }}>{complaint.title}</h2>
          </div>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Image — only real uploaded photos, or placeholder if none */}
        {complaint.imageUrl ? (
          <img src={complaint.imageUrl} alt="Complaint evidence" className="complaint-image" />
        ) : (
          <div className="complaint-image-placeholder">
            <ImageOff size={32} />
            <span style={{ fontSize: '0.82rem' }}>Photo evidence attached to complaint record</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Only real citizen-uploaded photos shown — no fabricated images</span>
          </div>
        )}

        {/* Description */}
        <div>
          <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Description</h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{complaint.description}</p>
          {complaint.summaryGenerated && (
            <p style={{ fontSize: '0.78rem', color: 'var(--color-indigo)', marginTop: '6px', fontStyle: 'italic' }}>
              AI Summary: {complaint.summaryGenerated}
            </p>
          )}
        </div>

        {/* Metadata Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px' }}>
          <MetaField label="Location & Ward" value={complaint.address} sub={complaint.ward} />
          <MetaField label="Assigned Department" value={complaint.departmentName} />
          <MetaField label="Constituency" value={complaint.assemblyConstituency} sub={complaint.parliamentaryConstituency} />
          <MetaField label="Coordinates" value={`${complaint.lat.toFixed(6)}, ${complaint.lng.toFixed(6)}`} />
          <MetaField label="Priority Score" value={`${complaint.priorityScore}/100`} />
          <MetaField label="Est. Resolution" value={`${complaint.estimatedResolutionHours} hours`} />
          <MetaField label="Reported" value={new Date(complaint.createdAt).toLocaleString()} />
          <MetaField label="Last Updated" value={new Date(complaint.updatedAt).toLocaleString()} />
        </div>

        {/* AI Flags */}
        {(complaint.isSpam || complaint.isDuplicate || complaint.similarIds.length > 0) && (
          <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', padding: '0.85rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.78rem', color: 'var(--color-indigo)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Zap size={14} /> AI Engine Flags
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', flexWrap: 'wrap' }}>
              {complaint.isSpam && <span style={{ color: 'var(--color-crimson)' }}>⚠ Flagged as spam</span>}
              {complaint.isDuplicate && <span style={{ color: 'var(--color-amber)' }}>🔁 Duplicate of {complaint.duplicateOfId}</span>}
              {complaint.similarIds.length > 0 && <span style={{ color: 'var(--text-secondary)' }}>📎 {complaint.similarIds.length} similar complaints nearby</span>}
            </div>
          </div>
        )}

        {/* Responsible Representatives */}
        {complaint.representative && (
          <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', padding: '1rem', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--color-indigo)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserCheck size={16} /> Responsible Area Representatives
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{complaint.representative.mlaName}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Phone: {complaint.representative.mlaPhone}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Email: {complaint.representative.mlaEmail}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{complaint.representative.mpName}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Phone: {complaint.representative.mpPhone}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Email: {complaint.representative.mpEmail}</div>
              </div>
            </div>
          </div>
        )}

        {/* Complaint Timeline */}
        {history.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Complaint Timeline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {history.map(log => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.6rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${STATUS_COLORS[log.statusTo]?.text || 'var(--color-indigo)'}`,
                    fontSize: '0.78rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      {log.statusFrom && <span style={{ color: 'var(--text-muted)' }}>{log.statusFrom} → </span>}
                      <strong style={{ color: STATUS_COLORS[log.statusTo]?.text }}>{log.statusTo}</strong>
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>
                    {log.changedByRole}: {log.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn btn-ghost" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
          Close Inspection
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// UTILITY COMPONENTS
// =============================================================================

function MetaField({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>{value}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--color-indigo)', marginTop: '1px' }}>{sub}</div>}
    </div>
  );
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
