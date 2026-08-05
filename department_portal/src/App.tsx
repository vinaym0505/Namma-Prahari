import React, { useState, useEffect } from 'react';
import { 
  Wrench, CheckCircle, Clock, AlertCircle, Lock, Shield, Eye, RefreshCw, 
  ArrowRight, UserCheck, Layers, FileText
} from 'lucide-react';
import { ComplaintPIISafe, INITIAL_DEPARTMENTS, ComplaintHistoryItem } from '../../packages/shared_ui/src/index';

// Initial Mock Complaints for Department Portal
const ALL_DEPT_COMPLAINTS: ComplaintPIISafe[] = [
  {
    complaintId: "INC-9038",
    title: "Massive Pothole & Road Collapse Risk",
    description: "Deep 3ft crater on busy 100ft road junction. Vehicles swerving dangerously.",
    categoryId: "BBMP_ROAD",
    categoryName: "Road Infrastructure",
    departmentId: "11111111-1111-1111-1111-111111111111",
    departmentName: "BBMP Road Infrastructure & Engineering",
    severity: "High",
    priorityScore: 92,
    status: "in_progress",
    lat: 12.9785,
    lng: 77.6408,
    address: "12th Main Road, Indiranagar 100ft Road Junction, Bengaluru",
    ward: "Ward 80 (Indiranagar)",
    assemblyConstituency: "Indiranagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop",
    createdAt: "2026-08-05T18:15:00Z",
    updatedAt: "2026-08-05T21:00:00Z",
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Dangerous 3ft crater at major junction requiring urgent asphalt patching.",
    estimatedResolutionHours: 12
  },
  {
    complaintId: "INC-9035",
    title: "Overflowing Garbage Dumpster & Odor",
    description: "Commercial waste uncollected for 4 days. Drainage blocked by plastic bags.",
    categoryId: "BBMP_SWM",
    categoryName: "Solid Waste & Sanitation",
    departmentId: "22222222-2222-2222-2222-222222222222",
    departmentName: "BBMP Solid Waste Management & Sanitation",
    severity: "High",
    priorityScore: 85,
    status: "assigned",
    lat: 12.9352,
    lng: 77.6245,
    address: "Koramangala 4th Block, 80ft Road, Bengaluru",
    ward: "Ward 151 (Koramangala)",
    assemblyConstituency: "Koramangala Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop",
    createdAt: "2026-08-05T16:00:00Z",
    updatedAt: "2026-08-05T17:30:00Z",
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Blocked drainage and uncleared waste causing severe health hazard.",
    estimatedResolutionHours: 24
  },
  {
    complaintId: "INC-9041",
    title: "Broken Streetlamp & Dark Alley Hazard",
    description: "Main streetlights are completely out for 200m near metro station gate 2. High crime risk at night.",
    categoryId: "BESCOM_ELEC",
    categoryName: "Electrical & Streetlighting",
    departmentId: "44444444-4444-4444-4444-444444444444",
    departmentName: "BESCOM Electrical & Streetlighting Grid",
    severity: "Medium",
    priorityScore: 72,
    status: "submitted",
    lat: 12.9716,
    lng: 77.5946,
    address: "10th Cross, MG Road Metro Gate 2, Shanti Nagar, Bengaluru",
    ward: "Ward 112 (Shanti Nagar)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop",
    createdAt: "2026-08-05T20:30:00Z",
    updatedAt: "2026-08-05T20:30:00Z",
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Unlit 200m stretch near metro gate posing safety threat to evening commuters.",
    estimatedResolutionHours: 24
  }
];

