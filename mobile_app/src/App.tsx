import React, { useState } from 'react';
import { 
  Shield, Camera, MapPin, AlertTriangle, CheckCircle, Navigation, Award, 
  History, Clock, FileText, ArrowRight, UserCheck, Smartphone, Lock
} from 'lucide-react';
import { runFreeTierAiEngine } from '../../supabase/functions/ai-engine/index';
import { ComplaintPIISafe, INITIAL_DEPARTMENTS } from '../../packages/shared_ui/src/index';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'rewards'>('home');
  const [gpsActive, setGpsActive] = useState(false);
  const [showGpsModal, setShowGpsModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  // Form State
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Road Infrastructure');
  const [userPoints, setUserPoints] = useState(240);

  // Citizen Complaint List
  const [myComplaints, setMyComplaints] = useState<ComplaintPIISafe[]>([
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
  ]);

  // HARD RULE 2: MANDATORY GPS GATE BEFORE CAMERA
  const handleTapReport = () => {
    if (!gpsActive) {
      setShowGpsModal(true);
    } else {
      setShowCameraModal(true);
    }
  };

  const handleEnableGps = () => {
    setGpsActive(true);
    setShowGpsModal(false);
    setShowCameraModal(true);
  };

  const handleCapturePhoto = () => {
    // Simulating camera photo capture
    setCapturedPhoto("https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop");
    setShowCameraModal(false);
    setShowFormModal(true);
  };

  const handleSubmitComplaint = () => {
    if (!title || !description) {
      alert("Please provide a title and description.");
      return;
    }

    // Run Free-tier AI Engine
    const aiResult = runFreeTierAiEngine({
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      rawTitle: title,
      description,
      lat: 12.9785,
      lng: 77.6408,
      ward: "Ward 80 (Indiranagar)",
      existingComplaints: myComplaints.map(c => ({
        id: c.complaintId,
        description: c.description,
        lat: c.lat,
        lng: c.lng,
        ward: c.ward,
        categoryName: c.categoryName,
        status: c.status
      }))
    });

    const newComplaint: ComplaintPIISafe = {
      complaintId: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title: aiResult.titleGenerated,
      description,
      categoryId: aiResult.departmentId,
      categoryName: aiResult.predictedCategory,
      departmentId: aiResult.departmentId,
      departmentName: INITIAL_DEPARTMENTS.find(d => d.id === aiResult.departmentId)?.name || "BBMP Municipal Dept",
      severity: aiResult.baseSeverity,
      priorityScore: aiResult.priorityScore,
      status: "submitted",
      lat: 12.9785,
      lng: 77.6408,
      address: "12th Main Road, Indiranagar 100ft Road Junction, Bengaluru",
      ward: "Ward 80 (Indiranagar)",
      assemblyConstituency: "Indiranagar Assembly",
      parliamentaryConstituency: "Bengaluru Central MP",
      imageUrl: capturedPhoto || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSpam: aiResult.isSpam,
      isDuplicate: aiResult.isDuplicate,
      duplicateOfId: aiResult.duplicateOfId,
      similarIds: aiResult.similarIds,
      summaryGenerated: aiResult.summaryGenerated,
      estimatedResolutionHours: aiResult.estimatedResolutionHours
    };

    setMyComplaints([newComplaint, ...myComplaints]);
    if (!aiResult.isSpam && !aiResult.isDuplicate) {
      setUserPoints(prev => prev + 50);
    }

    setShowFormModal(false);
    setTitle('');
    setDescription('');
    setActiveTab('history');
    alert(`Complaint ${newComplaint.complaintId} submitted successfully! AI assigned to ${newComplaint.departmentName}. Earned +50 Sentinel Points.`);
  };

  return (
    <div style={{ background: '#07090e', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Mobile Frame Container */}
      <div style={{ width: '100%', maxWidth: '420px', height: '840px', background: '#0b0f19', borderRadius: '40px', border: '8px solid #1a2234', boxShadow: '0 25px 60px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        
        {/* Mobile Header Bar */}
        <div style={{ background: '#131927', padding: '1.2rem 1.25rem 0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366f1, #00c7be)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <Shield size={18} />
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>NAMMA PRAHARI</span>
          </div>

          <div style={{ fontSize: '0.72rem', background: gpsActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 149, 0, 0.15)', color: gpsActive ? '#10b981' : '#ff9500', padding: '0.2rem 0.6rem', borderRadius: 99, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Navigation size={10} /> {gpsActive ? 'GPS ACTIVE' : 'GPS OFF'}
          </div>
        </div>

        {/* Tab Content Area */}
        <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto' }}>
          
          {activeTab === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* User Profile Card */}
              <div style={{ background: 'rgba(23, 31, 48, 0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                  KR
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Citizen Sentinel</div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Kavya Ramesh</div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginTop: 2 }}>{userPoints} Sentinel Points</div>
                </div>
              </div>

              {/* REPORT ISSUE MANDATORY GPS GATE BUTTON */}
              <div 
                onClick={handleTapReport}
                style={{
                  height: 180,
                  background: 'linear-gradient(135deg, #6366f1, #00c7be)',
                  borderRadius: 24,
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)',
                  textAlign: 'center'
                }}
              >
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Camera size={32} />
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800 }}>REPORT CIVIC ISSUE</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: 4 }}>
                  {gpsActive ? 'GPS Enabled — Tap to open Camera' : '⚠️ GPS Gate Active: Enable GPS to proceed'}
                </p>
              </div>

              {/* Recent Active Community Complaints */}
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.75rem' }}>My Recent Submissions</h4>
                {myComplaints.map(c => (
                  <div key={c.complaintId} style={{ background: '#131927', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0.85rem', marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <img src={c.imageUrl} alt="Evidence" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 800 }}>{c.complaintId}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>{c.title}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>{c.address.slice(0, 35)}...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Track Complaints & Timeline</h3>
              {myComplaints.map(c => (
                <div key={c.complaintId} style={{ background: '#131927', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: '#6366f1', fontSize: '0.85rem' }}>{c.complaintId}</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '0.15rem 0.5rem', borderRadius: 99, fontWeight: 700 }}>{c.status.toUpperCase()}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', color: '#fff' }}>{c.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>Assigned to: {c.departmentName}</p>

                  {/* Status Timeline */}
                  <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 10 }}>✓</div>
                      <div style={{ fontSize: '0.68rem', color: '#fff', marginTop: 4 }}>Submitted</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.status !== 'submitted' ? '#10b981' : '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 10 }}>2</div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 4 }}>Assigned</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.status === 'in_progress' || c.status === 'resolved' ? '#10b981' : '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 10 }}>3</div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 4 }}>In Progress</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.status === 'resolved' ? '#10b981' : '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: 10 }}>4</div>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: 4 }}>Resolved</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rewards' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>Sentinel Rewards & Leaderboard</h3>
              <div style={{ background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: 16, padding: '1.25rem', color: '#fff', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Your Total Score</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>{userPoints} PTS</div>
                <div style={{ fontSize: '0.75rem', marginTop: 4 }}>Earn +50 pts for every verified non-spam report!</div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <div style={{ background: '#131927', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'transparent', border: 'none', color: activeTab === 'home' ? '#6366f1' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: '0.72rem', cursor: 'pointer' }}>
            <Shield size={18} /> Home
          </button>
          <button onClick={() => setActiveTab('history')} style={{ background: 'transparent', border: 'none', color: activeTab === 'history' ? '#6366f1' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: '0.72rem', cursor: 'pointer' }}>
            <History size={18} /> History
          </button>
          <button onClick={() => setActiveTab('rewards')} style={{ background: 'transparent', border: 'none', color: activeTab === 'rewards' ? '#6366f1' : '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, fontSize: '0.72rem', cursor: 'pointer' }}>
            <Award size={18} /> Rewards
          </button>
        </div>

      </div>

      {/* HARD RULE 2: MANDATORY GPS GATE MODAL */}
      {showGpsModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '360px', background: '#131927', border: '2px solid #ff9500', borderRadius: 20, padding: '1.5rem', textAlign: 'center', color: '#fff' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255, 149, 0, 0.15)', color: '#ff9500', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Navigation size={32} />
            </div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.2rem', marginBottom: '0.5rem' }}>Please Enable GPS</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              GPS location is mandatory before taking a photo. Camera opens only after GPS becomes active to ensure precise ward mapping.
            </p>
            <button 
              onClick={handleEnableGps}
              style={{ width: '100%', padding: '0.85rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Open Device Location Settings
            </button>
          </div>
        </div>
      )}

      {/* CAMERA CAPTURE MODAL */}
      {showCameraModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '360px', height: '440px', background: '#1e293b', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
            <div style={{ textAlign: 'center', color: '#fff' }}>
              <Camera size={54} color="#6366f1" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Point camera at civic issue</div>
              <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: 4 }}>✓ GPS Coordinates Locked: 12.9785, 77.6408</div>
            </div>
          </div>
          <button 
            onClick={handleCapturePhoto}
            style={{ marginTop: '1.5rem', width: 70, height: 70, borderRadius: '50%', background: '#fff', border: '4px solid #6366f1', cursor: 'pointer' }}
          />
        </div>
      )}

      {/* FORM SUBMISSION MODAL */}
      {showFormModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ width: '100%', maxWidth: '380px', background: '#131927', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '1.5rem', color: '#fff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3>Describe Civic Issue</h3>
            
            {capturedPhoto && (
              <img src={capturedPhoto} alt="Captured evidence" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12 }} />
            )}

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Issue Title</label>
              <input 
                type="text" 
                placeholder="e.g. Broken Streetlamp or Deep Pothole"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', marginTop: 4, outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Detailed Description</label>
              <textarea 
                rows={3}
                placeholder="Provide details for field engineers..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: '#0b0f19', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', marginTop: 4, outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleSubmitComplaint} style={{ flex: 1, padding: '0.75rem', background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer' }}>
                Submit & Trigger AI Engine
              </button>
              <button onClick={() => setShowFormModal(false)} style={{ padding: '0.75rem', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
