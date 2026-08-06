import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../domain/entities/category.dart';
import '../../providers/complaint_provider.dart';
import '../../../core/theme/app_colors.dart';

/// Complaint Form Screen for Namma Prahari Citizen Mobile App.
/// Features seeded category picker, character counter description input,
/// and submission pipeline producing human-readable IDs (NP-2026-XXXXXX).
class ComplaintFormScreen extends ConsumerStatefulWidget {
  final String imagePath;

  const ComplaintFormScreen({
    super.key,
    required this.imagePath,
  });

  @override
  ConsumerState<ComplaintFormScreen> createState() => _ComplaintFormScreenState();
}

class _ComplaintFormScreenState extends ConsumerState<ComplaintFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();

  CategoryEntity _selectedCategory = SEEDED_CATEGORIES[0];
  int _charCount = 0;
  static const int _minChars = 10;
  static const int _maxChars = 500;

  @override
  void initState() {
    super.initState();
    _descriptionController.addListener(() {
      setState(() {
        _charCount = _descriptionController.text.length;
      });
    });
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submitComplaint() async {
    if (!_formKey.currentState!.validate()) return;

    final params = ComplaintSubmitParams(
      categoryId: _selectedCategory.id,
      departmentId: _selectedCategory.departmentId,
      description: _descriptionController.text.trim(),
      imagePath: widget.imagePath,
      lat: 12.9716,
      lng: 77.5946,
      address: '80 Feet Road, Koramangala 4th Block, Bengaluru',
      ward: 'Ward 15 (Koramangala)',
      assemblyConstituency: 'Koramangala Assembly',
      parliamentaryConstituency: 'Bengaluru South',
    );

    final success = await ref.read(complaintSubmitProvider.notifier).submitComplaint(params);
    if (success && mounted) {
      final state = ref.read(complaintSubmitProvider);
      _showSuccessDialog(state.submittedId ?? 'NP-2026-001001');
    }
  }

  void _showSuccessDialog(String complaintId) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.surfaceSecondaryLight,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: AppColors.stateGreen, size: 32),
            SizedBox(width: 10),
            Text("Submitted!", style: TextStyle(fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text("Your complaint has been successfully registered with the Sentinel Network."),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.brandPrimaryMuted,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.brandPrimary.withOpacity(0.3)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Complaint ID:", style: TextStyle(fontSize: 12, color: AppColors.textMutedLight)),
                  Text(
                    complaintId,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppColors.brandPrimary),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              "Status: pending_ai_review. AI Engine will validate, score priority, and assign department.",
              style: TextStyle(fontSize: 11, color: AppColors.textMutedLight),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: AppColors.brandPrimary),
            onPressed: () {
              Navigator.pop(context);
              context.go('/home');
            },
            child: const Text("BACK TO HOME"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final submitState = ref.watch(complaintSubmitProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text("REPORT CIVIC ISSUE"),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Photo Thumbnail Preview
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: SizedBox(
                  height: 160,
                  width: double.infinity,
                  child: File(widget.imagePath).existsSync()
                      ? Image.file(File(widget.imagePath), fit: BoxFit.cover)
                      : Container(
                          color: AppColors.surfaceTertiaryLight,
                          child: const Center(
                            child: Icon(Icons.camera_alt, size: 48, color: AppColors.brandPrimary),
                          ),
                        ),
                ),
              ),
              const SizedBox(height: 20),

              // Category Selector
              Text("1. Select Issue Category", style: theme.textTheme.headlineMedium?.copyWith(fontSize: 15)),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  border: Border.all(color: AppColors.borderMediumLight),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<CategoryEntity>(
                    value: _selectedCategory,
                    isExpanded: true,
                    items: SEEDED_CATEGORIES.map((cat) {
                      return DropdownMenuItem<CategoryEntity>(
                        value: cat,
                        child: Text(cat.name, style: theme.textTheme.bodyMedium),
                      );
                    }).toList(),
                    onChanged: (val) {
                      if (val != null) setState(() => _selectedCategory = val);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Description Input + Character Counter
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("2. Issue Description", style: theme.textTheme.headlineMedium?.copyWith(fontSize: 15)),
                  Text(
                    "$_charCount/$_maxChars",
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: _charCount < _minChars
                          ? AppColors.stateAmber
                          : _charCount > _maxChars
                              ? AppColors.stateRed
                              : AppColors.stateGreen,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _descriptionController,
                maxLines: 4,
                maxLength: _maxChars,
                decoration: const InputDecoration(
                  hintText: "Describe the civic defect, landmark, and severity...",
                  counterText: "",
                ),
                validator: (val) {
                  if (val == null || val.trim().length < _minChars) {
                    return "Description must be at least $_minChars characters.";
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),

              // Submit Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: submitState.isSubmitting ? null : _submitComplaint,
                  icon: submitState.isSubmitting
                      ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.send),
                  label: Text(submitState.isSubmitting ? "SUBMITTING TO SENTINEL..." : "SUBMIT COMPLAINT"),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.brandPrimary,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
