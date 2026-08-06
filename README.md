# Namma Prahari (ನಮ್ಮ ಪ್ರಹಾರಿ)

> **Smart Civic Issue Management Platform** for Citizen Sentinel Reporting, AI-Driven Categorization & Routing, and Government Department Resolution.

---

## 🏛️ Platform Overview

Namma Prahari is a multi-client civic issue reporting and monitoring platform built for urban governance in Bengaluru. Citizens report infrastructure defects (potholes, garbage, water leaks, streetlight failures), while Government Departments (BBMP, BWSSB, BESCOM) and City Administrators monitor, route, and resolve complaints within SLA targets.

```
                  ┌─────────────────────────────────────────┐
                  │ 📱 Citizen Mobile App (Flutter/Riverpod) │
                  └────────────────────┬────────────────────┘
                                       │ Google OAuth / Lat-Lng
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ☁️ Supabase Cloud (Free Tier)                          │
│  Postgres + PostGIS + pgvector │ Auth Service │ Storage (complaint-photos)  │
└──────┬───────────────────────────────────────────────────────────────┬──────┘
       │ PII-Stripped Views                                            │ Scoped RLS
       ▼                                                               ▼
┌───────────────────────────────┐               ┌──────────────────────────────┐
│ 🖥️ Admin Command Center        │               │ 🖥️ Department Queue Portal   │
│ (React · Vite · City Monitoring)│               │ (React · Vite · Work Queues) │
└───────────────────────────────┘               └──────────────────────────────┘
```

---

## 🚀 Key Features & App Boundaries

### 📱 Citizen Mobile App (Flutter / Dart)
- **Mandatory GPS Gate**: Location services hardware check enforces that camera access is blocked until GPS is locked. Catches mid-flow GPS toggling.
- **Client-Side Image Validation**: Quality sanity checks verify non-corrupt frame (>5 KB) and 5 MB storage limits before photo submission.
- **Human-Readable Complaint ID**: `NP-2026-XXXXXX` format generated via Postgres sequences.
- **Status Stepper & Timeline**: Public milestone tracking (*Submitted → Assigned → In Progress → Resolved*).
- **Citizen Rewards**: Earn +50 points per verified non-spam report.

### 🖥️ Admin Command Center (`admin_portal`)
- **Zero Reporting Tools**: Pure city-wide monitoring dashboard; complaint creation tools are strictly banned.
- **Hard Privacy Rule (Database View)**: Citizen PII (`name`, `email`, `phone`, `reward_points`) is stripped at the Postgres view layer (`admin_department_complaints_view`).
- **Live Spatial Map & Bespoke Analytics**: Leaflet/Carto spatial map layer, Recharts department workload, and CSV executive report generator.

### 🖥️ Department Queue Portal (`department_portal`)
- **RLS-Isolated Work Queues**: Department staff accounts (`BBMP_ROAD`, `BBMP_SWM`, `BWSSB_WATER`, `BESCOM_ELEC`) can ONLY view complaints assigned to their `department_id`.
- **Status Transition Workflow**: Dropdown-only transitions with mandatory officer audit logging to `complaint_history`. Zero web photo uploads.

### 🤖 100% Free-Tier AI Engine (Supabase Edge Function)
1. **Duplicate Detection**: PostGIS ST_DWithin (<500m) + Jaccard text similarity.
2. **Auto-Categorization**: Keyword matrix & TF-IDF scoring.
3. **Image Validation**: Histogram variance & exposure check.
4. **Spam Filter**: Character entropy & gibberish detector.
5. **Severity Estimation**: Multi-factor weight calculation.
6. **Priority Score**: Formula combining severity, duplicate count, and ward density.
7. **Department Routing**: Category-to-Department mapping.
8. **Title Generation**: Extractive template generator.
9. **Summary Generation**: Key defect phrase extraction.
10. **Resolution SLA ETA**: Historical median resolution hours.
11. **Similar Complaint Search**: `pgvector` 384-dimensional cosine distance similarity query.

---

## 🛠️ Monorepo Structure

```
Namma-Prahari/
├── mobile_app/                  # Flutter Citizen App (Clean Architecture + MVVM)
├── admin_portal/                # React Vite Admin Command Center
├── department_portal/           # React Vite Department Queue Portal
├── packages/
│   └── shared_ui/               # Shared TypeScript types, design tokens, test suite
├── supabase/
│   ├── migrations/              # SQL schema migrations (20260805000000 - 20260805000005)
│   └── functions/               # Supabase Edge Functions (ai-engine, escalation-cron)
└── docs/                        # Specifications, architecture, design system, API docs
```

---

## 🧪 Testing & Verification

Run the comprehensive automated test suite verifying RLS isolation, PII privacy, API query denial, AI duplicate detection, and SLA escalation:

```bash
npm test
```

---

## 📄 Documentation Links
- [Setup Guide](file:///d:/Namma-Prahari/docs/setup-guide.md)
- [Deployment Guide](file:///d:/Namma-Prahari/docs/deployment-guide.md)
- [API Documentation](file:///d:/Namma-Prahari/docs/api-docs.md)
- [Architecture & Diagrams](file:///d:/Namma-Prahari/docs/diagrams.md)
- [Design System Specification](file:///d:/Namma-Prahari/docs/design-system.md)
