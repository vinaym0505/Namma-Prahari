# Namma Prahari — Developer Setup Guide

> Step-by-step instructions for setting up and running the Namma Prahari monorepo locally.

---

## 1 Prerequisites

- **Node.js**: `v18.x` or `v20.x`
- **npm**: `v9.x` or higher
- **Flutter SDK**: `v3.19.x` or higher (for mobile app development)
- **Supabase CLI**: `v1.140.x` or higher (optional, for local DB development)

---

## 2 Environment Configuration

1. Copy the `.env.example` template to `.env` in the project root:

```bash
cp .env.example .env
```

2. Populate `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

Both `admin_portal` and `department_portal` automatically inherit from the root `.env` via Vite's `envDir` configuration.

---

## 3 Installing Dependencies

Install monorepo dependencies:

```bash
npm install
```

---

## 4 Running Web Applications

### Run Admin Command Center (Port 3001)
```bash
npm run dev:admin
```
Open `http://localhost:3001` in your browser.

### Run Department Queue Portal (Port 3002)
```bash
npm run dev:dept
```
Open `http://localhost:3002` in your browser.

---

## 5 Running Mobile App

Navigate to the `mobile_app` directory and launch Flutter:

```bash
cd mobile_app
flutter pub get
flutter run
```

---

## 6 Running the Test Suite

Execute the comprehensive automated security, RLS isolation, PII privacy, and AI test suite:

```bash
npm test
```
