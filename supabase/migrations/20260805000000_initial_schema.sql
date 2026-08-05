-- ============================================================================
-- NAMMA PRAHARI — PRODUCTION SUPABASE POSTGRES SCHEMA MIGRATION
-- Extensions: PostGIS (Spatial), pgvector (Embeddings / Similarity Search)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    head_officer VARCHAR(255),
    contact_email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USERS TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('citizen', 'admin', 'department_staff')),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    reward_points INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    department_id UUID REFERENCES public.departments(id) ON DELETE CASCADE,
    base_severity VARCHAR(50) CHECK (base_severity IN ('Low', 'Medium', 'High')),
    icon VARCHAR(100) NOT NULL
);

-- 4. COMPLAINTS TABLE
CREATE TABLE IF NOT EXISTS public.complaints (
    id VARCHAR(50) PRIMARY KEY, -- INC-XXXX
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id),
    department_id UUID REFERENCES public.departments(id),
    severity VARCHAR(50) DEFAULT 'Medium' CHECK (severity IN ('Low', 'Medium', 'High')),
    priority_score INT DEFAULT 50,
    status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'assigned', 'in_progress', 'resolved', 'escalated')),
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    location_geom GEOMETRY(Point, 4326),
    address TEXT NOT NULL,
    ward VARCHAR(255) NOT NULL,
    assembly_constituency VARCHAR(255) NOT NULL,
    parliamentary_constituency VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    citizen_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for PostGIS spatial queries
CREATE INDEX IF NOT EXISTS complaints_location_geom_idx ON public.complaints USING GIST(location_geom);

-- 5. COMPLAINT HISTORY (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS public.complaint_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id VARCHAR(50) REFERENCES public.complaints(id) ON DELETE CASCADE,
    status_from VARCHAR(50),
    status_to VARCHAR(50) NOT NULL,
    changed_by_role VARCHAR(50) NOT NULL,
    note TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AI PREDICTIONS TABLE (Stores 10 Free-tier AI outputs)
CREATE TABLE IF NOT EXISTS public.ai_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id VARCHAR(50) UNIQUE REFERENCES public.complaints(id) ON DELETE CASCADE,
    category_predicted VARCHAR(255),
    priority_predicted INT,
    severity_predicted VARCHAR(50),
    is_spam BOOLEAN DEFAULT FALSE,
    is_duplicate BOOLEAN DEFAULT FALSE,
    duplicate_of_id VARCHAR(50),
    similar_ids TEXT[],
    summary_generated TEXT,
    description_vector VECTOR(384), -- pgvector embeddings for similarity
    estimated_resolution_hours INT DEFAULT 24,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ESCALATIONS TABLE
CREATE TABLE IF NOT EXISTS public.escalations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id VARCHAR(50) REFERENCES public.complaints(id) ON DELETE CASCADE,
    level VARCHAR(50) NOT NULL CHECK (level IN ('6h_reminder', '12h_reminder', '24h_dept_head', '48h_senior_officer', '72h_commissioner')),
    escalated_to VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REWARDS TABLE
CREATE TABLE IF NOT EXISTS public.rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    points INT NOT NULL,
    reason TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 9. REPRESENTATIVES REFERENCE DATA
CREATE TABLE IF NOT EXISTS public.representatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    constituency_name VARCHAR(255) UNIQUE NOT NULL,
    mla_name VARCHAR(255) NOT NULL,
    mla_phone VARCHAR(50) NOT NULL,
    mla_email VARCHAR(255) NOT NULL,
    mp_name VARCHAR(255) NOT NULL,
    mp_phone VARCHAR(50) NOT NULL,
    mp_email VARCHAR(255) NOT NULL
);

-- ============================================================================
-- PRIVACY ENFORCEMENT VIEW (HARD RULE 5): STRIPS ALL CITIZEN PII FOR ADMIN/DEPT
-- ============================================================================

