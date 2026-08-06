import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';

/// Themed Splash Screen for Namma Prahari Citizen Mobile App.
/// Uses Phase 1 design tokens (Outfit/Inter typography, Institutional Blue #3B82F6).
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    );

    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    );

    _scaleAnimation = Tween<double>(begin: 0.85, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.8, curve: Curves.easeOutCubic),
      ),
    );

    _controller.forward();

    // Navigate to Home screen after splash animation
    Future.delayed(const Duration(milliseconds: 2200), () {
      if (mounted) {
        context.go('/home');
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: AppColors.surfacePrimaryLight,
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: ScaleTransition(
            scale: _scaleAnimation,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Shield / Sentinel Brand Icon
                Container(
                  width: 96,
                  height: 96,
                  decoration: BoxDecoration(
                    color: AppColors.brandPrimary,
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.brandPrimary.withOpacity(0.3),
                        blurRadius: 24,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.shield_outlined,
                    size: 52,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 24),
                // App Title
                Text(
                  'NAMMA PRAHARI',
                  style: theme.textTheme.displayLarge?.copyWith(
                    color: AppColors.textPrimaryLight,
                    letterSpacing: -0.8,
                  ),
                ),
                const SizedBox(height: 8),
                // App Subtitle / Tagline
                Text(
                  'Smart Civic Sentinel Network',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: AppColors.textSecondaryLight,
                  ),
                ),
                const SizedBox(height: 48),
                // Loading indicator
                const SizedBox(
                  width: 28,
                  height: 28,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.5,
                    valueColor: AlwaysStoppedAnimation<Color>(AppColors.brandPrimary),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
