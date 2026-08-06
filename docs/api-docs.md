# Namma Prahari — Edge Function API Documentation

> Specification for HTTP-facing Edge Functions in Supabase.

---

## 1 `ai-engine` Edge Function

- **URL**: `POST /functions/v1/ai-engine`
- **Authentication**: Bearer Token (`SUPABASE_ANON_KEY` or `SUPABASE_SERVICE_ROLE_KEY`)

### Request Body (`application/json`)
```json
{
  "complaint_id": "NP-2026-000101",
  "title": "Severe Pothole on 80 Feet Road",
  "description": "Deep dangerous pothole near Sony World Signal causing traffic disruption.",
  "category_id": "c1111111-1111-1111-1111-111111111111",
  "lat": 12.9345,
  "lng": 77.6255,
  "ward": "Ward 15 (Koramangala)",
  "image_url": "https://xyz.supabase.co/storage/v1/object/public/complaint-photos/pothole.jpg"
}
```

### Response Body (`200 OK`)
```json
{
  "success": true,
  "complaint_id": "NP-2026-000101",
  "is_duplicate": false,
  "duplicate_of_id": null,
  "severity": "High",
  "priority_score": 85,
  "assigned_department": "BBMP_ROAD"
}
```

---

## 2 `escalation-cron` Edge Function

- **URL**: `POST /functions/v1/escalation-cron`
- **Trigger**: Cron job every 30 minutes (`pg_cron`)

### Response Body (`200 OK`)
```json
{
  "success": true,
  "complaints_scanned": 42,
  "escalations_triggered": 3
}
```