export default function App() {
  // Current Logged-in Department State (Simulating Supabase JWT RLS scope)
  const [selectedDeptId, setSelectedDeptId] = useState<string>("11111111-1111-1111-1111-111111111111"); // Default: BBMP Road
  const [complaints, setComplaints] = useState<ComplaintPIISafe[]>(ALL_DEPT_COMPLAINTS);
  const [activeComplaint, setActiveComplaint] = useState<ComplaintPIISafe | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<string>('');
  const [transitionNote, setTransitionNote] = useState<string>('');
  const [historyLogs, setHistoryLogs] = useState<ComplaintHistoryItem[]>([]);

  const currentDept = INITIAL_DEPARTMENTS.find(d => d.id === selectedDeptId) || INITIAL_DEPARTMENTS[0];

  // HARD RULE 4: ROW LEVEL SECURITY SIMULATION - STRICTLY FILTER TO CURRENT DEPT ONLY!
  const rlsFilteredComplaints = complaints.filter(c => c.departmentId === selectedDeptId);

  const handleUpdateStatus = () => {
    if (!activeComplaint || !transitionStatus) return;

    // Update complaint status
    setComplaints(prev => prev.map(c => {
      if (c.complaintId === activeComplaint.complaintId) {
        return {
          ...c,
          status: transitionStatus as any,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    // Add audit log to complaint_history
    const newLog: ComplaintHistoryItem = {
      id: `LOG-${Date.now()}`,
      complaintId: activeComplaint.complaintId,
      statusFrom: activeComplaint.status,
      statusTo: transitionStatus,
      changedByRole: `Department Officer (${currentDept.code})`,
      note: transitionNote || "Status updated by department field engineer",
      timestamp: new Date().toISOString()
    };

    setHistoryLogs(prev => [newLog, ...prev]);
    setActiveComplaint(null);
    setTransitionNote('');
    alert(`Status for ${activeComplaint.complaintId} successfully updated to ${transitionStatus.toUpperCase()}! Audit logged.`);
  };

  return (
    <div className="dept-shell">
      {/* Top Header Bar */}
      <header className="dept-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #ff9500, #d97706)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Wrench size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>NAMMA PRAHARI — DEPARTMENT PORTAL</h2>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-amber)', fontWeight: 600 }}>
              Logged In: {currentDept.name} ({currentDept.code})
            </div>
          </div>
        </div>

        {/* Department Switcher (Simulating JWT claims switch for testing RLS boundary) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Switch Department Login:</div>
          <select 
            value={selectedDeptId}
            onChange={(e) => setSelectedDeptId(e.target.value)}
            style={{ background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-bright)', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}
          >
            {INITIAL_DEPARTMENTS.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ padding: '1.5rem 2rem', flex: 1, maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        
        {/* RLS & Privacy Mandate Banner */}
        <div style={{ background: 'rgba(255, 149, 0, 0.1)', border: '1px solid rgba(255, 149, 0, 0.3)', color: 'var(--color-amber)', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Shield size={16} />
          <span>ROW LEVEL SECURITY (RLS) ACTIVE: You are logged in as {currentDept.code}. You can strictly view and update complaints assigned to your department only. Cross-department access is blocked at the database layer.</span>
        </div>

        {/* KPI Summary Row */}
        <div className="kpi-grid">
          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Assigned to Dept</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{rlsFilteredComplaints.length}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Queue</span>
          </div>

          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>In Progress</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-cyan)' }}>
              {rlsFilteredComplaints.filter(c => c.status === 'in_progress').length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-cyan)' }}>Field Crew On Site</span>
          </div>

          <div className="glass-panel kpi-card">
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Resolved Today</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
              {rlsFilteredComplaints.filter(c => c.status === 'resolved').length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald)' }}>Work Completed</span>
          </div>
        </div>

        {/* Complaints Work Queue */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="var(--color-amber)" /> Active Work Queue for {currentDept.name}
          </h3>

          {rlsFilteredComplaints.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={48} color="var(--color-emerald)" style={{ marginBottom: '0.5rem' }} />
              <h4>No pending complaints for this department</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>All assigned issues have been resolved or non-existent in this queue.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {rlsFilteredComplaints.map(c => (
                <div key={c.complaintId} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
                  <img src={c.imageUrl} alt="Complaint Evidence" style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border-color)' }} />
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 800, color: 'var(--color-amber)', fontSize: '0.85rem' }}>{c.complaintId}</span>
                      <span className={`badge badge-${c.status}`}>{c.status.replace('_', ' ')}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-crimson)', fontWeight: 700 }}>Priority Score: {c.priorityScore}/100</span>
                    </div>
                    <h4 style={{ fontSize: '1rem' }}>{c.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{c.address}</p>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>AI Summary: {c.summaryGenerated}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                    <button 
                      onClick={() => { setActiveComplaint(c); setTransitionStatus(c.status); }}
                      style={{ padding: '0.55rem 1.1rem', background: 'var(--color-indigo)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Wrench size={16} /> Update Workflow Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit History Log */}
        {historyLogs.length > 0 && (
          <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <h3>Department Resolution Audit Log</h3>
            <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              {historyLogs.map(log => (
                <div key={log.id} style={{ padding: '0.5rem 0.8rem', background: 'var(--bg-secondary)', borderRadius: '6px', borderLeft: '3px solid var(--color-emerald)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Complaint {log.complaintId}: Status transitioned from <b>{log.statusFrom}</b> to <b>{log.statusTo}</b> ({log.note})</span>
                  <span style={{ color: 'var(--text-muted)' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Status Transition Modal */}
      {activeComplaint && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3>Update Resolution Status for {activeComplaint.complaintId}</h3>
            
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Select Workflow Status</label>
              <select 
                value={transitionStatus} 
                onChange={(e) => setTransitionStatus(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-bright)', borderRadius: '8px', fontSize: '0.9rem' }}
              >
                <option value="assigned">Assigned to Field Engineer</option>
                <option value="in_progress">In Progress (Work Order Issued)</option>
                <option value="resolved">Resolved (Site Inspected & Fixed)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Field Audit Remarks / Inspection Note</label>
              <textarea 
                rows={3} 
                placeholder="Enter field officer notes, contractor details, or fix verification..."
                value={transitionNote}
                onChange={(e) => setTransitionNote(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-bright)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button 
                onClick={handleUpdateStatus}
                style={{ flex: 1, padding: '0.75rem', background: 'var(--color-emerald)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
              >
                Confirm & Log Transition
              </button>
              <button 
                onClick={() => setActiveComplaint(null)}
                style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-secondary)', color: '#fff', border: '1px solid var(--border-bright)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
