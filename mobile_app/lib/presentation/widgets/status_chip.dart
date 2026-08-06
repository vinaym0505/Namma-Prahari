import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

class StatusChipWidget extends StatelessWidget {
  final String status;

  const StatusChipWidget({
    super.key,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    Color bg = AppColors.brandPrimaryMuted;
    Color text = AppColors.brandPrimary;
    String label = 'Submitted';

    switch (status.toLowerCase()) {
      case 'assigned':
        bg = AppColors.stateAmber.withOpacity(0.15);
        text = AppColors.stateAmber;
        label = 'Assigned';
        break;
      case 'in_progress':
        bg = AppColors.stateCyan.withOpacity(0.15);
        text = AppColors.stateCyan;
        label = 'In Progress';
        break;
      case 'resolved':
        bg = AppColors.stateGreen.withOpacity(0.15);
        text = AppColors.stateGreen;
        label = 'Resolved';
        break;
      case 'escalated':
        bg = AppColors.stateRed.withOpacity(0.15);
        text = AppColors.stateRed;
        label = 'Escalated';
        break;
      default:
        bg = AppColors.stateViolet.withOpacity(0.15);
        text = AppColors.stateViolet;
        label = 'Submitted';
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: text.withOpacity(0.3)),
      ),
      child: Text(
        label,
        style: TextStyle(
          color: text,
          fontSize: 11,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
