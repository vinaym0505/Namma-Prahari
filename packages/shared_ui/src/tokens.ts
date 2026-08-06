// =============================================================================
// NAMMA PRAHARI — Shared Design Tokens
// Authoritative source for the design system across both web portals.
// See /docs/design-system.md for full specification.
// =============================================================================

export const DESIGN_TOKENS = {
  colors: {
    surface: {
      primary: '#0E1117',
      secondary: '#161B26',
      tertiary: '#1E2533',
      elevated: '#252D3D',
    },
    brand: {
      primary: '#3B82F6',
      primaryMuted: 'rgba(59, 130, 246, 0.12)',
    },
    state: {
      red: '#EF4444',
      amber: '#F59E0B',
      green: '#22C55E',
      cyan: '#06B6D4',
      violet: '#8B5CF6',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      muted: '#64748B',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      medium: 'rgba(255, 255, 255, 0.12)',
      strong: 'rgba(255, 255, 255, 0.20)',
    },
  },
  fonts: {
    heading: "'Outfit', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  radii: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },
  elevation: {
    1: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)',
    2: '0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
    3: '0 10px 15px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.15)',
    4: '0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2)',
  },
  motion: {
    durationInstant: '100ms',
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '400ms',
    durationStagger: '60ms',
    easeSpring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

// Status configuration — used for chips, badges, and filter pills
export const STATUS_CONFIG: Record<string, { bg: string; text: string; label: string; icon: string }> = {
  submitted:   { bg: 'rgba(139, 92, 246, 0.12)',  text: '#8B5CF6', label: 'Submitted',   icon: 'schedule' },
  assigned:    { bg: 'rgba(245, 158, 11, 0.12)',  text: '#F59E0B', label: 'Assigned',    icon: 'assignment_ind' },
  in_progress: { bg: 'rgba(6, 182, 212, 0.12)',   text: '#06B6D4', label: 'In Progress', icon: 'autorenew' },
  resolved:    { bg: 'rgba(34, 197, 94, 0.12)',   text: '#22C55E', label: 'Resolved',    icon: 'check_circle' },
  escalated:   { bg: 'rgba(239, 68, 68, 0.12)',   text: '#EF4444', label: 'Escalated',   icon: 'warning' },
};

// Severity configuration
export const SEVERITY_CONFIG: Record<string, { color: string; bg: string }> = {
  High:   { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' },
  Medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
  Low:    { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)' },
};

// Category icons — Material Symbols names
export const CATEGORY_ICONS: Record<string, string> = {
  BBMP_ROAD: 'construction',
  BBMP_SWM: 'delete',
  BWSSB_WATER: 'water_drop',
  BESCOM_ELEC: 'bolt',
  DRAINAGE: 'plumbing',
  OTHER: 'report',
};

// Legacy exports for backwards compatibility with existing App.tsx files
export const STATUS_COLORS = STATUS_CONFIG;
export const SEVERITY_COLORS: Record<string, string> = {
  High: '#EF4444',
  Medium: '#F59E0B',
  Low: '#06B6D4',
};
