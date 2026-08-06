import 'package:flutter/material.dart';

/// Namma Prahari — Typography Scale
///
/// Heading: Outfit (display, headline, title)
/// Body: Inter (body, label, caption)
/// All sizes aligned to 8pt grid.
/// See /docs/design-system.md Section 3 for full scale.
class AppTypography {
  AppTypography._();

  static const _outfit = 'Outfit';
  static const _inter = 'Inter';

  static TextTheme get textTheme => const TextTheme(
    // display-lg: 32/40, -0.025em, w800
    displayLarge: TextStyle(
      fontFamily: _outfit,
      fontSize: 32,
      fontWeight: FontWeight.w800,
      letterSpacing: -0.8,
      height: 1.25,
    ),
    // display-md: 24/32, -0.02em, w700
    displayMedium: TextStyle(
      fontFamily: _outfit,
      fontSize: 24,
      fontWeight: FontWeight.w700,
      letterSpacing: -0.48,
      height: 1.33,
    ),
    // heading-lg: 20/28, -0.015em, w600
    headlineLarge: TextStyle(
      fontFamily: _outfit,
      fontSize: 20,
      fontWeight: FontWeight.w600,
      letterSpacing: -0.3,
      height: 1.4,
    ),
    // heading-md: 16/24, -0.01em, w600
    headlineMedium: TextStyle(
      fontFamily: _outfit,
      fontSize: 16,
      fontWeight: FontWeight.w600,
      letterSpacing: -0.16,
      height: 1.5,
    ),
    // body-lg: 15/24, w400
    bodyLarge: TextStyle(
      fontFamily: _inter,
      fontSize: 15,
      fontWeight: FontWeight.w400,
      height: 1.6,
    ),
    // body-md: 14/20, w400
    bodyMedium: TextStyle(
      fontFamily: _inter,
      fontSize: 14,
      fontWeight: FontWeight.w400,
      height: 1.43,
    ),
    // body-sm: 13/18, w400
    bodySmall: TextStyle(
      fontFamily: _inter,
      fontSize: 13,
      fontWeight: FontWeight.w400,
      height: 1.38,
    ),
    // label-lg: 13/16, 0.01em, w600
    labelLarge: TextStyle(
      fontFamily: _inter,
      fontSize: 13,
      fontWeight: FontWeight.w600,
      letterSpacing: 0.13,
      height: 1.23,
    ),
    // label-md: 12/16, 0.02em, w600
    labelMedium: TextStyle(
      fontFamily: _inter,
      fontSize: 12,
      fontWeight: FontWeight.w600,
      letterSpacing: 0.24,
      height: 1.33,
    ),
    // label-sm: 11/14, 0.04em, w500
    labelSmall: TextStyle(
      fontFamily: _inter,
      fontSize: 11,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.44,
      height: 1.27,
    ),
  );
}
