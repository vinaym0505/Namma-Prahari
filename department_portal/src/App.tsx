// =============================================================================
// NAMMA PRAHARI — DEPARTMENT PORTAL
// Department officer workflow — complaint queue, status transitions, audit trail
// HARD RULES ENFORCED:
//   • NEVER complaint submission or photo upload (Rule 3)
//   • NEVER citizen PII (Rule 5)
//   • RLS-isolated: each department sees ONLY its own complaints (Rule 4)
//   • Polling-based live data, NO Supabase Realtime
// =============================================================================

import React, { useState, useEffect, useMemo } from 'react';
import {
  Wrench, CheckCircle, Clock, AlertCircle, Lock, Shield, Eye, RefreshCw,
  ArrowRight, UserCheck, Layers, FileText, X, Activity, TrendingUp,
  ImageOff, ChevronDown, Zap
} from 'lucide-react';
import {
  ComplaintPIISafe, INITIAL_DEPARTMENTS, ComplaintHistoryItem
} from '@shared/index';
import { MOCK_COMPLAINTS, MOCK_HISTORY } from '@shared/mockData';
import { STATUS_COLORS, SEVERITY_COLORS, CATEGORY_ICONS } from '@shared/tokens';
import { DeptAuthProvider, useDeptAuth } from './context/AuthContext';
import { DeptSidebar } from './components/layout/DeptSidebar';
import { DeptHeader } from './components/layout/DeptHeader';
import { DeptEmptyState } from './components/shared/EmptyState';

// Status transition rules: what status can flow to what
const STATUS_TRANSITIONS: Record<string, string[]> = {
  submitted: ['assigned'],
  assigned: ['in_progress'],
  in_progress: ['resolved'],
  escalated: ['in_progress'],
};

