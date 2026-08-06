# Namma Prahari — Design System

> Version 1.0 · Phase 1 · August 2026
>
> A civic platform visual identity inspired by professional product design
> (Material Design 3, Linear, Notion, Google Maps, YouTube Studio).
> Not a generic SaaS gradient. Not default Material purple.

---

## 1 Design Philosophy

Namma Prahari is a **government civic platform** — it must feel **authoritative, trustworthy,
and accessible** while still being modern and polished. The design draws from:

- **Google Maps**: Clean spatial information hierarchy, functional density without clutter
- **YouTube Studio**: Filter-pill interactions, data-dense tables that remain scannable
- **Linear**: Collapsed nested sidebar, keyboard-friendly, minimal chrome
- **Notion**: Generous whitespace in content areas, type-driven hierarchy
- **Material Design 3**: Dynamic color, shape system, elevation tokens

The identity avoids:
- Generic SaaS blue/purple gradients
- Dark "hacker" themes with neon accents
- Overly playful consumer-app aesthetics
- AI-generated placeholder imagery

---

## 2 Color Palette

### 2.1 Core Palette

The palette is derived from **Karnataka's state identity** (red and gold from the state flag)
and **civic infrastructure signage** (road blue, safety green, caution amber).

| Token | Hex | HSL | Role | Rationale |
|---|---|---|---|---|
| `surface-primary` | `#0E1117` | 220° 24% 7% | App background (dark mode) | Deep charcoal — authoritative, reduces eye strain for monitoring dashboards |
| `surface-secondary` | `#161B26` | 220° 22% 12% | Cards, panels | Subtle lift from background without harsh contrast |
| `surface-tertiary` | `#1E2533` | 219° 26% 16% | Hover states, active items | Progressive elevation |
| `surface-elevated` | `#252D3D` | 218° 24% 19% | Modals, dropdowns, popovers | Highest dark-mode surface |
| `brand-primary` | `#3B82F6` | 217° 91% 60% | Primary actions, active nav, links | Trustworthy institutional blue — avoids trendy indigo |
| `brand-primary-muted` | `rgba(59,130,246,0.12)` | — | Chip backgrounds, subtle highlights | 12% opacity tint |
| `state-red` | `#EF4444` | 0° 84% 60% | Escalated, high severity, SLA overdue | Standard danger — universally understood |
| `state-amber` | `#F59E0B` | 38° 92% 50% | Medium severity, assigned, warnings | Caution signage standard |
| `state-green` | `#22C55E` | 142° 71% 45% | Resolved, verified, success | Infrastructure "safe" green |
| `state-cyan` | `#06B6D4` | 189° 94% 43% | In-progress, informational | Active work indicator |
| `state-violet` | `#8B5CF6` | 258° 90% 66% | Submitted (new), AI predictions | New/incoming without urgency |
| `text-primary` | `#F1F5F9` | 210° 40% 96% | Headings, primary text | Near-white, softer than pure #FFF |
| `text-secondary` | `#94A3B8` | 215° 20% 65% | Descriptions, metadata | Mid-contrast for secondary info |
| `text-muted` | `#64748B` | 215° 16% 47% | Timestamps, labels, placeholders | Low-emphasis text |
| `border-subtle` | `rgba(255,255,255,0.06)` | — | Card borders, dividers | Barely-there structural lines |
| `border-medium` | `rgba(255,255,255,0.12)` | — | Input borders, hover borders | Interactive element boundaries |
| `border-strong` | `rgba(255,255,255,0.20)` | — | Focus rings, active borders | High-visibility for accessibility |

### 2.2 Light Mode (Mobile App Primary)

| Token | Hex | Role |
|---|---|---|
| `surface-primary` | `#FFFFFF` | Background |
| `surface-secondary` | `#F8FAFC` | Cards |
| `surface-tertiary` | `#F1F5F9` | Hover, selected |
| `text-primary` | `#0F172A` | Headings |
| `text-secondary` | `#475569` | Body |
| `text-muted` | `#94A3B8` | Captions |
| `border-subtle` | `#E2E8F0` | Dividers |
| `border-medium` | `#CBD5E1` | Inputs |

---

## 3 Typography

### 3.1 Type Scale (8pt grid aligned)

