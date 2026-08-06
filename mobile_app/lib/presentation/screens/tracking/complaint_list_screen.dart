import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/app_colors.dart';
import '../../widgets/status_chip.dart';

class ComplaintListScreen extends StatelessWidget {
  const ComplaintListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("MY COMPLAINTS"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              onTap: () {
                context.push('/complaint_detail/NP-2026-000101');
              },
              title: const Text("Severe Pothole on 80 Feet Road", style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 4),
                  Text("Ward 15 Koramangala · BBMP Road Dept", style: TextStyle(fontSize: 12)),
                  SizedBox(height: 4),
                  Text("Reported Aug 5, 2026 · 10:30 AM", style: TextStyle(fontSize: 11, color: AppColors.textMutedLight)),
                ],
              ),
              trailing: const StatusChipWidget(status: 'in_progress'),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            child: ListTile(
              onTap: () {
                context.push('/complaint_detail/NP-2026-000102');
              },
              title: const Text("Streetlight Fault on 10th Main", style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 4),
                  Text("Ward 42 Shanti Nagar · BESCOM Electrical", style: TextStyle(fontSize: 12)),
                  SizedBox(height: 4),
                  Text("Reported Aug 4, 2026 · 08:15 PM", style: TextStyle(fontSize: 11, color: AppColors.textMutedLight)),
                ],
              ),
              trailing: const StatusChipWidget(status: 'resolved'),
            ),
          ),
        ],
      ),
    );
  }
}
