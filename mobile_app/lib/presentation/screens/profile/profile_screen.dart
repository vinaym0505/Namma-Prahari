import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("CITIZEN PROFILE"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Center(
            child: Column(
              children: [
                const CircleAvatar(
                  radius: 40,
                  backgroundColor: AppColors.brandPrimary,
                  child: Icon(Icons.person, size: 48, color: Colors.white),
                ),
                const SizedBox(height: 12),
                Text("Citizen Sentinel", style: theme.textTheme.headlineMedium),
                Text("citizen@nammaprahari.gov.in", style: theme.textTheme.bodyMedium?.copyWith(color: AppColors.textMutedLight)),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Card(
            child: ListTile(
              leading: Icon(Icons.star, color: AppColors.stateAmber),
              title: Text("Reward Points Balance"),
              trailing: Text("240 pts", style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.stateGreen)),
            ),
          ),
          const SizedBox(height: 8),
          Card(
            child: ListTile(
              leading: const Icon(Icons.logout, color: AppColors.stateRed),
              title: const Text("Sign Out"),
              onTap: () {},
            ),
          ),
        ],
      ),
    );
  }
}
