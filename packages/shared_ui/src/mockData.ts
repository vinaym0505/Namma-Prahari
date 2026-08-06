// =============================================================================
// NAMMA PRAHARI — Comprehensive Mock Data
// Realistic Bengaluru civic complaint dataset for development/demo
// HARD RULE: NO citizen PII in any of these records — server-side stripped
// =============================================================================

import { ComplaintPIISafe, ComplaintHistoryItem, INITIAL_DEPARTMENTS, INITIAL_REPRESENTATIVES } from './index';

// Helper to generate dates relative to now
const hoursAgo = (h: number): string => new Date(Date.now() - h * 3600000).toISOString();

export const MOCK_COMPLAINTS: ComplaintPIISafe[] = [
  {
    complaintId: "INC-9041",
    title: "Broken Streetlamp & Dark Alley Hazard",
    description: "Main streetlights are completely out for 200m near metro station gate 2. High crime risk at night. Multiple residents have reported near-miss incidents with vehicles.",
    categoryId: "BESCOM_ELEC",
    categoryName: "Electrical & Streetlighting",
    departmentId: "44444444-4444-4444-4444-444444444444",
    departmentName: "BESCOM Electrical & Streetlighting Grid",
    severity: "Medium",
    priorityScore: 72,
    status: "submitted",
    lat: 12.9716,
    lng: 77.5946,
    address: "10th Cross, MG Road Metro Gate 2, Shanti Nagar, Bengaluru 560001",
    ward: "Ward 112 (Shanti Nagar)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(3),
    updatedAt: hoursAgo(3),
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
    description: "Deep 3ft crater on busy 100ft road junction. Vehicles swerving dangerously into oncoming traffic. Two-wheelers have fallen. Urgent asphalt patching required.",
    categoryId: "BBMP_ROAD",
    categoryName: "Road Infrastructure",
    departmentId: "11111111-1111-1111-1111-111111111111",
    departmentName: "BBMP Road Infrastructure & Engineering",
    severity: "High",
    priorityScore: 92,
    status: "in_progress",
    lat: 12.9785,
    lng: 77.6408,
    address: "12th Main Road, Indiranagar 100ft Road Junction, Bengaluru 560038",
    ward: "Ward 80 (Indiranagar)",
    assemblyConstituency: "Indiranagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(8),
    updatedAt: hoursAgo(2),
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
    description: "Commercial waste uncollected for 4 days. Drainage blocked by plastic bags. Strong stench affecting nearby shops and residences. Flies and stray animals congregating.",
    categoryId: "BBMP_SWM",
    categoryName: "Solid Waste & Sanitation",
    departmentId: "22222222-2222-2222-2222-222222222222",
    departmentName: "BBMP Solid Waste Management & Sanitation",
    severity: "High",
    priorityScore: 85,
    status: "assigned",
    lat: 12.9352,
    lng: 77.6245,
    address: "Koramangala 4th Block, 80ft Road, Bengaluru 560034",
    ward: "Ward 151 (Koramangala)",
    assemblyConstituency: "Koramangala Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(12),
    updatedAt: hoursAgo(6),
    representative: INITIAL_REPRESENTATIVES["Koramangala Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Blocked drainage and uncleared waste causing severe health hazard in commercial zone.",
    estimatedResolutionHours: 24
  },
  {
    complaintId: "INC-9030",
    title: "Water Pipeline Burst & Road Flooding",
    description: "Major water main burst flooding the entire stretch of road. Water wastage estimated at thousands of liters per hour. Traffic diverted. Needs emergency shutoff valve repair.",
    categoryId: "BWSSB_WATER",
    categoryName: "Water Supply & Drainage",
    departmentId: "33333333-3333-3333-3333-333333333333",
    departmentName: "Bengaluru Water Supply & Sewerage Board",
    severity: "High",
    priorityScore: 95,
    status: "in_progress",
    lat: 12.9610,
    lng: 77.5780,
    address: "Bull Temple Road, Basavanagudi, Bengaluru 560004",
    ward: "Ward 163 (Basavanagudi)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(5),
    updatedAt: hoursAgo(1),
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: ["INC-9028"],
    summaryGenerated: "Emergency water main rupture causing massive road flooding and water wastage.",
    estimatedResolutionHours: 6
  },
  {
    complaintId: "INC-9025",
    title: "Collapsed Storm Drain Cover — Pedestrian Hazard",
    description: "Storm drain cover on footpath has completely collapsed inward. 3-foot deep open pit. Children walk this route to school. Needs immediate barricading and cover replacement.",
    categoryId: "BBMP_ROAD",
    categoryName: "Road Infrastructure",
    departmentId: "11111111-1111-1111-1111-111111111111",
    departmentName: "BBMP Road Infrastructure & Engineering",
    severity: "High",
    priorityScore: 88,
    status: "submitted",
    lat: 12.9540,
    lng: 77.5900,
    address: "4th Main Road, Chamrajpet, Bengaluru 560018",
    ward: "Ward 128 (Chamrajpet)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(2),
    updatedAt: hoursAgo(2),
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Collapsed storm drain on school route creating dangerous open pit for pedestrians.",
    estimatedResolutionHours: 8
  },
  {
    complaintId: "INC-9020",
    title: "Illegal Garbage Dumping on Empty Plot",
    description: "Construction debris and household waste being dumped on vacant BBMP plot daily. Mosquito breeding ground. Ward cleaning crew has not visited in 2 weeks.",
    categoryId: "BBMP_SWM",
    categoryName: "Solid Waste & Sanitation",
    departmentId: "22222222-2222-2222-2222-222222222222",
    departmentName: "BBMP Solid Waste Management & Sanitation",
    severity: "Medium",
    priorityScore: 65,
    status: "resolved",
    lat: 12.9680,
    lng: 77.6120,
    address: "1st Cross, Ulsoor Lake Road, Bengaluru 560042",
    ward: "Ward 85 (Ulsoor)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(72),
    updatedAt: hoursAgo(12),
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Persistent illegal waste dumping on BBMP vacant plot creating health and mosquito hazard.",
    estimatedResolutionHours: 48
  },
  {
    complaintId: "INC-9015",
    title: "Exposed Live Electrical Wire Near Bus Stop",
    description: "Low-hanging overhead wire with damaged insulation near BMTC bus stop. Sparking during rain. Immediate danger to commuters. Area needs to be cordoned off.",
    categoryId: "BESCOM_ELEC",
    categoryName: "Electrical & Streetlighting",
    departmentId: "44444444-4444-4444-4444-444444444444",
    departmentName: "BESCOM Electrical & Streetlighting Grid",
    severity: "High",
    priorityScore: 97,
    status: "escalated",
    lat: 12.9820,
    lng: 77.5960,
    address: "CMH Road Bus Stop, Indiranagar, Bengaluru 560038",
    ward: "Ward 80 (Indiranagar)",
    assemblyConstituency: "Indiranagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(80),
    updatedAt: hoursAgo(6),
    representative: INITIAL_REPRESENTATIVES["Indiranagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Life-threatening exposed live wire sparking near busy bus stop during monsoon.",
    estimatedResolutionHours: 4
  },
  {
    complaintId: "INC-9010",
    title: "Sewage Overflow into Residential Street",
    description: "Sewage manhole overflowing for 3 days. Raw sewage flowing down the residential road and into storm drains. Unbearable smell. Health risk for the entire block.",
    categoryId: "BWSSB_WATER",
    categoryName: "Water Supply & Drainage",
    departmentId: "33333333-3333-3333-3333-333333333333",
    departmentName: "Bengaluru Water Supply & Sewerage Board",
    severity: "High",
    priorityScore: 90,
    status: "assigned",
    lat: 12.9450,
    lng: 77.6350,
    address: "2nd Stage, BTM Layout, Bengaluru 560076",
    ward: "Ward 174 (BTM Layout)",
    assemblyConstituency: "Koramangala Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(36),
    updatedAt: hoursAgo(18),
    representative: INITIAL_REPRESENTATIVES["Koramangala Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: ["INC-8995"],
    summaryGenerated: "Three-day sewage overflow from manhole contaminating residential street.",
    estimatedResolutionHours: 12
  },
  {
    complaintId: "INC-9005",
    title: "Crumbling Footpath & Loose Paver Blocks",
    description: "Footpath pavers completely loose and uneven along 500m stretch. Senior citizens tripping. Rain makes it worse. Root cause appears to be poor sub-base preparation.",
    categoryId: "BBMP_ROAD",
    categoryName: "Road Infrastructure",
    departmentId: "11111111-1111-1111-1111-111111111111",
    departmentName: "BBMP Road Infrastructure & Engineering",
    severity: "Medium",
    priorityScore: 58,
    status: "assigned",
    lat: 12.9250,
    lng: 77.6050,
    address: "Jayanagar 4th Block, South End Circle, Bengaluru 560011",
    ward: "Ward 170 (Jayanagar)",
    assemblyConstituency: "Koramangala Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(48),
    updatedAt: hoursAgo(24),
    representative: INITIAL_REPRESENTATIVES["Koramangala Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "500m of dangerously uneven footpath pavers causing trips, especially for elderly.",
    estimatedResolutionHours: 72
  },
  {
    complaintId: "INC-9000",
    title: "No Water Supply for 48 Hours",
    description: "Entire street has had no BWSSB water supply for 48 hours. Tanker water being purchased. Suspected valve malfunction at local pump station. Multiple families affected.",
    categoryId: "BWSSB_WATER",
    categoryName: "Water Supply & Drainage",
    departmentId: "33333333-3333-3333-3333-333333333333",
    departmentName: "Bengaluru Water Supply & Sewerage Board",
    severity: "High",
    priorityScore: 82,
    status: "resolved",
    lat: 12.9880,
    lng: 77.5720,
    address: "Sadashivanagar, Palace Road Cross, Bengaluru 560080",
    ward: "Ward 15 (Sadashivanagar)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru Central MP",
    imageUrl: "",
    createdAt: hoursAgo(96),
    updatedAt: hoursAgo(24),
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "48-hour complete water outage affecting multiple families; suspected pump station valve failure.",
    estimatedResolutionHours: 24
  },
  {
    complaintId: "INC-8995",
    title: "Overloaded Transformer Making Sparking Sounds",
    description: "Distribution transformer near residential complex making loud buzzing and occasional sparking sounds. Residents fear fire risk. Transformer appears to be oil-leaking.",
    categoryId: "BESCOM_ELEC",
    categoryName: "Electrical & Streetlighting",
    departmentId: "44444444-4444-4444-4444-444444444444",
    departmentName: "BESCOM Electrical & Streetlighting Grid",
    severity: "High",
    priorityScore: 91,
    status: "in_progress",
    lat: 12.9190,
    lng: 77.6480,
    address: "HSR Layout Sector 2, 27th Main Road, Bengaluru 560102",
    ward: "Ward 185 (HSR Layout)",
    assemblyConstituency: "Koramangala Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(20),
    updatedAt: hoursAgo(4),
    representative: INITIAL_REPRESENTATIVES["Koramangala Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Oil-leaking transformer with sparking sounds near residential area — fire hazard risk.",
    estimatedResolutionHours: 8
  },
  {
    complaintId: "INC-8990",
    title: "Dead Tree About to Fall on Road",
    description: "Large dead tree leaning precariously over main road. Branches already fallen. Will block entire road when it falls. Requires tree-cutting crew with crane.",
    categoryId: "BBMP_SWM",
    categoryName: "Solid Waste & Sanitation",
    departmentId: "22222222-2222-2222-2222-222222222222",
    departmentName: "BBMP Solid Waste Management & Sanitation",
    severity: "Medium",
    priorityScore: 70,
    status: "submitted",
    lat: 12.9560,
    lng: 77.5840,
    address: "Lalbagh West Gate Road, Bengaluru 560004",
    ward: "Ward 163 (Basavanagudi)",
    assemblyConstituency: "Shanti Nagar Assembly",
    parliamentaryConstituency: "Bengaluru South MP",
    imageUrl: "",
    createdAt: hoursAgo(6),
    updatedAt: hoursAgo(6),
    representative: INITIAL_REPRESENTATIVES["Shanti Nagar Assembly"],
    isSpam: false,
    isDuplicate: false,
    similarIds: [],
    summaryGenerated: "Dead tree leaning dangerously over main road near Lalbagh, risk of complete road blockage.",
    estimatedResolutionHours: 48
  },
];

export const MOCK_HISTORY: ComplaintHistoryItem[] = [
  {
    id: "LOG-001",
    complaintId: "INC-9038",
    statusFrom: "submitted",
    statusTo: "assigned",
    changedByRole: "AI Engine (Auto-Assignment)",
    note: "Auto-assigned to BBMP Road Infrastructure based on category mapping.",
    timestamp: hoursAgo(7)
  },
  {
    id: "LOG-002",
    complaintId: "INC-9038",
    statusFrom: "assigned",
    statusTo: "in_progress",
    changedByRole: "Department Officer (BBMP_ROAD)",
    note: "Field crew dispatched. Work order WO-2026-4521 issued for emergency pothole repair.",
    timestamp: hoursAgo(4)
  },
  {
    id: "LOG-003",
    complaintId: "INC-9035",
    statusFrom: "submitted",
    statusTo: "assigned",
    changedByRole: "AI Engine (Auto-Assignment)",
    note: "Auto-assigned to SWM department. High severity due to drainage blockage.",
    timestamp: hoursAgo(10)
  },
  {
    id: "LOG-004",
    complaintId: "INC-9030",
    statusFrom: "submitted",
    statusTo: "in_progress",
    changedByRole: "Department Officer (BWSSB_WATER)",
    note: "Emergency valve repair team dispatched. ETA 2 hours.",
    timestamp: hoursAgo(3)
  },
  {
    id: "LOG-005",
    complaintId: "INC-9020",
    statusFrom: "in_progress",
    statusTo: "resolved",
    changedByRole: "Department Officer (BBMP_SWM)",
    note: "Site cleared. Debris removed. Anti-mosquito fogging conducted. Plot entrance barricaded.",
    timestamp: hoursAgo(12)
  },
  {
    id: "LOG-006",
    complaintId: "INC-9015",
    statusFrom: "submitted",
    statusTo: "escalated",
    changedByRole: "Escalation Engine (72h)",
    note: "CRITICAL: 72-hour SLA breach. Escalated to BESCOM Commissioner. Life-threatening wire still exposed.",
    timestamp: hoursAgo(8)
  },
  {
    id: "LOG-007",
    complaintId: "INC-9000",
    statusFrom: "in_progress",
    statusTo: "resolved",
    changedByRole: "Department Officer (BWSSB_WATER)",
    note: "Faulty valve replaced at pump station. Water supply restored to all affected households.",
    timestamp: hoursAgo(24)
  },
];

// KPI calculations from mock data
export function computeKPIs(complaints: ComplaintPIISafe[]) {
  const total = complaints.length;
  const open = complaints.filter(c => ['submitted', 'assigned', 'in_progress'].includes(c.status)).length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const escalated = complaints.filter(c => c.status === 'escalated').length;
  const overdue = complaints.filter(c => {
    const age = (Date.now() - new Date(c.createdAt).getTime()) / 3600000;
    return age > c.estimatedResolutionHours && c.status !== 'resolved';
  }).length;
  const avgResolutionHours = complaints.length > 0
    ? Math.round(complaints.reduce((sum, c) => sum + c.estimatedResolutionHours, 0) / complaints.length)
    : 0;

  // Per-department stats
  const deptStats = INITIAL_DEPARTMENTS.map(dept => {
    const deptComplaints = complaints.filter(c => c.departmentId === dept.id);
    return {
      ...dept,
      total: deptComplaints.length,
      open: deptComplaints.filter(c => c.status !== 'resolved').length,
      resolved: deptComplaints.filter(c => c.status === 'resolved').length,
      avgPriority: deptComplaints.length > 0
        ? Math.round(deptComplaints.reduce((s, c) => s + c.priorityScore, 0) / deptComplaints.length)
        : 0,
    };
  });

  // Per-ward stats
  const wardMap = new Map<string, number>();
  complaints.forEach(c => {
    wardMap.set(c.ward, (wardMap.get(c.ward) || 0) + 1);
  });
  const wardStats = Array.from(wardMap.entries())
    .map(([ward, count]) => ({ ward, count }))
    .sort((a, b) => b.count - a.count);

  return { total, open, resolved, escalated, overdue, avgResolutionHours, deptStats, wardStats };
}
