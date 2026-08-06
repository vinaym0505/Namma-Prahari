import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

/// Milestone item model for citizen status timeline.
class TimelineStepItem {
  final String title;
  final String description;
  final String timestamp;
  final bool isCompleted;
  final bool isCurrent;
  final bool isEscalated;

  const TimelineStepItem({
    required this.title,
    required this.description,
    required this.timestamp,
    this.isCompleted = false,
    this.isCurrent = false,
    this.isEscalated = false,
  });
}

/// Citizen-Facing Timeline Stepper Widget for Namma Prahari Mobile.
/// Displays public milestone progression (Submitted -> Assigned -> In Progress -> Resolved).
/// Filters out department-internal notes and private staff communications.
class CitizenTimelineView extends StatelessWidget {
  final List<TimelineStepItem> steps;

  const CitizenTimelineView({
    super.key,
    required this.steps,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: List.generate(steps.length, (index) {
        final step = steps[index];
        final isLast = index == steps.length - 1;

        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Indicator Dot & Vertical Line
            Column(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: step.isCompleted
                        ? AppColors.stateGreen
                        : step.isEscalated
                            ? AppColors.stateRed
                            : step.isCurrent
                                ? AppColors.brandPrimary
                                : AppColors.surfaceTertiaryLight,
                    border: Border.all(
                      color: step.isCurrent ? AppColors.brandPrimary : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Icon(
                    step.isCompleted
                        ? Icons.check
                        : step.isEscalated
                            ? Icons.warning
                            : Icons.circle,
                    size: 14,
                    color: step.isCompleted || step.isCurrent || step.isEscalated
                        ? Colors.white
                        : AppColors.textMutedLight,
                  ),
                ),
                if (!isLast)
                  Container(
                    width: 2,
                    height: 48,
                    color: step.isCompleted ? AppColors.stateGreen : AppColors.borderSubtleLight,
                  ),
              ],
            ),
            const SizedBox(width: 12),

            // Content
            Expanded(
              child: Padding(
                padding: const EdgeInsets.only(bottom: 16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          step.title,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                            color: step.isCurrent ? AppColors.brandPrimary : AppColors.textPrimaryLight,
                          ),
                        ),
                        Text(
                          step.timestamp,
                          style: const TextStyle(fontSize: 11, color: AppColors.textMutedLight),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      step.description,
                      style: const TextStyle(fontSize: 12, color: AppColors.textSecondaryLight),
                    ),
                  ],
                ),
              ),
            ),
          ],
        );
      }),
    );
  }
}
