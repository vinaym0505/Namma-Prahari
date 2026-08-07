import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

/// Modal dialog shown when GPS location service is disabled.
/// Contains the mandatory "Open Device Location Settings" button.
class GpsDisabledDialog extends StatelessWidget {
  final VoidCallback onOpenSettings;

  const GpsDisabledDialog({
    super.key,
    required this.onOpenSettings,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AlertDialog(
      backgroundColor: AppColors.surfaceSecondaryLight,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: const Row(
        children: [
          Icon(Icons.location_off, color: AppColors.stateAmber, size: 28),
          SizedBox(width: 10),
          Text(
            "GPS Required",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
          ),
        ],
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Please enable GPS to continue.",
            style: theme.textTheme.headlineMedium?.copyWith(
              color: AppColors.stateRed,
              fontSize: 15,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            "GPS location is strictly mandatory before opening the camera to ensure your complaint photo is anchored to accurate ward coordinates.",
            style: theme.textTheme.bodyMedium?.copyWith(
              color: AppColors.textSecondaryLight,
            ),
          ),
        ],
      ),
      actions: [
        ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.brandPrimary,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          ),
          onPressed: onOpenSettings,
          icon: const Icon(Icons.location_on),
          label: const Text("Open Device Location Settings"),
        ),
      ],
    );
  }
}
