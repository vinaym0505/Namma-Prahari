export interface Department {
  id: string;
  code: string;
  name: string;
  icon: string;
  headOfficer: string;
  contactEmail: string;
}

export interface Representative {
  constituencyName: string;
  mlaName: string;
  mlaPhone: string;
  mlaEmail: string;
  mpName: string;
  mpPhone: string;
  mpEmail: string;
}



export interface ComplaintPIISafe {
  complaintId: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  departmentId: string;
  departmentName: string;
  severity: 'Low' | 'Medium' | 'High';
  priorityScore: number;
  status: 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'escalated';
  lat: number;
  lng: number;
  address: string;
  ward: string;
  assemblyConstituency: string;
  parliamentaryConstituency: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  representative?: Representative;
  isSpam: boolean;
  isDuplicate: boolean;
  duplicateOfId?: string;
  similarIds: string[];
  summaryGenerated: string;
  estimatedResolutionHours: number;
}

export interface ComplaintHistoryItem {
  id: string;
  complaintId: string;
  statusFrom: string;
  statusTo: string;
  changedByRole: string;
  note: string;
  timestamp: string;
}

export interface AiPredictionResult {
  categoryPredicted: string;
  priorityPredicted: number;
  severityPredicted: 'Low' | 'Medium' | 'High';
  isSpam: boolean;
  isDuplicate: boolean;
  duplicateOfId?: string;
  similarIds: string[];
  summaryGenerated: string;
  estimatedResolutionHours: number;
}

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    code: "BBMP_ROAD",
    name: "BBMP Road Infrastructure & Engineering",
    icon: "Construction",
    headOfficer: "Executive Engineer K. N. Murthy",
    contactEmail: "roads@bbmp.gov.in"
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    code: "BBMP_SWM",
    name: "BBMP Solid Waste Management & Sanitation",
    icon: "Trash2",
    headOfficer: "Chief Health Officer Dr. Savitha",
    contactEmail: "swm@bbmp.gov.in"
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    code: "BWSSB_WATER",
    name: "Bengaluru Water Supply & Sewerage Board",
    icon: "Droplets",
    headOfficer: "Chief Engineer R. Venkatesh",
    contactEmail: "water@bwssb.gov.in"
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    code: "BESCOM_ELEC",
    name: "BESCOM Electrical & Streetlighting Grid",
    icon: "Zap",
    headOfficer: "Superintending Engineer S. Prakash",
    contactEmail: "streetlights@bescom.gov.in"
  }
];

export const INITIAL_REPRESENTATIVES: Record<string, Representative> = {
  "Shanti Nagar Assembly": {
    constituencyName: "Shanti Nagar Assembly",
    mlaName: "NA Haris (MLA)",
    mlaPhone: "+91 98450 11100",
    mlaEmail: "na.haris@karnataka.gov.in",
    mpName: "PC Mohan (MP)",
    mpPhone: "+91 98450 99900",
    mpEmail: "pc.mohan@sansad.nic.in"
  },
  "Indiranagar Assembly": {
    constituencyName: "Indiranagar Assembly",
    mlaName: "S. Raghu (MLA)",
    mlaPhone: "+91 98450 22200",
    mlaEmail: "s.raghu@karnataka.gov.in",
    mpName: "PC Mohan (MP)",
    mpPhone: "+91 98450 99900",
    mpEmail: "pc.mohan@sansad.nic.in"
  },
  "Koramangala Assembly": {
    constituencyName: "Koramangala Assembly",
    mlaName: "Ramalinga Reddy (MLA)",
    mlaPhone: "+91 98450 33300",
    mlaEmail: "r.reddy@karnataka.gov.in",
    mpName: "Tejasvi Surya (MP)",
    mpPhone: "+91 98450 88800",
    mpEmail: "tejasvi.surya@sansad.nic.in"
  }
};