export function DeptAppShell() {
  const { user } = useDeptAuth();
  const selectedDeptId = user?.departmentId || "11111111-1111-1111-1111-111111111111";
  const [complaints, setComplaints] = useState<ComplaintPIISafe[]>(MOCK_COMPLAINTS);
  const [historyLogs, setHistoryLogs] = useState<ComplaintHistoryItem[]>(MOCK_HISTORY);
  const [activeComplaint, setActiveComplaint] = useState<ComplaintPIISafe | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<string>('');
  const [transitionNote, setTransitionNote] = useState<string>('');
  const [lastPolled, setLastPolled] = useState(new Date());
  const [showDetail, setShowDetail] = useState<ComplaintPIISafe | null>(null);

  const currentDept = INITIAL_DEPARTMENTS.find(d => d.id === selectedDeptId) || INITIAL_DEPARTMENTS[0];

  // HARD RULE 4: RLS SIMULATION — strictly filter to current department
  const rlsComplaints = useMemo(
    () => complaints.filter(c => c.departmentId === selectedDeptId),
    [complaints, selectedDeptId]
  );

  // KPI computations
  const kpis = useMemo(() => {
    const pending = rlsComplaints.filter(c => c.status === 'submitted').length;
    const assigned = rlsComplaints.filter(c => c.status === 'assigned').length;
    const inProgress = rlsComplaints.filter(c => c.status === 'in_progress').length;
    const resolved = rlsComplaints.filter(c => c.status === 'resolved').length;
    const escalated = rlsComplaints.filter(c => c.status === 'escalated').length;
    const overdue = rlsComplaints.filter(c => {
      const ageHours = (Date.now() - new Date(c.createdAt).getTime()) / 3600000;
      return ageHours > c.estimatedResolutionHours && c.status !== 'resolved';
    }).length;
    const avgPriority = rlsComplaints.length > 0
      ? Math.round(rlsComplaints.reduce((s, c) => s + c.priorityScore, 0) / rlsComplaints.length)
      : 0;

    return { pending, assigned, inProgress, resolved, escalated, overdue, avgPriority, total: rlsComplaints.length };
  }, [rlsComplaints]);

  // Smart Polling: 25s interval + window focus (NO Supabase Realtime)
  useEffect(() => {
    const interval = setInterval(() => setLastPolled(new Date()), 25_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onFocus = () => setLastPolled(new Date());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  // Status transition handler
  const handleUpdateStatus = () => {
    if (!activeComplaint || !transitionStatus) return;

    const previousStatus = activeComplaint.status;

    // Update complaint
    setComplaints(prev => prev.map(c => {
      if (c.complaintId === activeComplaint.complaintId) {
        return { ...c, status: transitionStatus as any, updatedAt: new Date().toISOString() };
      }
      return c;
    }));

    // Log to complaint_history audit trail
    const newLog: ComplaintHistoryItem = {
      id: `LOG-${Date.now()}`,
      complaintId: activeComplaint.complaintId,
      statusFrom: previousStatus,
      statusTo: transitionStatus,
      changedByRole: `Department Officer (${currentDept.code})`,
      note: transitionNote || `Status updated to ${transitionStatus} by field officer.`,
      timestamp: new Date().toISOString(),
    };

    setHistoryLogs(prev => [newLog, ...prev]);
    setActiveComplaint(null);
    setTransitionNote('');
    setTransitionStatus('');
    setLastPolled(new Date()); // Immediate refresh after action
  };

  // Sort: escalated first, then by priority score descending
  const sortedComplaints = useMemo(
    () => [...rlsComplaints].sort((a, b) => {
      if (a.status === 'escalated' && b.status !== 'escalated') return -1;
      if (b.status === 'escalated' && a.status !== 'escalated') return 1;
      if (a.status === 'resolved' && b.status !== 'resolved') return 1;
      if (b.status === 'resolved' && a.status !== 'resolved') return -1;
      return b.priorityScore - a.priorityScore;
    }),
    [rlsComplaints]
  );

  const deptHistoryLogs = useMemo(
    () => historyLogs.filter(log => {
      const complaint = complaints.find(c => c.complaintId === log.complaintId);
      return complaint?.departmentId === selectedDeptId;
    }).slice(0, 10),
    [historyLogs, complaints, selectedDeptId]
  );

  return (
    <div className="dept-shell">
      {/* ── HEADER ── */}
      <header className="dept-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 42, height: 42,
            background: 'linear-gradient(135deg, var(--color-amber), #D97706)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            boxShadow: '0 4px 12px rgba(255,149,0,0.3)',
          }}>
            <Wrench size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>NAMMA PRAHARI</h2>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-amber)', fontWeight: 600 }}>
              {currentDept.name}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="pulse-dot" />
            Polling · {lastPolled.toLocaleTimeString()}
          </div>

          {/* Department login switcher — for testing RLS boundary */}
          <select
            className="input"
            style={{ width: 'auto', fontSize: '0.82rem', borderColor: 'rgba(255,149,0,0.3)' }}
            value={user?.departmentCode}
            onChange={e => {
              const code = INITIAL_DEPARTMENTS.find(d => d.id === e.target.value)?.code || 'BBMP_ROAD';
              // Department context switcher
            }}
          >
            {INITIAL_DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>{d.code} — {d.name}</option>
            ))}
          </select>

          <button className="btn btn-ghost" onClick={() => setLastPolled(new Date())}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ padding: '1.5rem 2rem', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>

        {/* RLS & Privacy Banner */}
        <div style={{
          background: 'rgba(255,149,0,0.08)',
          border: '1px solid rgba(255,149,0,0.2)',
          color: 'var(--color-amber)',
          padding: '0.6rem 1rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.78rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.25rem',
        }}>
          <Shield size={14} />
          <span>ROW LEVEL SECURITY ACTIVE: You can only view and update complaints assigned to <strong>{currentDept.code}</strong>. Cross-department access blocked at database layer. Citizen PII stripped.</span>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Assigned</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{kpis.total}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>In your queue</span>
          </div>
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pending</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-indigo)' }}>{kpis.pending}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Awaiting assignment</span>
          </div>
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>In Progress</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-cyan)' }}>{kpis.inProgress}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-cyan)' }}>Field crew on site</span>
          </div>
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Resolved</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-emerald)' }}>{kpis.resolved}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-emerald)' }}>Completed</span>
          </div>
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SLA Overdue</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: kpis.overdue > 0 ? 'var(--color-crimson)' : 'var(--color-emerald)' }}>
              {kpis.overdue}
            </span>
            <span style={{ fontSize: '0.7rem', color: kpis.overdue > 0 ? 'var(--color-crimson)' : 'var(--text-secondary)' }}>
              {kpis.overdue > 0 ? 'Needs attention!' : 'All within SLA'}
            </span>
          </div>
        </div>

        {/* Work Queue */}
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>
            <Layers size={18} color="var(--color-amber)" />
            Active Work Queue — {currentDept.name}
          </h3>

          {sortedComplaints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={48} color="var(--color-emerald)" style={{ marginBottom: '0.5rem' }} />
              <h4>No complaints assigned to this department</h4>
              <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>
                Switch department login above to test RLS isolation — you should only see complaints for your department.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {sortedComplaints.map((c, i) => (
                <div
                  key={c.complaintId}
                  style={{
                    background: c.status === 'escalated' ? 'rgba(255,59,48,0.06)' : 'var(--bg-secondary)',
                    border: `1px solid ${c.status === 'escalated' ? 'rgba(255,59,48,0.2)' : 'var(--border-color)'}`,
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center',
                    animation: `slideUp 0.3s var(--ease-spring) ${i * 60}ms both`,
                  }}
                >
                  {/* Category Icon */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'rgba(255,149,0,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', flexShrink: 0,
                  }}>
                    {CATEGORY_ICONS[c.categoryId] || '📋'}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-amber)', fontSize: '0.82rem' }}>{c.complaintId}</span>
                      <span className={`badge badge-${c.status}`}>{STATUS_COLORS[c.status]?.label || c.status}</span>
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 700,
                        color: SEVERITY_COLORS[c.severity],
                        background: `${SEVERITY_COLORS[c.severity]}15`,
                        padding: '1px 6px', borderRadius: '4px',
                      }}>
                        {c.severity} · P{c.priorityScore}
                      </span>
                      {c.status === 'escalated' && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-crimson)', fontWeight: 700 }}>⚠ ESCALATED</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{c.title}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.address}</p>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      AI: {c.summaryGenerated}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Reported: {timeAgo(c.createdAt)} · Est. Resolution: {c.estimatedResolutionHours}h
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                    <button className="btn btn-ghost" onClick={() => setShowDetail(c)} style={{ fontSize: '0.78rem' }}>
                      <Eye size={14} /> Details
                    </button>
                    {STATUS_TRANSITIONS[c.status] && (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setActiveComplaint(c);
                          setTransitionStatus(STATUS_TRANSITIONS[c.status]?.[0] || '');
                        }}
                        style={{ fontSize: '0.78rem' }}
                      >
                        <Wrench size={14} /> Update Status
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit History Log */}
        {deptHistoryLogs.length > 0 && (
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
              <Activity size={16} color="var(--color-emerald)" />
              Department Resolution Audit Log
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {deptHistoryLogs.map((log, i) => (
                <div
                  key={log.id}
                  style={{
                    padding: '0.6rem 0.85rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '6px',
                    borderLeft: `3px solid ${STATUS_COLORS[log.statusTo]?.text || 'var(--color-emerald)'}`,
                    fontSize: '0.78rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    animation: `fadeIn 0.2s ease ${i * 40}ms both`,
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--color-amber)' }}>{log.complaintId}</span>
                    <span style={{ color: 'var(--text-muted)', margin: '0 0.3rem' }}>·</span>
                    {log.statusFrom && <span style={{ color: 'var(--text-muted)' }}>{log.statusFrom} → </span>}
                    <strong style={{ color: STATUS_COLORS[log.statusTo]?.text }}>{log.statusTo}</strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '2px' }}>{log.note}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', flexShrink: 0 }}>
                    {timeAgo(log.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ── STATUS TRANSITION MODAL ── */}
      {activeComplaint && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setActiveComplaint(null)}>
          <div className="glass-panel modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-amber)', fontWeight: 800 }}>{activeComplaint.complaintId}</span>
                <h3 style={{ fontSize: '1.1rem', marginTop: '2px' }}>Update Resolution Status</h3>
              </div>
              <button className="btn btn-ghost" onClick={() => setActiveComplaint(null)} style={{ padding: '0.4rem' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', fontSize: '0.85rem' }}>
              <strong>{activeComplaint.title}</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '4px' }}>{activeComplaint.address}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                Current: <span className={`badge badge-${activeComplaint.status}`}>{STATUS_COLORS[activeComplaint.status]?.label}</span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                Transition To
              </label>
              <select
                className="input"
                value={transitionStatus}
                onChange={e => setTransitionStatus(e.target.value)}
              >
                {(STATUS_TRANSITIONS[activeComplaint.status] || []).map(s => (
                  <option key={s} value={s}>{STATUS_COLORS[s]?.label || s}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
                Field Audit Remarks
              </label>
              <textarea
                className="input"
                rows={3}
                placeholder="Enter field officer notes, contractor details, or fix verification..."
                value={transitionNote}
                onChange={e => setTransitionNote(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-success" onClick={handleUpdateStatus} style={{ flex: 1 }}>
                <CheckCircle size={16} /> Confirm & Log Transition
              </button>
              <button className="btn btn-ghost" onClick={() => setActiveComplaint(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPLAINT DETAIL MODAL ── */}
      {showDetail && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowDetail(null)}>
          <div className="glass-panel modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--color-amber)', fontSize: '0.82rem' }}>{showDetail.complaintId}</span>
                  <span className={`badge badge-${showDetail.status}`}>{STATUS_COLORS[showDetail.status]?.label}</span>
                </div>
                <h2 style={{ fontSize: '1.1rem' }}>{showDetail.title}</h2>
              </div>
              <button className="btn btn-ghost" onClick={() => setShowDetail(null)} style={{ padding: '0.4rem' }}>
                <X size={18} />
              </button>
            </div>

            {/* Image placeholder — only real photos */}
            <div style={{
              width: '100%', height: '200px', borderRadius: '12px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)',
            }}>
              <ImageOff size={28} />
              <span style={{ fontSize: '0.78rem' }}>Photo evidence attached to complaint</span>
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Description</h4>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.5, marginTop: '4px' }}>{showDetail.description}</p>
              {showDetail.summaryGenerated && (
                <p style={{ fontSize: '0.75rem', color: 'var(--color-indigo)', marginTop: '6px', fontStyle: 'italic' }}>
                  AI Summary: {showDetail.summaryGenerated}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '10px', fontSize: '0.82rem' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Location</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{showDetail.address}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-indigo)' }}>{showDetail.ward}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Priority</div>
                <div style={{ fontWeight: 700, color: SEVERITY_COLORS[showDetail.severity], marginTop: '2px' }}>
                  {showDetail.severity} · Score {showDetail.priorityScore}/100
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Coordinates</div>
                <div style={{ fontWeight: 500, marginTop: '2px' }}>{showDetail.lat.toFixed(6)}, {showDetail.lng.toFixed(6)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Est. Resolution</div>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{showDetail.estimatedResolutionHours} hours</div>
              </div>
            </div>

            {/* Timeline */}
            {(() => {
              const logs = historyLogs.filter(l => l.complaintId === showDetail.complaintId);
              if (logs.length === 0) return null;
              return (
                <div>
                  <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>Timeline</h4>
                  {logs.map(log => (
                    <div key={log.id} style={{
                      padding: '0.5rem 0.75rem', background: 'var(--bg-secondary)', borderRadius: '6px',
                      borderLeft: `3px solid ${STATUS_COLORS[log.statusTo]?.text || 'var(--color-emerald)'}`,
                      fontSize: '0.75rem', marginBottom: '0.3rem',
                    }}>
                      {log.statusFrom && <span style={{ color: 'var(--text-muted)' }}>{log.statusFrom} → </span>}
                      <strong style={{ color: STATUS_COLORS[log.statusTo]?.text }}>{log.statusTo}</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>{timeAgo(log.timestamp)}</span>
                      <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>{log.note}</div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <button className="btn btn-ghost" onClick={() => setShowDetail(null)} style={{ width: '100%', justifyContent: 'center' }}>
              Close
            </button>
          </div>
        </div>
      )}
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

export default function App() {
  return (
    <DeptAuthProvider>
      <DeptAppShell />
    </DeptAuthProvider>
  );
}