| Token | Family | Weight | Size | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|---|
| `display-lg` | Outfit | 800 | 32px | 40px | -0.025em | Page titles, KPI numbers |
| `display-md` | Outfit | 700 | 24px | 32px | -0.02em | Section headings |
| `heading-lg` | Outfit | 600 | 20px | 28px | -0.015em | Card titles |
| `heading-md` | Outfit | 600 | 16px | 24px | -0.01em | Sub-section titles |
| `body-lg` | Inter | 400 | 15px | 24px | 0 | Primary body text |
| `body-md` | Inter | 400 | 14px | 20px | 0 | Default body text |
| `body-sm` | Inter | 400 | 13px | 18px | 0 | Dense table content |
| `label-lg` | Inter | 600 | 13px | 16px | 0.01em | Button labels, nav items |
| `label-md` | Inter | 600 | 12px | 16px | 0.02em | Chip text, filter pills |
| `label-sm` | Inter | 500 | 11px | 14px | 0.04em | Timestamps, metadata |
| `caption` | Inter | 500 | 10px | 14px | 0.03em | Table headers (uppercase) |

### 3.2 Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## 4 Spacing System (8pt Grid)

All spacing values are multiples of 4px, with the primary grid at 8px.

| Token | Value | Usage |
|---|---|---|
| `space-0` | 0px | — |
| `space-1` | 4px | Tight: icon-to-text gaps, badge padding |
| `space-2` | 8px | Default: chip padding, inline gaps |
| `space-3` | 12px | Small: input padding, compact card padding |
| `space-4` | 16px | Medium: card padding, section gaps |
| `space-5` | 20px | Standard: page section spacing |
| `space-6` | 24px | Comfortable: sidebar padding, modal padding |
| `space-8` | 32px | Large: page margins, section dividers |
| `space-10` | 40px | XL: page top padding |
| `space-12` | 48px | 2XL: major section breaks |
| `space-16` | 64px | 3XL: sidebar width unit |

---

## 5 Elevation System

Using `box-shadow` for dark mode (not opacity layers, which look muddy on dark backgrounds).

| Token | CSS Value | Usage |
|---|---|---|
| `elevation-0` | `none` | Flat: inline elements, text |
| `elevation-1` | `0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)` | Cards, list items |
| `elevation-2` | `0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)` | Raised cards, dropdowns |
| `elevation-3` | `0 10px 15px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.2)` | Modals, dialogs |
| `elevation-4` | `0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2)` | Popovers, command palette |

**Rule**: Elevation increases with z-index. Never apply elevation-3 to a card that sits below a modal.

---

## 6 Shape System

| Token | Value | Usage |
|---|---|---|
| `radius-xs` | 4px | Chips, small badges |
| `radius-sm` | 6px | Buttons, inputs, tags |
| `radius-md` | 8px | Cards, panels |
| `radius-lg` | 12px | Modals, large panels |
| `radius-xl` | 16px | Image containers, hero cards |
| `radius-full` | 9999px | Avatars, circular indicators |

---

## 7 Iconography

