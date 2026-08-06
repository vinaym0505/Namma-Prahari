-- ============================================================================
-- NAMMA PRAHARI — ROW LEVEL SECURITY (RLS) FOR ALL TABLES
-- Guarantees RLS is enabled on every table in the public schema
-- ============================================================================

-- Enable RLS on all remaining tables
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;

-- ── Departments RLS ──
CREATE POLICY departments_read_all ON public.departments
    FOR SELECT USING (true);

-- ── Users RLS ──
CREATE POLICY users_read_own ON public.users
    FOR SELECT USING (auth.uid() = id OR auth.jwt()->>'role' IN ('admin', 'department_staff'));

CREATE POLICY users_update_own ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- ── Categories RLS ──
CREATE POLICY categories_read_all ON public.categories
    FOR SELECT USING (true);

-- ── Escalations RLS ──
CREATE POLICY escalations_read_staff ON public.escalations
    FOR SELECT USING (auth.jwt()->>'role' IN ('admin', 'department_staff'));

-- ── Rewards RLS ──
CREATE POLICY rewards_read_own ON public.rewards
    FOR SELECT USING (auth.uid() = citizen_id OR auth.jwt()->>'role' = 'admin');

-- ── Representatives RLS ──
CREATE POLICY representatives_read_all ON public.representatives
    FOR SELECT USING (true);

-- ── Complaint History RLS ──
CREATE POLICY complaint_history_read ON public.complaint_history
    FOR SELECT USING (true);

-- ── AI Predictions RLS ──
CREATE POLICY ai_predictions_read ON public.ai_predictions
    FOR SELECT USING (true);
