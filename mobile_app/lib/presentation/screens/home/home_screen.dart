import 'package:flutter/material.dart';
import '../../../core/theme/app_colors.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool isGpsActive = false;

  void _checkGpsAndOpenReport() {
    if (!isGpsActive) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: AppColors.surfaceSecondaryLight,
          title: const Row(
            children: [
              Icon(Icons.location_off, color: AppColors.stateAmber),
              SizedBox(width: 8),
              Text("Please Enable GPS"),
            ],
          ),
          content: const Text(
            "GPS location is mandatory before taking a complaint photo to ensure accurate ward mapping. Please enable device location.",
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text("Cancel"),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.brandPrimary),
              onPressed: () {
                setState(() => isGpsActive = true);
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("GPS Location Services Activated! Opening Camera...")),
                );
              },
              child: const Text("Open Location Settings"),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("NAMMA PRAHARI", style: TextStyle(fontWeight: FontWeight.bold, letterSpacing: 1.2)),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    const CircleAvatar(
                      backgroundColor: AppColors.brandPrimary,
                      child: Icon(Icons.security, color: Colors.white),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text("Citizen Sentinel Status", style: theme.textTheme.labelMedium?.copyWith(color: AppColors.textMutedLight)),
                        Text("Verified Resident", style: theme.textTheme.headlineMedium?.copyWith(color: AppColors.textPrimaryLight)),
                        Text("Points Earned: 240 pts", style: theme.textTheme.labelMedium?.copyWith(color: AppColors.stateGreen)),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            Center(
              child: GestureDetector(
                onTap: _checkGpsAndOpenReport,
                child: Container(
                  height: 160,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppColors.brandPrimary,
                    borderRadius: BorderRadius.circular(16),
                    boxShadow: [
                      BoxShadow(color: AppColors.brandPrimary.withOpacity(0.3), blurRadius: 16, offset: const Offset(0, 4)),
                    ],
                  ),
                  child: const Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.camera_alt, size: 48, color: Colors.white),
                      SizedBox(height: 8),
                      Text("REPORT CIVIC ISSUE", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white)),
                      Text("GPS location required before camera", style: TextStyle(fontSize: 12, color: Colors.white70)),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