**System**: [Material Symbols](https://fonts.google.com/icons) (Outlined, weight 400, grade 0, optical size 24px).

### Category Icons (Material Symbols names)

| Category | Icon Name | Rationale |
|---|---|---|
| Road / Pothole | `construction` | Standard infrastructure |
| Garbage / SWM | `delete` | Waste container metaphor |
| Water / BWSSB | `water_drop` | Utility standard |
| Electrical / BESCOM | `bolt` | Electrical standard |
| Drainage | `plumbing` | Underground infrastructure |
| Other | `report` | Generic issue |

### Status Icons

| Status | Icon Name | Color Token |
|---|---|---|
| Submitted | `schedule` | `state-violet` |
| Assigned | `assignment_ind` | `state-amber` |
| In Progress | `autorenew` | `state-cyan` |
| Resolved | `check_circle` | `state-green` |
| Escalated | `warning` | `state-red` |

### Navigation Icons (Admin/Dept Portals)

| Item | Icon Name |
|---|---|
| Dashboard | `space_dashboard` |
| Complaints | `list_alt` |
| Map | `map` |
| Analytics | `insights` |
| Reports | `summarize` |
| Settings | `settings` |

---

## 8 Component Patterns

### 8.1 Status Chip (YouTube Studio Filter-Pill Style)

Chips function as both display badges and interactive filter toggles.

**Visual specification**:
- Height: 28px
- Padding: `4px 10px`
- Border-radius: `radius-xs` (4px)
- Font: `label-md` (12px, 600 weight)
- Background: Status color at 12% opacity
- Text: Status color at full saturation
- Border: 1px solid status color at 20% opacity
- Transition: `all 150ms ease-out`
- Hover: Background opacity increases to 20%, border to 30%
- Active (filter selected): Background opacity 25%, border 40%, subtle inset shadow

```
┌──────────────────┐
│ ● Submitted  (12)│   ← Dot indicator + count badge
└──────────────────┘
```

### 8.2 Complaint List (Google Photos-Style Grid/Timeline Hybrid)

The complaint list is NOT a boring flat table. It groups by date (like Google Photos)
and renders dense, scannable rows with inline metadata.

**Layout**: Sticky date headers → complaint rows below each date.

```
──── Today (12 complaints) ─────────────────────────────────
┌─────────────────────────────────────────────────────────┐
│ INC-01234  ⚡ Streetlight out near MG Road    [Assigned]│
│ BESCOM_ELEC · Ward 42 · Priority 78/100  · 2h ago      │
├─────────────────────────────────────────────────────────┤
│ INC-01233  🚧 Pothole on 80 Feet Road        [Submitted]│
│ BBMP_ROAD · Ward 15 · Priority 92/100  · 4h ago        │
└─────────────────────────────────────────────────────────┘

──── Yesterday (8 complaints) ──────────────────────────────
...
```

**Interaction**:
- Click row → opens complaint detail modal (slide-in from right, Linear-style)
- Hover row → subtle `surface-tertiary` background, border-left accent in status color
- Rows animate in with staggered `slideUp` (60ms delay per item, max 8 items animated)

### 8.3 Admin Navigation (Linear-Style Nested Sidebar)

The sidebar collapses to icon-only mode at <1280px viewport. Sections are collapsible.

**Width**: 248px expanded, 64px collapsed.

```
┌──────────────────────────┐
│ 🛡️  Namma Prahari        │  ← Brand mark (shield icon + wordmark)
│     Admin Command         │  ← Subtitle, fades on collapse
├──────────────────────────┤
│                           │
│ OVERVIEW                  │  ← Section label (caption, uppercase, muted)
│  ▸ Dashboard              │  ← Active: brand-primary bg at 12%, left accent bar
│    Complaints             │
│    Live Map               │
│                           │
│ INTELLIGENCE              │
│    Analytics              │
│    Reports                │
│                           │
├──────────────────────────┤
│ ● Live · Polled 5s ago    │  ← Polling status indicator (bottom)
└──────────────────────────┘
```

**Interaction**:
- Hover item: `surface-tertiary` background, text becomes `text-primary`
- Active item: `brand-primary-muted` background, `brand-primary` text, 3px left accent bar
- Collapse transition: 250ms ease-out width animation, labels fade out at 80% of transition
- Section labels: click to collapse/expand children (chevron rotates)

### 8.4 KPI Card

```
┌────────────────────────────┐
│  Total Complaints          │  ← label-sm, text-muted, uppercase
│  2,847                     │  ← display-lg, text-primary
│  ↑ 12% from last week     │  ← body-sm, state-green (or state-red if negative)
│  ─────────── sparkline ──  │  ← Thin 2px sparkline chart, 48px tall
└────────────────────────────┘
```

- Padding: `space-5` (20px)
- Background: `surface-secondary`
- Border: 1px `border-subtle`
- Border-radius: `radius-md`
- Top accent: 2px colored bar at top edge matching KPI category
- Hover: elevation-2, border becomes `border-medium`
- Enter animation: `slideUp` with staggered delay (0ms, 60ms, 120ms, 180ms)

### 8.5 Complaint Detail (Slide-In Panel)

Opens from the right edge like Linear's issue detail. Not a centered modal — this keeps
the list visible on the left for context.

**Width**: 560px (or 100% on mobile).
**Animation**: `slideRight` 300ms with overlay fade.

```
┌──────────────────────────────────────────┐
│ ← Back    INC-01234           [Escalated]│
├──────────────────────────────────────────┤
│ ┌──────────────────────────────────────┐ │
│ │                                      │ │
│ │          📷 Complaint Photo          │ │  ← Zoomable, click for fullscreen
│ │           (real user photo)          │ │
│ │                                      │ │
│ └──────────────────────────────────────┘ │
│                                          │
│ Category    Road / Pothole               │
│ Severity    ██████░░░░ High              │
│ Priority    92/100                       │
│ Status      Escalated (24h)              │
│ Department  BBMP Road Infrastructure     │
│                                          │
│ ── LOCATION ──────────────────────────── │
│ Address     80 Feet Road, Koramangala    │
│ Ward        Ward 15                      │
│ Assembly    BTM Layout                   │
│ Parliament  Bengaluru South              │
│ [Google Maps Embed]                      │
│                                          │
│ ── REPRESENTATIVES ──────────────────── │
│ MLA         Ramalinga Reddy              │
│ MP          Tejasvi Surya                │
│                                          │
│ ── TIMELINE ─────────────────────────── │
│ ● Submitted     Aug 5, 10:30 AM         │
│ ● Assigned      Aug 5, 11:00 AM         │
│ ● Escalated     Aug 6, 10:30 AM (24h)   │
└──────────────────────────────────────────┘
```

**Privacy**: No citizen name, email, phone, or reward points anywhere in this panel.

---

## 9 Motion &amp; Animation

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `duration-instant` | 100ms | `ease-out` | Checkbox, toggle, color change |
| `duration-fast` | 150ms | `ease-out` | Hover states, button press |
| `duration-normal` | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Modal enter, chip toggle |
| `duration-slow` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page transitions, sidebar collapse |
| `duration-stagger` | 60ms | — | Per-item delay in list animations (max 8 items) |

**Rules**:
- Never animate layout properties (width, height) without `will-change` hints
- Prefer `transform` and `opacity` for GPU-accelerated animations
- Reduce motion for `prefers-reduced-motion: reduce` users

---

## 10 Design Token Implementations

### 10.1 CSS Variables (Web Portals)

```css
:root {
  /* === Surfaces === */
  --surface-primary: #0E1117;
  --surface-secondary: #161B26;
  --surface-tertiary: #1E2533;
  --surface-elevated: #252D3D;

  /* === Brand === */
  --brand-primary: #3B82F6;
  --brand-primary-muted: rgba(59, 130, 246, 0.12);

  /* === State Colors === */
  --state-red: #EF4444;
  --state-amber: #F59E0B;
  --state-green: #22C55E;
  --state-cyan: #06B6D4;
  --state-violet: #8B5CF6;

  /* === Text === */
  --text-primary: #F1F5F9;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;

  /* === Borders === */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-medium: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.20);

  /* === Typography === */
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* === Spacing (8pt grid) === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* === Radii === */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* === Elevation === */
  --elevation-1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15);
  --elevation-2: 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15);
  --elevation-3: 0 10px 15px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.15);
  --elevation-4: 0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2);

  /* === Motion === */
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 10.2 Tailwind Configuration

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../packages/shared_ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#0E1117',
          secondary: '#161B26',
          tertiary: '#1E2533',
          elevated: '#252D3D',
        },
        brand: {
          DEFAULT: '#3B82F6',
          muted: 'rgba(59, 130, 246, 0.12)',
        },
        state: {
          red: '#EF4444',
          amber: '#F59E0B',
          green: '#22C55E',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
        },
        txt: {
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
      fontFamily: {
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '800' }],
        'display-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['20px', { lineHeight: '28px', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading-md': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg':    ['15px', { lineHeight: '24px', fontWeight: '400' }],
        'body-md':    ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-sm':    ['13px', { lineHeight: '18px', fontWeight: '400' }],
        'label-lg':   ['13px', { lineHeight: '16px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-md':   ['12px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '600' }],
        'label-sm':   ['11px', { lineHeight: '14px', letterSpacing: '0.04em', fontWeight: '500' }],
        'caption':    ['10px', { lineHeight: '14px', letterSpacing: '0.03em', fontWeight: '500' }],
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15)',
        'elevation-2': '0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
        'elevation-3': '0 10px 15px rgba(0,0,0,0.35), 0 4px 6px rgba(0,0,0,0.15)',
        'elevation-4': '0 20px 25px rgba(0,0,0,0.4), 0 8px 10px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-live': 'pulseLive 2s ease-in-out infinite',
        'scale-in': 'scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseLive: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
```

### 10.3 Flutter ThemeData

```dart
// core/theme/app_colors.dart
import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // Surfaces
  static const surfacePrimary = Color(0xFF0E1117);
  static const surfaceSecondary = Color(0xFF161B26);
  static const surfaceTertiary = Color(0xFF1E2533);
  static const surfaceElevated = Color(0xFF252D3D);

  // Light mode surfaces
  static const surfacePrimaryLight = Color(0xFFFFFFFF);
  static const surfaceSecondaryLight = Color(0xFFF8FAFC);
  static const surfaceTertiaryLight = Color(0xFFF1F5F9);

  // Brand
  static const brandPrimary = Color(0xFF3B82F6);
  static const brandPrimaryMuted = Color(0x1F3B82F6); // 12%

  // State
  static const stateRed = Color(0xFFEF4444);
  static const stateAmber = Color(0xFFF59E0B);
  static const stateGreen = Color(0xFF22C55E);
  static const stateCyan = Color(0xFF06B6D4);
  static const stateViolet = Color(0xFF8B5CF6);

  // Text (dark mode)
  static const textPrimary = Color(0xFFF1F5F9);
  static const textSecondary = Color(0xFF94A3B8);
  static const textMuted = Color(0xFF64748B);

  // Text (light mode)
  static const textPrimaryLight = Color(0xFF0F172A);
  static const textSecondaryLight = Color(0xFF475569);
  static const textMutedLight = Color(0xFF94A3B8);

  // Borders (dark mode)
  static const borderSubtle = Color(0x0FFFFFFF); // 6%
  static const borderMedium = Color(0x1FFFFFFF); // 12%
  static const borderStrong = Color(0x33FFFFFF); // 20%

  // Borders (light mode)
  static const borderSubtleLight = Color(0xFFE2E8F0);
  static const borderMediumLight = Color(0xFFCBD5E1);
}
```

```dart
// core/theme/app_typography.dart
import 'package:flutter/material.dart';

class AppTypography {
  AppTypography._();

  static const _outfit = 'Outfit';
  static const _inter = 'Inter';

  static TextTheme get textTheme => const TextTheme(
    displayLarge: TextStyle(fontFamily: _outfit, fontSize: 32, fontWeight: FontWeight.w800, letterSpacing: -0.8, height: 1.25),
    displayMedium: TextStyle(fontFamily: _outfit, fontSize: 24, fontWeight: FontWeight.w700, letterSpacing: -0.48, height: 1.33),
    headlineLarge: TextStyle(fontFamily: _outfit, fontSize: 20, fontWeight: FontWeight.w600, letterSpacing: -0.3, height: 1.4),
    headlineMedium: TextStyle(fontFamily: _outfit, fontSize: 16, fontWeight: FontWeight.w600, letterSpacing: -0.16, height: 1.5),
    bodyLarge: TextStyle(fontFamily: _inter, fontSize: 15, fontWeight: FontWeight.w400, height: 1.6),
    bodyMedium: TextStyle(fontFamily: _inter, fontSize: 14, fontWeight: FontWeight.w400, height: 1.43),
    bodySmall: TextStyle(fontFamily: _inter, fontSize: 13, fontWeight: FontWeight.w400, height: 1.38),
    labelLarge: TextStyle(fontFamily: _inter, fontSize: 13, fontWeight: FontWeight.w600, letterSpacing: 0.13, height: 1.23),
    labelMedium: TextStyle(fontFamily: _inter, fontSize: 12, fontWeight: FontWeight.w600, letterSpacing: 0.24, height: 1.33),
    labelSmall: TextStyle(fontFamily: _inter, fontSize: 11, fontWeight: FontWeight.w500, letterSpacing: 0.44, height: 1.27),
  );
}
```

```dart
// core/theme/app_theme.dart
import 'package:flutter/material.dart';
import 'app_colors.dart';
import 'app_typography.dart';

class AppTheme {
  AppTheme._();

  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.surfacePrimaryLight,
    colorScheme: const ColorScheme.light(
      primary: AppColors.brandPrimary,
      secondary: AppColors.stateCyan,
      error: AppColors.stateRed,
      surface: AppColors.surfacePrimaryLight,
    ),
    textTheme: AppTypography.textTheme.apply(
      bodyColor: AppColors.textPrimaryLight,
      displayColor: AppColors.textPrimaryLight,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.surfacePrimaryLight,
      foregroundColor: AppColors.textPrimaryLight,
      elevation: 0,
      scrolledUnderElevation: 1,
    ),
    cardTheme: CardThemeData(
      color: AppColors.surfaceSecondaryLight,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: AppColors.borderSubtleLight),
      ),
    ),
    chipTheme: ChipThemeData(
      backgroundColor: AppColors.surfaceTertiaryLight,
      labelStyle: AppTypography.textTheme.labelMedium!.copyWith(
        color: AppColors.textSecondaryLight,
      ),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
      side: const BorderSide(color: AppColors.borderSubtleLight),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surfacePrimaryLight,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.borderMediumLight),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.brandPrimary, width: 2),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.brandPrimary,
        foregroundColor: Colors.white,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        textStyle: AppTypography.textTheme.labelLarge,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.borderSubtleLight,
      thickness: 1,
    ),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.surfacePrimary,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.brandPrimary,
      secondary: AppColors.stateCyan,
      error: AppColors.stateRed,
      surface: AppColors.surfacePrimary,
    ),
    textTheme: AppTypography.textTheme.apply(
      bodyColor: AppColors.textPrimary,
      displayColor: AppColors.textPrimary,
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.surfacePrimary,
      foregroundColor: AppColors.textPrimary,
      elevation: 0,
      scrolledUnderElevation: 1,
    ),
    cardTheme: CardThemeData(
      color: AppColors.surfaceSecondary,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: AppColors.borderSubtle),
      ),
    ),
    chipTheme: ChipThemeData(
      backgroundColor: AppColors.surfaceTertiary,
      labelStyle: AppTypography.textTheme.labelMedium!.copyWith(
        color: AppColors.textSecondary,
      ),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
      side: const BorderSide(color: AppColors.borderSubtle),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surfacePrimary,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.borderMedium),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: AppColors.brandPrimary, width: 2),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.brandPrimary,
        foregroundColor: Colors.white,
        elevation: 0,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
        textStyle: AppTypography.textTheme.labelLarge,
      ),
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.borderSubtle,
      thickness: 1,
    ),
  );
}
```

### 10.4 Shared TypeScript Tokens

```ts
// packages/shared_ui/src/tokens.ts
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
  motion: {
    durationInstant: '100ms',
    durationFast: '150ms',
    durationNormal: '250ms',
    durationSlow: '400ms',
    durationStagger: '60ms',
    easeSpring: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export const STATUS_CONFIG = {
  submitted: { bg: 'rgba(139, 92, 246, 0.12)', text: '#8B5CF6', label: 'Submitted', icon: 'schedule' },
  assigned: { bg: 'rgba(245, 158, 11, 0.12)', text: '#F59E0B', label: 'Assigned', icon: 'assignment_ind' },
  in_progress: { bg: 'rgba(6, 182, 212, 0.12)', text: '#06B6D4', label: 'In Progress', icon: 'autorenew' },
  resolved: { bg: 'rgba(34, 197, 94, 0.12)', text: '#22C55E', label: 'Resolved', icon: 'check_circle' },
  escalated: { bg: 'rgba(239, 68, 68, 0.12)', text: '#EF4444', label: 'Escalated', icon: 'warning' },
} as const;

export const SEVERITY_CONFIG = {
  High: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)' },
  Medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
  Low: { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)' },
} as const;

export const CATEGORY_ICONS: Record<string, string> = {
  BBMP_ROAD: 'construction',
  BBMP_SWM: 'delete',
  BWSSB_WATER: 'water_drop',
  BESCOM_ELEC: 'bolt',
  DRAINAGE: 'plumbing',
  OTHER: 'report',
};
```
