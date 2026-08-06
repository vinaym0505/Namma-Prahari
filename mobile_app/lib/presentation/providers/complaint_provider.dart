import 'package:flutter_riverpod/flutter_riverpod.dart';

class ComplaintSubmitParams {
  final String categoryId;
  final String departmentId;
  final String description;
  final String imagePath;
  final double lat;
  final double lng;
  final String address;
  final String ward;
  final String assemblyConstituency;
  final String parliamentaryConstituency;

  const ComplaintSubmitParams({
    required this.categoryId,
    required this.departmentId,
    required this.description,
    required this.imagePath,
    required this.lat,
    required this.lng,
    required this.address,
    required this.ward,
    required this.assemblyConstituency,
    required this.parliamentaryConstituency,
  });
}

class ComplaintSubmitState {
  final bool isSubmitting;
  final String? submittedId; // e.g. NP-2026-000123
  final String? error;

  const ComplaintSubmitState({
    this.isSubmitting = false,
    this.submittedId,
    this.error,
  });
}

class ComplaintSubmitNotifier extends StateNotifier<ComplaintSubmitState> {
  ComplaintSubmitNotifier() : super(const ComplaintSubmitState());

  Future<bool> submitComplaint(ComplaintSubmitParams params) async {
    state = const ComplaintSubmitState(isSubmitting: true);
    try {
      // Generate human-readable complaint ID: NP-2026-000123
      final newId = 'NP-2026-${(100100 + DateTime.now().millisecond % 900).toString()}';
      
      await Future.delayed(const Duration(milliseconds: 1500)); // Simulate upload + insert

      state = ComplaintSubmitState(
        isSubmitting: false,
        submittedId: newId,
      );
      return true;
    } catch (e) {
      state = ComplaintSubmitState(
        isSubmitting: false,
        error: e.toString(),
      );
      return false;
    }
  }
}

final complaintSubmitProvider =
    StateNotifierProvider<ComplaintSubmitNotifier, ComplaintSubmitState>((ref) {
  return ComplaintSubmitNotifier();
});
