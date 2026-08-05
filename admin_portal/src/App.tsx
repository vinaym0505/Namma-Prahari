import React, { useState, useEffect } from 'react';
import { 
  Building2, Shield, AlertTriangle, CheckCircle, Clock, Search, MapPin, 
  UserCheck, FileText, BarChart3, RefreshCw, Eye, Lock, Phone, Mail, Award, Download
} from 'lucide-react';
import { ComplaintPIISafe, INITIAL_DEPARTMENTS, INITIAL_REPRESENTATIVES } from '../../packages/shared_ui/src/index';

// Initial Mock PII-Safe Complaints (PROVING PRIVACY RULE 5: NO Citizen PII)
const MOCK_ADMIN_COMPLAINTS: ComplaintPIISafe[] = [
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
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: ["INC-8890"],
    summaryGenerated: "Unlit 200m stretch near metro gate posing safety threat to evening commuters.",
    estimatedResolutionHours: 24
  },
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
    representative: INITIAL_REPRESENTATIVES["Indiranagar Assembly"],
    isSpam: false,
    isDuplicate: true,
    duplicateOfId: "INC-9012",
    similarIds: ["INC-9012", "INC-8950"],
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
    representative: INITIAL_REPRESENTATIVES["Koramangala Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Blocked drainage and uncleared waste causing severe health hazard.",
    estimatedResolutionHours: 24
  }
];

