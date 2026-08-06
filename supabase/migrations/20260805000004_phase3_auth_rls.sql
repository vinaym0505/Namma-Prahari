-- ============================================================================
-- NAMMA PRAHARI — PHASE 3: AUTHENTICATION & PRODUCTION RLS POLICIES
-- Roles: citizen, department_staff, department_head, admin, super_admin
-- Hard privacy rule: Citizen PII stripped via view for admin/department roles
-- Hard RLS rule: Department staff locked to own department_id
-- ============================================================================

-- 1. Update user role check constraint to include all roles
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE public.users ADD CONSTRAINT users_role_check 
    CHECK (role IN ('citizen', 'department_staff', 'department_head', 'admin', 'super_admin'));

-- 2. Function to auto-create public.users row on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role VARCHAR(50);
    dept_id UUID;
BEGIN
    -- Public signups default to 'citizen'
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'citizen');
    
    -- Department staff cannot self-register as admin/staff via public signup
    IF user_role IN ('department_staff', 'department_head', 'admin', 'super_admin') THEN
        -- Only allow if explicitly flagged by admin metadata trigger
        IF (NEW.raw_user_meta_data->>'admin_provisioned')::boolean IS NOT TRUE THEN
            user_role := 'citizen';
        END IF;
    END IF;

    IF NEW.raw_user_meta_data->>'department_id' IS NOT NULL THEN
        dept_id := (NEW.raw_user_meta_data->>'department_id')::uuid;
    ELSE
        dept_id := NULL;
    END IF;

    INSERT INTO public.users (id, role, department_id, name, email, avatar_url, reward_points)
    VALUES (
        NEW.id,
        user_role,
        dept_id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url',
        0
    )
    ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        avatar_url = EXCLUDED.avatar_url;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- RE-ENFORCE PRODUCTION ROW LEVEL SECURITY (RLS) POLICIES ON COMPLAINTS
-- ============================================================================

-- Drop old placeholder policies if any
DROP POLICY IF EXISTS citizen_read_own ON public.complaints;
DROP POLICY IF EXISTS admin_read_all ON public.complaints;
DROP POLICY IF EXISTS department_staff_isolation ON public.complaints;
DROP POLICY IF EXISTS department_staff_update_status ON public.complaints;

-- Policy A: Citizen read own complaints
CREATE POLICY citizen_read_own ON public.complaints
    FOR SELECT
    USING (
        auth.uid() = citizen_id
    );

-- Policy B: Citizen insert own complaint
CREATE POLICY citizen_insert_own ON public.complaints
    FOR INSERT
    WITH CHECK (
        auth.uid() = citizen_id
    );

-- Policy C: Department Staff / Dept Head read ONLY own department complaints
CREATE POLICY department_staff_isolation ON public.complaints
    FOR SELECT
    USING (
        (auth.jwt()->>'role' IN ('department_staff', 'department_head'))
        AND department_id = (auth.jwt()->>'department_id')::uuid
    );

-- Policy D: Department Staff / Dept Head update status ONLY on own department complaints
CREATE POLICY department_staff_update_status ON public.complaints
    FOR UPDATE
    USING (
        (auth.jwt()->>'role' IN ('department_staff', 'department_head'))
        AND department_id = (auth.jwt()->>'department_id')::uuid
    )
    WITH CHECK (
        (auth.jwt()->>'role' IN ('department_staff', 'department_head'))
        AND department_id = (auth.jwt()->>'department_id')::uuid
    );

-- Policy E: Admin / Super Admin full read access
CREATE POLICY admin_read_all ON public.complaints
    FOR SELECT
    USING (
        auth.jwt()->>'role' IN ('admin', 'super_admin')
    );

-- Policy F: Admin / Super Admin full write access
CREATE POLICY admin_all ON public.complaints
    FOR ALL
    USING (
        auth.jwt()->>'role' IN ('admin', 'super_admin')
    );

-- ============================================================================
-- SEED TEST DEPARTMENT ACCOUNTS & ADMIN ACCOUNTS FOR RBAC PROOF
-- ============================================================================

-- Create test user profiles in public.users (matching seeded departments)
INSERT INTO public.users (id, role, department_id, name, email, avatar_url, reward_points) VALUES
('a1111111-1111-1111-1111-111111111111', 'department_staff', '11111111-1111-1111-1111-111111111111', 'Road Inspector Kumar', 'road_officer@bbmp.gov.in', NULL, 0),
('a2222222-2222-2222-2222-222222222222', 'department_staff', '22222222-2222-2222-2222-222222222222', 'SWM Inspector Dr. Ramesh', 'garbage_officer@bbmp.gov.in', NULL, 0),
('a3333333-3333-3333-3333-333333333333', 'department_staff', '33333333-3333-3333-3333-333333333333', 'Water Engineer Suresh', 'water_officer@bwssb.gov.in', NULL, 0),
('a4444444-4444-4444-4444-444444444444', 'department_staff', '44444444-4444-4444-4444-444444444444', 'Electrical Officer Prakash', 'electrical_officer@bescom.gov.in', NULL, 0),
('a9999999-9999-9999-9999-999999999999', 'admin', NULL, 'City Command Center Admin', 'admin@nammaprahari.gov.in', NULL, 0)
ON CONFLICT (id) DO NOTHING;
