-- ============================================================================
-- NAMMA PRAHARI — INDEXES, TRIGGERS, AND HELPER FUNCTIONS
-- Performance indexes and utility functions for the complaint system
-- ============================================================================

-- ── Performance Indexes ──

-- Complaints: most common query patterns
CREATE INDEX IF NOT EXISTS complaints_status_idx ON public.complaints (status);
CREATE INDEX IF NOT EXISTS complaints_department_id_idx ON public.complaints (department_id);
CREATE INDEX IF NOT EXISTS complaints_ward_idx ON public.complaints (ward);
CREATE INDEX IF NOT EXISTS complaints_created_at_idx ON public.complaints (created_at DESC);
CREATE INDEX IF NOT EXISTS complaints_citizen_id_idx ON public.complaints (citizen_id);
CREATE INDEX IF NOT EXISTS complaints_severity_idx ON public.complaints (severity);
CREATE INDEX IF NOT EXISTS complaints_priority_score_idx ON public.complaints (priority_score DESC);

-- Complaint history: timeline queries
CREATE INDEX IF NOT EXISTS complaint_history_complaint_id_idx ON public.complaint_history (complaint_id, timestamp DESC);

-- AI predictions: lookup by complaint
CREATE INDEX IF NOT EXISTS ai_predictions_complaint_id_idx ON public.ai_predictions (complaint_id);

-- Escalations: lookup by complaint
CREATE INDEX IF NOT EXISTS escalations_complaint_id_idx ON public.escalations (complaint_id, timestamp DESC);

-- Rewards: leaderboard queries
CREATE INDEX IF NOT EXISTS rewards_citizen_id_idx ON public.rewards (citizen_id);

-- ── Auto-update timestamp trigger ──

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complaints_updated_at
    BEFORE UPDATE ON public.complaints
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ── Auto-generate complaint ID (INC-XXXXX) ──

CREATE SEQUENCE IF NOT EXISTS public.complaint_id_seq START WITH 10001;

CREATE OR REPLACE FUNCTION public.generate_complaint_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        NEW.id = 'INC-' || LPAD(nextval('public.complaint_id_seq')::TEXT, 5, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complaints_auto_id
    BEFORE INSERT ON public.complaints
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_complaint_id();

-- ── Auto-populate PostGIS geometry from lat/lng ──

CREATE OR REPLACE FUNCTION public.set_complaint_geom()
RETURNS TRIGGER AS $$
BEGIN
    NEW.location_geom = ST_SetSRID(ST_MakePoint(NEW.lng, NEW.lat), 4326);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER complaints_set_geom
    BEFORE INSERT OR UPDATE OF lat, lng ON public.complaints
    FOR EACH ROW
    EXECUTE FUNCTION public.set_complaint_geom();
