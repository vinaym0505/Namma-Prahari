// =============================================================================
// NAMMA PRAHARI — AUTOMATED TEST SUITE RUNNER
// Integrates Unit, Integration, RLS/RBAC Isolation, PII Privacy, and AI tests.
// =============================================================================

import { testRlsIsolation } from './test_rls_isolation';
import { testPiiPrivacyRule } from './test_pii_privacy';
import { testDepartmentApiIsolation } from './test_dept_api_isolation';
import { testDuplicateDetection } from './test_ai_duplicate';
import { testEscalationEngine } from './test_escalation_engine';

export function runFullTestSuite(): void {
  console.log('================================================================');
  console.log('       NAMMA PRAHARI — COMPREHENSIVE AUTOMATED TEST SUITE       ');
  console.log('================================================================\n');

  let passedCount = 0;
  let totalCount = 0;

  function runTest(name: string, fn: () => { passed?: boolean; success?: boolean; log: string[] }) {
    totalCount++;
    console.log(`[TEST ${totalCount}] ${name}...`);
    const res = fn();
    const isPassed = res.passed ?? res.success ?? false;

    if (isPassed) {
      passedCount++;
      console.log(`STATUS: ✅ PASSED`);
    } else {
      console.log(`STATUS: ❌ FAILED`);
    }
    console.log(res.log.map(line => `   ${line}`).join('\n'));
    console.log('----------------------------------------------------------------\n');
  }

  // 1. RLS Isolation Security Test
  runTest('Row Level Security (RLS) Cross-Department Isolation', testRlsIsolation);

  // 2. Department API Scoped Query Denial Test
  runTest('Department Account API Isolation & Query Denial', testDepartmentApiIsolation);

  // 3. Citizen PII Exclusion Rule Test
  runTest('Citizen PII Exclusion at Database/API View Layer', testPiiPrivacyRule);

  // 4. AI Engine Duplicate Detection Test
  runTest('AI Engine Geo-Radius & Text Duplicate Detection', testDuplicateDetection);

  // 5. SLA Escalation Engine Test
  runTest('SLA Escalation Engine Timers (6h/12h/24h/48h/72h)', testEscalationEngine);

  console.log('================================================================');
  console.log(`TEST SUITE SUMMARY: ${passedCount} / ${totalCount} TESTS PASSED`);
  console.log('================================================================\n');

  if (passedCount !== totalCount) {
    process.exit(1);
  }
}

if (typeof process !== 'undefined') {
  runFullTestSuite();
}
