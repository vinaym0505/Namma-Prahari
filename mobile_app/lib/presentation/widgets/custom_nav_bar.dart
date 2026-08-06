import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme/app_colors.dart';

class CustomNavBarItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;

  const CustomNavBarItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
  });
}

class CustomNavBar extends StatelessWidget {
  final int currentIndex;
  final ValueChanged<int> onTap;

  const CustomNavBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  static const List<CustomNavBarItem> items = [
    CustomNavBarItem(icon: Icons.camera_alt_outlined, activeIcon: Icons.camera_alt, label: 'Report'),
    CustomNavBarItem(icon: Icons.history_outlined, activeIcon: Icons.history, label: 'History'),
    CustomNavBarItem(icon: Icons.leaderboard_outlined, activeIcon: Icons.leaderboard, label: 'Leaders'),
    CustomNavBarItem(icon: Icons.notifications_outlined, activeIcon: Icons.notifications, label: 'Alerts'),
    CustomNavBarItem(icon: Icons.person_outline, activeIcon: Icons.person, label: 'Profile'),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(16),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.surfaceSecondaryLight,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppColors.borderSubtleLight),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(items.length, (index) {
          final isSelected = index == currentIndex;
          final item = items[index];

          return GestureDetector(
            onTap: () {
              HapticFeedback.lightImpact();
              onTap(index);
            },
            behavior: HitTestBehavior.opaque,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOut,
              padding: EdgeInsets.symmetric(
                horizontal: isSelected ? 14 : 10,
                vertical: 8,
              ),
              decoration: BoxDecoration(
                color: isSelected ? AppColors.brandPrimaryMuted : Colors.transparent,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  Icon(
                    isSelected ? item.activeIcon : item.icon,
                    size: 22,
                    color: isSelected ? AppColors.brandPrimary : AppColors.textMutedLight,
                  ),
                  if (isSelected) ...[
                    const SizedBox(width: 6),
                    Text(
                      item.label,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                        color: AppColors.brandPrimary,
                        fontFamily: 'Inter',
                      ),
                    ),
                  ],
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}
