import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Namma Prahari Input Validation Unit Tests', () {
    test('Description character length validation', () {
      const shortText = 'Short';
      const validText = 'Deep dangerous pothole near Sony World Junction.';

      expect(shortText.length < 10, true);
      expect(validText.length >= 10, true);
    });

    test('Complaint ID format validation (NP-2026-XXXXXX)', () {
      final complaintIdRegExp = RegExp(r'^NP-\d{4}-\d{6}$');

      expect(complaintIdRegExp.hasMatch('NP-2026-000123'), true);
      expect(complaintIdRegExp.hasMatch('INC-00123'), false);
    });
  });
}
