import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("NOTIFICATIONS"),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: AppColors.surfaceTertiaryLight,
                  shape: BoxShape.circle,
                  border: Border.all(color: AppColors.borderSubtleLight),
                ),
                child: const Icon(Icons.notifications_off_outlined, size: 40, color: AppColors.textMutedLight),
              ),
              const SizedBox(height: 16),
              Text(
                "No Notifications",
                style: theme.textTheme.headlineMedium?.copyWith(
                  color: AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                "Updates regarding your submitted complaint statuses and reward points will be shown here.",
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: AppColors.textSecondaryLight,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
