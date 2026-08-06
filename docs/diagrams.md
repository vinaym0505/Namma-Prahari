# Namma Prahari — System Diagrams

> Comprehensive Mermaid diagrams illustrating System Architecture, Entity-Relationships, Sequence Flows, Activity, and Use Cases.

---

## 1 High-Level Architecture Diagram

```mermaid
flowchart TB
    subgraph ClientTier["Client Tier"]
        Mobile["📱 Citizen Mobile App\n(Flutter · Clean Architecture)"]
        Admin["🖥️ Admin Web Portal\n(React · Vite · TypeScript)"]
        Dept["🖥️ Department Web Portal\n(React · Vite · TypeScript)"]
    end

    subgraph SupabaseTier["Supabase Backend (Free Tier)"]
        Auth["🔐 Auth Service"]
        DB[("🗄️ Postgres + PostGIS + pgvector\n(RLS Policies Enforced)")]
        Storage["📦 Storage Bucket"]
        AIEngine["🤖 ai-engine\n(11 AI Features)"]
        EscalationCron["⏰ escalation-cron\n(SLA Timers)"]
    end

    Mobile --> Auth
    Mobile --> DB
    Mobile --> Storage
    Admin --> DB
    Dept --> DB
    DB --> AIEngine
    EscalationCron --> DB
```

---

## 2 Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    USERS ||--o{ COMPLAINTS : "submits"
    DEPARTMENTS ||--o{ COMPLAINTS : "assigned to"
    CATEGORIES ||--o{ COMPLAINTS : "classified as"
    COMPLAINTS ||--o{ COMPLAINT_HISTORY : "has timeline"
    COMPLAINTS ||--|| AI_PREDICTIONS : "has AI outcomes"
    COMPLAINTS ||--o{ ESCALATIONS : "has SLA events"
    USERS ||--o{ NOTIFICATIONS : "receives"

    USERS {
        uuid id PK
        varchar role "citizen | admin | department_staff"
        uuid department_id FK
        varchar name
        varchar email
    }

    COMPLAINTS {
        varchar id PK "NP-2026-XXXXXX"
        varchar title
        text description
        uuid category_id FK
        uuid department_id FK
        varchar severity
        int priority_score
        varchar status
        float lat
        float lng
        text address
        varchar ward
        uuid citizen_id FK
    }
```

---

## 3 Sequence Diagram: Citizen Complaint Submission

```mermaid
sequenceDiagram
    autonumber
    actor Citizen
    participant App as Citizen App
    participant GPS as GpsService
    participant Cam as CameraService
    participant Supa as Supabase DB
    participant AI as AI Engine

    Citizen->>App: Tap "Report Civic Issue"
    App->>GPS: Check Location Service Status
    alt GPS Disabled
        GPS-->>App: Disabled
        App->>Citizen: Show mandatory GPS dialog
    else GPS Active
        GPS-->>App: Coordinates Locked (lat, lng)
        App->>Cam: Open Custom Camera UI
        Citizen->>Cam: Capture Photo
        Cam-->>App: Photo File Path
        App->>Citizen: Display Full-Screen Preview
        Citizen->>App: Tap "Use Photo"
        App->>Citizen: Display Category & Description Form
        Citizen->>App: Tap "Submit Complaint"
        App->>Supa: Upload Image & INSERT Complaint (status=pending_ai_review)
        Supa-->>AI: Trigger AI Pipeline
        AI-->>Supa: Write predictions & Update status to 'submitted'
        App-->>Citizen: Show Success Confirmation (NP-2026-000123)
    end
```
