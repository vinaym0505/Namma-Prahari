import 'package:flutter/material.dart';

/// Namma Prahari — Color Palette
///
/// Derived from Karnataka state identity (red and gold from the state flag)
/// and civic infrastructure signage conventions.
/// See /docs/design-system.md for full rationale.
class AppColors {
  AppColors._();

  // ── Surfaces (Dark Mode — Web portals default) ──
  static const surfacePrimary = Color(0xFF0E1117);
  static const surfaceSecondary = Color(0xFF161B26);
  static const surfaceTertiary = Color(0xFF1E2533);
  static const surfaceElevated = Color(0xFF252D3D);

  // ── Surfaces (Light Mode — Mobile app default) ──
  static const surfacePrimaryLight = Color(0xFFFFFFFF);
  static const surfaceSecondaryLight = Color(0xFFF8FAFC);
  static const surfaceTertiaryLight = Color(0xFFF1F5F9);

  // ── Brand ──
  static const brandPrimary = Color(0xFF3B82F6);
  static const brandPrimaryMuted = Color(0x1F3B82F6); // 12% opacity

  // ── State Colors ──
  static const stateRed = Color(0xFFEF4444);
  static const stateAmber = Color(0xFFF59E0B);
  static const stateGreen = Color(0xFF22C55E);
  static const stateCyan = Color(0xFF06B6D4);
  static const stateViolet = Color(0xFF8B5CF6);

  // ── Text (Dark) ──
  static const textPrimary = Color(0xFFF1F5F9);
  static const textSecondary = Color(0xFF94A3B8);
  static const textMuted = Color(0xFF64748B);

  // ── Text (Light) ──
  static const textPrimaryLight = Color(0xFF0F172A);
  static const textSecondaryLight = Color(0xFF475569);
  static const textMutedLight = Color(0xFF94A3B8);

  // ── Borders (Dark) ──
  static const borderSubtle = Color(0x0FFFFFFF); // 6%
  static const borderMedium = Color(0x1FFFFFFF); // 12%
  static const borderStrong = Color(0x33FFFFFF); // 20%

  // ── Borders (Light) ──
  static const borderSubtleLight = Color(0xFFE2E8F0);
  static const borderMediumLight = Color(0xFFCBD5E1);
}
