// =============================================================================
// NAMMA PRAHARI — ESCALATION CRON ENGINE (SUPABASE EDGE FUNCTION)
// Scheduled via pg_cron every 30 minutes.
// Scans unresolved complaints against SLA thresholds and triggers escalations:
//   • > 6h  -> 6h_reminder
//   • > 12h -> 12h_reminder
//   • > 24h -> 24h_dept_head (updates status to 'escalated')
//   • > 48h -> 48h_senior_officer
//   • > 72h -> 72h_commissioner
// =============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

export const ESCALATION_LEVELS = [
  { hours: 6, code: "6h_reminder", target: "Assigned Department Staff" },
  { hours: 12, code: "12h_reminder", target: "Department Nodal Officer" },
  { hours: 24, code: "24h_dept_head", target: "Department Head (Executive Engineer)" },
  { hours: 48, code: "48h_senior_officer", target: "Senior Zonal Joint Commissioner" },
  { hours: 72, code: "72h_commissioner", target: "BBMP City Commissioner" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all active unresolved complaints
    const { data: complaints, error } = await supabase
      .from("complaints")
      .select("id, created_at, status, department_id, citizen_id, title")
      .neq("status", "resolved");

    if (error) throw error;

    let escalationsTriggered = 0;
    const now = new Date().getTime();

    for (const comp of complaints || []) {
      const createdAt = new Date(comp.created_at).getTime();
      const elapsedHours = (now - createdAt) / (1000 * 60 * 60);

      // Fetch existing escalations for this complaint
      const { data: existingEscalations } = await supabase
        .from("escalations")
        .select("level")
        .eq("complaint_id", comp.id);

      const loggedLevels = new Set((existingEscalations || []).map((e) => e.level));

      for (const level of ESCALATION_LEVELS) {
        if (elapsedHours >= level.hours && !loggedLevels.has(level.code)) {
          // Log escalation event
          await supabase.from("escalations").insert({
            complaint_id: comp.id,
            level: level.code,
            escalated_to: level.target,
          });

          // Insert notification for citizen
          if (comp.citizen_id) {
            await supabase.from("notifications").insert({
              user_id: comp.citizen_id,
              title: `Complaint Escalated (${level.code})`,
              body: `Your complaint ${comp.id} has been escalated to ${level.target} due to SLA threshold.`,
              type: "escalation",
              complaint_id: comp.id,
            });
          }

          // At 24h threshold, update complaint status to 'escalated'
          if (level.hours === 24 && comp.status !== "escalated") {
            await supabase
              .from("complaints")
              .update({ status: "escalated" })
              .eq("id", comp.id);
          }

          escalationsTriggered++;
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        complaints_scanned: complaints?.length || 0,
        escalations_triggered: escalationsTriggered,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
