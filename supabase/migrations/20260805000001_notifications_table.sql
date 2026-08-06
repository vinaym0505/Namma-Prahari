-- ============================================================================
-- NAMMA PRAHARI — NOTIFICATIONS TABLE
-- Supports push/in-app notifications for status updates, escalations, rewards
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('status_update', 'escalation', 'reward', 'system')),
    read BOOLEAN DEFAULT FALSE,
    complaint_id VARCHAR(50) REFERENCES public.complaints(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fetching user notifications efficiently
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_unread_idx ON public.notifications (user_id) WHERE read = FALSE;

-- RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Citizens can only see their own notifications
CREATE POLICY citizen_own_notifications ON public.notifications
    FOR SELECT
    USING (auth.uid() = user_id);

-- Citizens can mark their own notifications as read
CREATE POLICY citizen_update_read ON public.notifications
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
