import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: AppColors.surfacePrimaryLight,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 72,
                height: 72,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: AppColors.brandPrimary,
                  borderRadius: BorderRadius.circular(18),
                ),
                child: const Icon(Icons.shield_outlined, size: 40, color: Colors.white),
              ),
              const SizedBox(height: 24),
              Text(
                'Welcome to Namma Prahari',
                style: theme.textTheme.displayMedium?.copyWith(
                  color: AppColors.textPrimaryLight,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Report civic infrastructure issues directly to government departments.',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: AppColors.textSecondaryLight,
                ),
              ),
              const SizedBox(height: 40),
              ElevatedButton.icon(
                onPressed: () {
                  context.go('/home');
                },
                icon: const Icon(Icons.login),
                label: const Text('Sign In with Google'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
