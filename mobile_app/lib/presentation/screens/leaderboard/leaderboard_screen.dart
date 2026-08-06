import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("SENTINEL LEADERBOARD"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            color: AppColors.brandPrimaryMuted,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  const Icon(Icons.emoji_events, color: AppColors.stateAmber, size: 36),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("Community Top Contributor", style: theme.textTheme.labelMedium?.copyWith(color: AppColors.brandPrimary)),
                      Text("Rank #1 · Bengaluru Urban", style: theme.textTheme.headlineMedium),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          ListTile(
            leading: const CircleAvatar(child: Text("1")),
            title: const Text("Citizen Sentinel"),
            subtitle: const Text("240 Reward Points"),
            trailing: const Icon(Icons.verified, color: AppColors.stateGreen),
          ),
          const Divider(),
          ListTile(
            leading: const CircleAvatar(child: Text("2")),
            title: const Text("Koramangala Resident"),
            subtitle: const Text("180 Reward Points"),
            trailing: const Icon(Icons.verified, color: AppColors.stateGreen),
          ),
        ],
      ),
    );
  }
}
