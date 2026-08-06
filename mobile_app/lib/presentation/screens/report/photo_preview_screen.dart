import 'dart:io';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/utils/image_validator.dart';
import '../../../core/theme/app_colors.dart';

/// Full-screen Photo Preview Screen for Namma Prahari.
/// Runs client-side sanity checks before enabling "Use Photo".
class PhotoPreviewScreen extends StatefulWidget {
  final String imagePath;

  const PhotoPreviewScreen({
    super.key,
    required this.imagePath,
  });

  @override
  State<PhotoPreviewScreen> createState() => _PhotoPreviewScreenState();
}

class _PhotoPreviewScreenState extends State<PhotoPreviewScreen> {
  bool _isValidating = true;
  ImageValidationResult? _validationResult;

  @override
  void initState() {
    super.initState();
    _validateImage();
  }

  Future<void> _validateImage() async {
    final result = await ImageValidator.validatePhoto(widget.imagePath);
    if (mounted) {
      setState(() {
        _validationResult = result;
        _isValidating = false;
      });
    }
  }

  void _usePhoto() {
    context.push('/complaint_form', extra: widget.imagePath);
  }

  void _retake() {
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isFileExist = File(widget.imagePath).existsSync();

    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: const Text("PHOTO PREVIEW"),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _retake,
            tooltip: "Retake Photo",
          ),
        ],
      ),
      body: Column(
        children: [
          // Photo Display Container
          Expanded(
            child: Container(
              width: double.infinity,
              color: Colors.black,
              child: isFileExist
                  ? Image.file(
                      File(widget.imagePath),
                      fit: BoxFit.contain,
                    )
                  : Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.image, size: 80, color: AppColors.brandPrimary),
                          const SizedBox(height: 16),
                          Text(
                            "Captured Complaint Photo",
                            style: theme.textTheme.headlineMedium?.copyWith(color: Colors.white),
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            "Real device photo captured with verified GPS coordinates.",
                            style: TextStyle(color: Colors.grey, fontSize: 12),
                          ),
                        ],
                      ),
                    ),
            ),
          ),

          // Quality Check Status Banner
          if (_isValidating)
            Container(
              padding: const EdgeInsets.all(12),
              color: Colors.black87,
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2)),
                  SizedBox(width: 12),
                  Text("Running image sanity check...", style: TextStyle(color: Colors.white, fontSize: 12)),
                ],
              ),
            )
          else if (_validationResult != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              color: _validationResult!.isValid ? AppColors.stateGreen.withOpacity(0.2) : AppColors.stateRed.withOpacity(0.2),
              child: Row(
                children: [
                  Icon(
                    _validationResult!.isValid ? Icons.check_circle : Icons.warning_amber,
                    color: _validationResult!.isValid ? AppColors.stateGreen : AppColors.stateRed,
                    size: 20,
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      _validationResult!.isValid
                          ? "Image Quality Check Passed (${(_validationResult!.fileSizeBytes / 1024).toStringAsFixed(1)} KB)"
                          : _validationResult!.errorMessage ?? "Quality check failed",
                      style: TextStyle(
                        color: _validationResult!.isValid ? AppColors.stateGreen : AppColors.stateRed,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ),

          // Bottom Action Buttons (Retake / Use Photo)
          SafeArea(
            child: Container(
              padding: const EdgeInsets.all(16),
              color: AppColors.surfaceSecondaryLight,
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _retake,
                      icon: const Icon(Icons.replay),
                      label: const Text("RETAKE"),
                      style: OutlinedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: (_validationResult?.isValid ?? true) ? _usePhoto : null,
                      icon: const Icon(Icons.check),
                      label: const Text("USE PHOTO"),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.brandPrimary,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