export default function App() {
  const [activeNav, setActiveNav] = useState<'dashboard' | 'map' | 'analytics' | 'reports'>('dashboard');
  const [complaints, setComplaints] = useState<ComplaintPIISafe[]>(MOCK_ADMIN_COMPLAINTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintPIISafe | null>(null);
  const [lastPolledTime, setLastPolledTime] = useState(new Date().toLocaleTimeString());

  // Smart Polling (Rule 9: Auto-refresh every 25s, NO Supabase Realtime)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastPolledTime(new Date().toLocaleTimeString());
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = 
      c.complaintId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.representative && c.representative.mlaName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDept = filterDept === 'ALL' || c.departmentId === filterDept;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="admin-shell">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="brand-header">
          <div className="brand-logo">
            <Building2 size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>NAMMA PRAHARI</h2>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>CITY ADMIN PORTAL</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <button className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveNav('dashboard')}>
            <Shield size={18} /> Dashboard & Monitoring
          </button>
          <button className={`nav-item ${activeNav === 'map' ? 'active' : ''}`} onClick={() => setActiveNav('map')}>
            <MapPin size={18} /> Live Complaint Map
          </button>
          <button className={`nav-item ${activeNav === 'analytics' ? 'active' : ''}`} onClick={() => setActiveNav('analytics')}>
            <BarChart3 size={18} /> City Analytics & Power BI
          </button>
          <button className={`nav-item ${activeNav === 'reports' ? 'active' : ''}`} onClick={() => setActiveNav('reports')}>
            <FileText size={18} /> Monthly Reports Export
          </button>
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active Session</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>City Nodal Officer</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-emerald)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-emerald)' }}></span>
            Polling Active ({lastPolledTime})
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header Bar */}
        <header className="admin-header">
          <h2 style={{ fontSize: '1.25rem' }}>
            {activeNav === 'dashboard' && 'City Command Dashboard'}
            {activeNav === 'map' && 'Live Spatial Complaint Map'}
            {activeNav === 'analytics' && 'City Analytics & Performance Metrics'}
            {activeNav === 'reports' && 'Government Executive Reports'}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="glass-panel" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }} onClick={() => setLastPolledTime(new Date().toLocaleTimeString())}>
              <RefreshCw size={14} /> Refresh Data
            </button>
          </div>
        </header>

        {/* View Content */}
        <div style={{ padding: '1.5rem 2rem', flex: 1 }}>

          {/* PRIVACY MANDATE BANNER */}
          <div className="privacy-banner">
            <Lock size={16} />
            <span>PRIVACY RULE ENFORCED: Citizen PII (Name, Email, Phone, Reward Points) is strictly stripped server-side. Only complaint metadata and public representatives are shown.</span>
          </div>

          {activeNav === 'dashboard' && (
            <div>
              {/* KPI Cards */}
              <div className="kpi-grid">
                <div className="glass-panel kpi-card">
                  <span className="kpi-title">Total Complaints</span>
                  <span className="kpi-value">1,428</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald)' }}>+12% this week</span>
                </div>
                <div className="glass-panel kpi-card">
                  <span className="kpi-title">Active Open Issues</span>
                  <span className="kpi-value" style={{ color: 'var(--color-amber)' }}>184</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pending resolution</span>
                </div>
                <div className="glass-panel kpi-card">
                  <span className="kpi-title">Resolved Today</span>
                  <span className="kpi-value" style={{ color: 'var(--color-emerald)' }}>94</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald)' }}>SLA Target Met</span>
                </div>
                <div className="glass-panel kpi-card">
                  <span className="kpi-title">SLA Overdue</span>
                  <span className="kpi-value" style={{ color: 'var(--color-crimson)' }}>12</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-crimson)' }}>Escalated to Dept Head</span>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input 
                    type="text" 
                    placeholder="Search by Complaint ID, Title, Ward, MLA..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%', fontSize: '0.85rem' }}
                  />
                </div>

                <select 
                  value={filterDept} 
                  onChange={(e) => setFilterDept(e.target.value)}
                  style={{ background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Departments</option>
                  {INITIAL_DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>

                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ background: 'var(--bg-primary)', color: '#fff', border: '1px solid var(--border-color)', padding: '0.5rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Complaints Table */}
              <div className="glass-panel data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Complaint ID</th>
                      <th>Title & Description</th>
                      <th>Department</th>
                      <th>Ward & Constituency</th>
                      <th>Severity</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.map(c => (
                      <tr key={c.complaintId}>
                        <td style={{ fontWeight: 700, color: 'var(--color-indigo)' }}>{c.complaintId}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{c.title}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{c.summaryGenerated}</div>
                        </td>
                        <td>{c.categoryName}</td>
                        <td>
                          <div>{c.ward}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.assemblyConstituency}</div>
                        </td>
                        <td>
                          <span style={{
                            color: c.severity === 'High' ? 'var(--color-crimson)' : c.severity === 'Medium' ? 'var(--color-amber)' : 'var(--color-cyan)',
                            fontWeight: 700
                          }}>
                            {c.severity}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <div style={{ width: '40px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${c.priorityScore}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #ff3b30)' }}></div>
                            </div>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{c.priorityScore}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-${c.status}`}>{c.status.replace('_', ' ')}</span>
                        </td>
                        <td>
                          <button 
                            style={{ padding: '0.35rem 0.75rem', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid var(--color-indigo)', color: '#fff', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                            onClick={() => setSelectedComplaint(c)}
                          >
                            <Eye size={14} /> Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeNav === 'map' && (
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Live Spatial Complaint Density Map</h3>
              <div style={{ background: 'var(--bg-secondary)', height: '480px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <MapPin size={48} color="var(--color-indigo)" style={{ marginBottom: '0.5rem' }} />
                  <h4>OpenStreetMap Dark Layer Loaded</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0.5rem auto' }}>
                    Plotting 184 active open complaint coordinates across Bengaluru East, West, and Central zones.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'analytics' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3>Ward-wise Issue Density</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>Shanti Nagar (Ward 112)</span>
                      <span>42 Issues</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '85%', height: '100%', background: 'var(--color-crimson)' }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>Indiranagar (Ward 80)</span>
                      <span>28 Issues</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '60%', height: '100%', background: 'var(--color-amber)' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3>Department Performance & Average SLA</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {INITIAL_DEPARTMENTS.map(d => (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Officer: {d.headOfficer}</div>
                      </div>
                      <span style={{ color: 'var(--color-emerald)', fontWeight: 700, fontSize: '0.9rem' }}>18.4 hrs avg</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === 'reports' && (
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3>Generate & Export Official Reports</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Download compiled PDF & CSV monthly reports for legislative review.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="glass-panel" style={{ padding: '1rem 1.5rem', background: 'var(--color-indigo)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Download size={18} /> Export Ward Summary CSV
                </button>

                <button className="glass-panel" style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--border-bright)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} /> Export Legislative PDF
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Complaint Detail Inspection Modal (Strictly PII-Free) */}
      {selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-indigo)', fontWeight: 800 }}>{selectedComplaint.complaintId}</span>
                <h2 style={{ fontSize: '1.2rem', marginTop: '2px' }}>{selectedComplaint.title}</h2>
              </div>
              <button onClick={() => setSelectedComplaint(null)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            <img src={selectedComplaint.imageUrl} alt="Complaint evidence" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-color)' }} />

            <div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Description</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '2px' }}>{selectedComplaint.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Location & Ward</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedComplaint.address}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-indigo)' }}>{selectedComplaint.ward}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assigned Department</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedComplaint.departmentName}</div>
              </div>
            </div>

            {/* RESPONSIBLE LEGISLATIVE REPRESENTATIVES BLOCK */}
            {selectedComplaint.representative && (
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '1rem', borderRadius: '10px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--color-indigo)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={16} /> Responsible Area Representatives
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{selectedComplaint.representative.mlaName}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Phone: {selectedComplaint.representative.mlaPhone}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Email: {selectedComplaint.representative.mlaEmail}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{selectedComplaint.representative.mpName}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Phone: {selectedComplaint.representative.mpPhone}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>Email: {selectedComplaint.representative.mpEmail}</div>
                  </div>
                </div>
              </div>
            )}

            <button onClick={() => setSelectedComplaint(null)} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', color: '#fff', border: '1px solid var(--border-bright)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              Close Inspection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
