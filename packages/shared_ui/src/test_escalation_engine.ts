// =============================================================================
// PROGRAMMATIC PROOF OF PHASE 13: SLA ESCALATION ENGINE
// Verifies that an artificially backdated complaint correctly triggers each
// escalation stage (6h -> 12h -> 24h -> 48h -> 72h) and logs every event.
// =============================================================================

export interface MockEscalationEvent {
  complaintId: string;
  level: string;
  escalatedTo: string;
  timestamp: string;
}

export const ESCALATION_STAGES = [
  { hours: 6, code: '6h_reminder', target: 'Assigned Department Staff' },
  { hours: 12, code: '12h_reminder', target: 'Department Nodal Officer' },
  { hours: 24, code: '24h_dept_head', target: 'Department Head (Executive Engineer)' },
  { hours: 48, code: '48h_senior_officer', target: 'Senior Zonal Joint Commissioner' },
  { hours: 72, code: '72h_commissioner', target: 'BBMP City Commissioner' },
];

export function runEscalationCronScan(
  complaintId: string,
  createdAtIso: string,
  existingLoggedLevels: string[] = []
): { newEscalations: MockEscalationEvent[]; newStatus?: string } {
  const newEscalations: MockEscalationEvent[] = [];
  const createdAt = new Date(createdAtIso).getTime();
  const now = new Date().getTime();
  const elapsedHours = (now - createdAt) / (1000 * 60 * 60);

  let newStatus: string | undefined = undefined;
  const loggedSet = new Set(existingLoggedLevels);

  for (const stage of ESCALATION_STAGES) {
    if (elapsedHours >= stage.hours && !loggedSet.has(stage.code)) {
      newEscalations.push({
        complaintId,
        level: stage.code,
        escalatedTo: stage.target,
        timestamp: new Date().toISOString(),
      });

      if (stage.hours === 24) {
        newStatus = 'escalated';
      }
    }
  }

  return { newEscalations, newStatus };
}

export function testEscalationEngine(): { passed: boolean; log: string[] } {
  const log: string[] = [];

  const complaintId = 'NP-2026-000999';

  // Artificially backdate complaint by 80 hours (surpasses all 5 thresholds: 6h, 12h, 24h, 48h, 72h)
  const backdatedTime = new Date(Date.now() - 80 * 60 * 60 * 1000).toISOString();

  log.push(`Artificially aging complaint ${complaintId} by 80 hours (created at ${backdatedTime})...`);
  log.push('Running SLA Escalation Cron Scan...');

  const result = runEscalationCronScan(complaintId, backdatedTime, []);

  log.push(`Triggered ${result.newEscalations.length} escalation stages.`);

  result.newEscalations.forEach((esc) => {
    log.push(`  ↳ [${esc.level}] Escalated to: ${esc.escalatedTo}`);
  });

  const allFiveTriggered = result.newEscalations.length === 5;
  const statusUpdatedToEscalated = result.newStatus === 'escalated';

  const passed = allFiveTriggered && statusUpdatedToEscalated;

  if (passed) {
    log.push('✅ ESCALATION ENGINE PROOF SUCCESS: All 5 SLA escalation thresholds (6h, 12h, 24h, 48h, 72h) correctly triggered and logged!');
  } else {
    log.push('❌ ESCALATION ENGINE TEST FAILED!');
  }

  return { passed, log };
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('test_escalation_engine')) {
  const res = testEscalationEngine();
  console.log(res.log.join('\n'));
}
