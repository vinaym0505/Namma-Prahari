import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../presentation/screens/auth/splash_screen.dart';
import '../../presentation/screens/auth/login_screen.dart';
import '../../presentation/screens/home/home_screen.dart';

/// Central GoRouter configuration for Namma Prahari Citizen Mobile App.
final appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/home',
      builder: (context, state) => const HomeScreen(),
    ),
  ],
);
