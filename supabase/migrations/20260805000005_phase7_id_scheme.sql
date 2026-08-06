-- ============================================================================
-- NAMMA PRAHARI — PHASE 7: HUMAN-READABLE COMPLAINT ID SCHEME & SEEDED CATEGORIES
-- Format: NP-2026-XXXXXX
-- Categories mapped 1:1 to Departments
-- ============================================================================

-- Update Complaint ID format generator trigger
CREATE SEQUENCE IF NOT EXISTS public.complaint_np_seq START WITH 1001;

CREATE OR REPLACE FUNCTION public.generate_complaint_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' OR NEW.id LIKE 'INC-%' THEN
        NEW.id = 'NP-2026-' || LPAD(nextval('public.complaint_np_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update status check constraint to include 'pending_ai_review'
ALTER TABLE public.complaints DROP CONSTRAINT IF EXISTS complaints_status_check;
ALTER TABLE public.complaints ADD CONSTRAINT complaints_status_check 
    CHECK (status IN ('submitted', 'pending_ai_review', 'assigned', 'in_progress', 'resolved', 'escalated'));

-- Seed Categories table with department mappings
INSERT INTO public.categories (id, name, department_id, base_severity, icon) VALUES
('c1111111-1111-1111-1111-111111111111', 'Road Potholes & Infrastructure', '11111111-1111-1111-1111-111111111111', 'High', 'construction'),
('c2222222-2222-2222-2222-222222222222', 'Garbage Dump & Sanitation', '22222222-2222-2222-2222-222222222222', 'High', 'delete'),
('c3333333-3333-3333-3333-333333333333', 'Water Supply Leak & Sewerage', '33333333-3333-3333-3333-333333333333', 'Medium', 'water_drop'),
('c4444444-4444-4444-4444-444444444444', 'Streetlight Grid & Electrical', '44444444-4444-4444-4444-444444444444', 'Medium', 'bolt'),
('c5555555-5555-5555-5555-555555555555', 'Drainage & Stormwater Overflow', '11111111-1111-1111-1111-111111111111', 'High', 'plumbing'),
('c6666666-6666-6666-6666-666666666666', 'Other Civic Hazards', '11111111-1111-1111-1111-111111111111', 'Low', 'report')
ON CONFLICT (id) DO NOTHING;