CREATE OR REPLACE VIEW public.admin_department_complaints_view AS
SELECT 
    c.id AS complaint_id,
    c.title,
    c.description,
    c.category_id,
    cat.name AS category_name,
    c.department_id,
    dept.name AS department_name,
    c.severity,
    c.priority_score,
    c.status,
    c.lat,
    c.lng,
    c.address,
    c.ward,
    c.assembly_constituency,
    c.parliamentary_constituency,
    c.image_url,
    c.created_at,
    c.updated_at,
    rep.mla_name,
    rep.mla_phone,
    rep.mla_email,
    rep.mp_name,
    rep.mp_phone,
    rep.mp_email,
    ai.is_spam,
    ai.is_duplicate,
    ai.duplicate_of_id,
    ai.similar_ids,
    ai.summary_generated,
    ai.estimated_resolution_hours
    -- ABSOLUTELY NO citizen_id, name, email, phone, or reward_points!
FROM public.complaints c
LEFT JOIN public.categories cat ON c.category_id = cat.id
LEFT JOIN public.departments dept ON c.department_id = dept.id
LEFT JOIN public.representatives rep ON c.assembly_constituency = rep.constituency_name
LEFT JOIN public.ai_predictions ai ON c.id = ai.complaint_id;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (HARD RULE 4: DEPARTMENT ISOLATION)
-- ============================================================================

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;

-- Citizen Policy: Can see own complaints
CREATE POLICY citizen_read_own ON public.complaints 
    FOR SELECT 
    USING (auth.uid() = citizen_id);

-- Admin Policy: Can read all complaints
CREATE POLICY admin_read_all ON public.complaints 
    FOR SELECT 
    USING (auth.jwt()->>'role' = 'admin');

-- Department Staff Policy: Strictly isolated to own department_id
CREATE POLICY department_staff_isolation ON public.complaints 
    FOR SELECT 
    USING (
        auth.jwt()->>'role' = 'department_staff' 
        AND department_id = (auth.jwt()->>'department_id')::uuid
    );

CREATE POLICY department_staff_update_status ON public.complaints 
    FOR UPDATE 
    USING (
        auth.jwt()->>'role' = 'department_staff' 
        AND department_id = (auth.jwt()->>'department_id')::uuid
    );

-- SEED INITIAL DEPARTMENTS & REPRESENTATIVES DATA
INSERT INTO public.departments (id, code, name, icon, head_officer, contact_email) VALUES
('11111111-1111-1111-1111-111111111111', 'BBMP_ROAD', 'BBMP Road Infrastructure & Engineering', 'Construction', 'Executive Engineer K. N. Murthy', 'roads@bbmp.gov.in'),
('22222222-2222-2222-2222-222222222222', 'BBMP_SWM', 'BBMP Solid Waste Management & Sanitation', 'Trash2', 'Chief Health Officer Dr. Savitha', 'swm@bbmp.gov.in'),
('33333333-3333-3333-3333-333333333333', 'BWSSB_WATER', 'Bengaluru Water Supply & Sewerage Board', 'Droplets', 'Chief Engineer R. Venkatesh', 'water@bwssb.gov.in'),
('44444444-4444-4444-4444-444444444444', 'BESCOM_ELEC', 'BESCOM Electrical & Streetlighting Grid', 'Zap', 'Superintending Engineer S. Prakash', 'streetlights@bescom.gov.in')
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.representatives (constituency_name, mla_name, mla_phone, mla_email, mp_name, mp_phone, mp_email) VALUES
('Shanti Nagar Assembly', 'NA Haris (MLA)', '+91 98450 11100', 'na.haris@karnataka.gov.in', 'PC Mohan (MP)', '+91 98450 99900', 'pc.mohan@sansad.nic.in'),
('Indiranagar Assembly', 'S. Raghu (MLA)', '+91 98450 22200', 's.raghu@karnataka.gov.in', 'PC Mohan (MP)', '+91 98450 99900', 'pc.mohan@sansad.nic.in'),
('Koramangala Assembly', 'Ramalinga Reddy (MLA)', '+91 98450 33300', 'r.reddy@karnataka.gov.in', 'Tejasvi Surya (MP)', '+91 98450 88800', 'tejasvi.surya@sansad.nic.in')
ON CONFLICT (constituency_name) DO NOTHING;
