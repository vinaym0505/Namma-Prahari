import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class ComplaintListScreen extends StatelessWidget {
  const ComplaintListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("COMPLAINT HISTORY"),
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
                child: const Icon(Icons.inbox_outlined, size: 40, color: AppColors.textMutedLight),
              ),
              const SizedBox(height: 16),
              Text(
                "No Complaints Reported Yet",
                style: theme.textTheme.headlineMedium?.copyWith(
                  color: AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                "Your submitted civic issue reports and resolution history will appear here.",
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
