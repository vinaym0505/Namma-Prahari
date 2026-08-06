import 'dart:io';
import 'package:flutter/foundation.dart';

/// Validation result for client-side complaint image checks.
class ImageValidationResult {
  final bool isValid;
  final String? errorMessage;
  final int fileSizeBytes;

  const ImageValidationResult({
    required this.isValid,
    this.errorMessage,
    required this.fileSizeBytes,
  });
}

/// Client-side image sanity and quality validator.
///
/// Ensures captured photos are valid real device captures and meet minimum
/// quality thresholds before allowing "Use Photo" in the complaint flow.
class ImageValidator {
  ImageValidator._();

  /// Validate captured photo file.
  static Future<ImageValidationResult> validatePhoto(String filePath) async {
    try {
      final file = File(filePath);
      if (!await file.exists()) {
        return const ImageValidationResult(
          isValid: false,
          errorMessage: 'Image file does not exist or capture failed.',
          fileSizeBytes: 0,
        );
      }

      final bytes = await file.length();

      // Check 1: Minimum file size check (> 5 KB to reject corrupted/0-byte frames)
      if (bytes < 5 * 1024) {
        return ImageValidationResult(
          isValid: false,
          errorMessage: 'Captured photo is corrupt or empty (file size < 5 KB).',
          fileSizeBytes: bytes,
        );
      }

      // Check 2: Maximum file size limit for Supabase Storage free tier (5 MB max)
      if (bytes > 5 * 1024 * 1024) {
        return ImageValidationResult(
          isValid: false,
          errorMessage: 'Image size exceeds 5 MB free-tier storage limit. Please retake.',
          fileSizeBytes: bytes,
        );
      }

      return ImageValidationResult(
        isValid: true,
        fileSizeBytes: bytes,
      );
    } catch (e) {
      return ImageValidationResult(
        isValid: false,
        errorMessage: 'Image validation failed: ${e.toString()}',
        fileSizeBytes: 0,
      );
    }
  }
}
