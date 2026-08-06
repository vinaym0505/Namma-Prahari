// =============================================================================
// PROGRAMMATIC PROOF OF PHASE 8: DUPLICATE COMPLAINT DETECTION
// Verifies that two near-identical complaints at the same location (<500m)
// automatically trigger is_duplicate = true and duplicate_of_id link.
// =============================================================================

export interface MockComplaintPayload {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  ward: string;
}

export interface AiPredictionOutput {
  complaint_id: string;
  is_duplicate: boolean;
  duplicate_of_id?: string;
  severity: string;
  priority_score: number;
  category_predicted: string;
}

/**
 * Simulates Free-Tier AI Engine Duplicate Detection logic.
 */
export function runAiEngineDuplicateDetection(
  newComplaint: MockComplaintPayload,
  existingComplaints: MockComplaintPayload[]
): AiPredictionOutput {
  let isDuplicate = false;
  let duplicateOfId: string | undefined = undefined;

  for (const existing of existingComplaints) {
    // 1. Calculate Haversine distance in meters
    const dLat = (existing.lat - newComplaint.lat) * (Math.PI / 180);
    const dLng = (existing.lng - newComplaint.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(newComplaint.lat * (Math.PI / 180)) *
        Math.cos(existing.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const distanceMeters = 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // 2. Calculate text similarity (Jaccard Index)
    const words1 = new Set(newComplaint.description.toLowerCase().split(/\s+/).filter(w => w.length > 3));
    const words2 = new Set(existing.description.toLowerCase().split(/\s+/).filter(w => w.length > 3));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    const textSim = union.size > 0 ? intersection.size / union.size : 0;

    // Threshold: < 500 meters AND > 35% text similarity
    if (distanceMeters < 500 && textSim > 0.35) {
      isDuplicate = true;
      duplicateOfId = existing.id;
      break;
    }
  }

  return {
    complaint_id: newComplaint.id,
    is_duplicate: isDuplicate,
    duplicate_of_id: duplicateOfId,
    severity: 'High',
    priority_score: isDuplicate ? 95 : 85,
    category_predicted: 'BBMP_ROAD',
  };
}

export function testDuplicateDetection(): { passed: boolean; log: string[] } {
  const log: string[] = [];

  const existingComplaint: MockComplaintPayload = {
    id: 'NP-2026-000101',
    title: 'Severe Pothole on 80 Feet Road',
    description: 'Deep dangerous pothole near Sony World Signal causing traffic disruption and vehicle damage.',
    lat: 12.9345,
    lng: 77.6255,
    ward: 'Ward 15 Koramangala',
  };

  const newDuplicateComplaint: MockComplaintPayload = {
    id: 'NP-2026-000102',
    title: 'Pothole defect on 80 Feet Road',
    description: 'Very deep pothole right at Sony World Signal near Koramangala. Disruption to traffic.',
    lat: 12.9348, // ~35 meters distance
    lng: 77.6258,
    ward: 'Ward 15 Koramangala',
  };

  log.push(`Submitting Initial Complaint: ${existingComplaint.id}`);
  const result1 = runAiEngineDuplicateDetection(existingComplaint, []);
  log.push(`Complaint 1 Duplicate Status: is_duplicate = ${result1.is_duplicate}`);

  log.push(`Submitting Second Near-Identical Complaint from same location: ${newDuplicateComplaint.id}`);
  const result2 = runAiEngineDuplicateDetection(newDuplicateComplaint, [existingComplaint]);
  log.push(`Complaint 2 Duplicate Status: is_duplicate = ${result2.is_duplicate}, duplicate_of = ${result2.duplicate_of_id}`);

  const passed = result1.is_duplicate === false && result2.is_duplicate === true && result2.duplicate_of_id === 'NP-2026-000101';

  if (passed) {
    log.push('✅ AI DUPLICATE DETECTION PROOF SUCCESS: Second near-identical complaint automatically flagged as duplicate!');
  } else {
    log.push('❌ AI DUPLICATE DETECTION FAILED!');
  }

  return { passed, log };
}

if (typeof process !== 'undefined' && process.argv && process.argv[1]?.includes('test_ai_duplicate')) {
  const res = testDuplicateDetection();
  console.log(res.log.join('\n'));
}
