# Namma Prahari — Deployment Guide

> Production deployment instructions for Mobile App (APK), Web Portals, and Supabase Backend.

---

## 1 Flutter Mobile App Sideload Release Build

### Release APK Generation
Build signed release APK for direct Android sideloading and testing:

```bash
cd mobile_app
flutter build apk --release
```

### Output File Location
```text
mobile_app/build/app/outputs/flutter-apk/app-release.apk
```

---

## 2 React Web Portals Production Build

### Compile Production Assets
```bash
npm run build:admin   # Compiles to admin_portal/dist
npm run build:dept    # Compiles to department_portal/dist
```

### Deployed Portal URLs (Production Environment)
- **Admin Command Center**: `https://admin.nammaprahari.gov.in`
- **Department Queue Portal**: `https://dept.nammaprahari.gov.in`

### Vercel / Netlify Deployment Steps
1. Set Build Command: `npm run build:admin` (or `npm run build:dept`).
2. Set Output Directory: `dist`.
3. Configure Environment Variables in deployment host settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GOOGLE_MAPS_API_KEY`

---

## 3 Supabase Production Database Promotion

1. Apply migrations in sequential order:
   - `20260805000000_initial_schema.sql`
   - `20260805000001_notifications_table.sql`
   - `20260805000002_indexes_functions.sql`
   - `20260805000003_rls_all_tables.sql`
   - `20260805000004_phase3_auth_rls.sql`
   - `20260805000005_phase7_id_scheme.sql`

2. Deploy Edge Functions:
   ```bash
   supabase functions deploy ai-engine
   supabase functions deploy escalation-cron
   ```

3. Enable `pg_cron` extension for 30-minute SLA escalation scheduling:
   ```sql
   SELECT cron.schedule('sla-escalation-job', '*/30 * * * *', $$
     SELECT net.http_post(
       url:='https://<project-ref>.supabase.co/functions/v1/escalation-cron',
       headers:='{"Content-Type": "application/json"}'::jsonb
     );
   $$);
   ```
